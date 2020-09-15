import logging
from config import ACCOUNTING_MAIL_RECIPIENT, LOG_LEVEL, REDIS_URL, TIMEZONE, UPDATE_STRIPE_FEES
from datetime import datetime, timedelta

from pytz import timezone

import celery
import redis
from charges import amount_to_charge, calculate_amount_fees, charge, ChargeException
from npsp import Opportunity
from util import send_email, update_fees

zone = timezone(TIMEZONE)


log_level = logging.getLevelName(LOG_LEVEL)

root = logging.getLogger()
root.setLevel(log_level)


class Log(object):
    """
    This encapulates sending to the console/stdout and email all in one.

    """

    def __init__(self):
        self.log = list()

    def it(self, string):
        """
        Add something to the log.
        """
        logging.debug(string)
        self.log.append(string)

    def send(self):
        """
        Send the assembled log out as an email.
        """
        body = "\n".join(self.log)
        recipient = ACCOUNTING_MAIL_RECIPIENT
        subject = "Batch run"
        send_email(body=body, recipient=recipient, subject=subject)


class AlreadyExecuting(Exception):
    """
    Here to show when more than one job of the same type is running.
    """

    pass


class Lock(object):
    """
    Claim an exclusive lock. Using Redis.
    """

    def __init__(self, key):
        self.key = key
        self.connection = redis.from_url(REDIS_URL)

    def acquire(self):
        if self.connection.get(self.key):
            raise AlreadyExecuting
        self.connection.setex(name=self.key, value="bar", time=1200)

    def append(self, key, value):
        if self.connection.get(key):
            self.connection.setex(name=key, value=value, time=1200)

    def release(self):
        self.connection.delete(self.key)


# TODO stop sending this email and just rely on Sentry and logs?


@celery.task()
def charge_cards():

    lock = Lock(key="charge-cards-lock")
    lock.acquire()

    log = Log()

    log.it("---Starting batch card job...")

    three_days_ago = (datetime.now(tz=zone) - timedelta(days=14)).strftime("%Y-%m-%d")
    today = datetime.now(tz=zone).strftime("%Y-%m-%d")

    opportunities = Opportunity.list(begin=three_days_ago, end=today)

    log.it("---Processing charges...")

    log.it(f"Found {len(opportunities)} opportunities available to process.")

    for opportunity in opportunities:
        if not opportunity.stripe_customer_id:
            continue
        amount = amount_to_charge(opportunity)
        log.it(
            f"---- Charging ${amount} to {opportunity.stripe_customer_id} ({opportunity.name})"
        )
        try:
            charge(opportunity)
        except ChargeException as e:
            logging.info("Batch charge error")
            e.send_slack_notification()

    log.send()

    lock.release()


@celery.task()
def update_ach_charges():

    lock = Lock(key='update-ach-charges-lock')
    lock.acquire()

    log = Log()

    log.it('---Starting batch ach job...')
    log.it('---Checking for status changes on ACH charges...')

    three_days_ago = (datetime.now(tz=zone) - timedelta(days=3)).strftime("%Y-%m-%d")
    today = datetime.now(tz=zone).strftime("%Y-%m-%d")

    opportunities = Opportunity.list(begin=three_days_ago, end=today, stage_name="ACH Pending")

    for opportunity in opportunities:
        if not opportunity.stripe_customer_id:
            continue
        amount = amount_to_charge(opportunity)
        log.it(
            f"---- ACH Charging ${amount} to {opportunity.stripe_customer_id} ({opportunity.name})"
        )
        try:
            charge(opportunity)
        except ChargeException as e:
            logging.info("ACH batch charge error")
            e.send_slack_notification()

    log.send()

    lock.release()


@celery.task()
def save_stripe_fee():

    log = Log()

    log.it('---Starting batch stripe fee job...')

    if UPDATE_STRIPE_FEES is False:
        log.it('---Update fee is false. Get out.')
        return

    lock = Lock(key='save-stripe-fee-lock')
    lock.acquire()

    query = """
        SELECT Id, Name, npe03__Amount__c, Stripe_Customer_Id__c, Stripe_Card__c, Stripe_Bank_Account__c, Card_type__c, Stripe_Payment_Type__c, Stripe_Agreed_to_pay_fees__c, Stripe_Transaction_Fee__c
        FROM npe03__Recurring_Donation__c
        WHERE npe03__Open_Ended_Status__c = 'Open'
        AND Stripe_Transaction_Fee__c = null
        AND Stripe_Customer_Id__c != ''
        ORDER BY npe03__Date_Established__c DESC
        LIMIT 50
        """

    try:
        update_fees(query, log, 'recurring')
    finally:
        lock.release()


if __name__ == "__main__":
    charge_cards()
