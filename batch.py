from datetime import datetime, timedelta
import json
import redis

#from flask import jsonify

import celery
from emails import send_email
from pytz import timezone
import requests
import stripe

from helpers import amount_to_charge, calculate_amount_fees

from salesforce import SalesforceConnection
from config import STRIPE_KEYS
from config import ACCOUNTING_MAIL_RECIPIENT
from config import TIMEZONE
from config import REDIS_URL

zone = timezone(TIMEZONE)

stripe.api_key = STRIPE_KEYS['secret_key']


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
        print(string)
        self.log.append(string)

    def send(self):
        """
        Send the assembled log out as an email.
        """
        body = '\n'.join(self.log)
        recipient = ACCOUNTING_MAIL_RECIPIENT
        subject = 'Batch run'
        send_email(body=body, recipient=recipient, subject=subject)


def process_charges(query, log):
    #print('start the process charges')
    #print(query)
    sf = SalesforceConnection()
    print('sf connected')
    response = sf.query(query)
    # TODO: check response code
    #print('we have a respoonse')
    #print(response)
    log.it('Found {} opportunities available to process.'.format(
        len(response)))

    for item in response:

        amount = amount_to_charge(item)

        # salesforce connect
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)

        if item['StageName'] == 'Pledged':
            try:
            
                log.it('---- Charging ${} to {} ({})'.format(amount / 100,
                    item['Stripe_Customer_ID__c'],
                    item['Name']))

                if item['Shipping_address_name__c'] != '':
                    shipping_address = {'line1' : item['Shipping_address_street__c'], 'city' : item['Shipping_address_city__c'], 'state' : item['Shipping_address_state__c'], 'postal_code' : item['Shipping_address_ZIP__c'], 'country' : item['Shipping_address_country__c']}
                    if shipping_address.get('line1'):
                        shipping_details = {'name' : item['Shipping_address_name__c'], 'address' : shipping_address}
                    else:
                        shipping_details = None
                else:
                    shipping_details = None

                # if we know the source from the opportunity, use it
                # otherwise it will use the default on the Stripe customer
                # currently this just loads the token. not going to work.

                if item['Stripe_Card__c'] is not None:
                    charge_source = item['Stripe_Card__c']
                elif item['Stripe_Bank_Account__c'] is not None:
                    charge_source = item['Stripe_Bank_Account__c']
                else:
                    charge_source = None

                #charge = stripe.Charge.create(charge_args)

                charge = stripe.Charge.create(
                    customer=item['Stripe_Customer_ID__c'],
                    amount=amount,
                    currency='usd',
                    description=item['Description'],
                    metadata={'source': item['Referring_page__c']},
                    shipping=shipping_details,
                    source=charge_source
                )

            except stripe.error.CardError as e:
                # look for decline code:
                error = e.json_body['error']
                log.it('Error: The card has been declined:')
                log.it('\tStatus: {}'.format(e.http_status))
                log.it('\tType: {}'.format(error.get('type', '')))
                log.it('\tCode: {}'.format(error.get('code', '')))
                log.it('\tParam: {}'.format(error.get('param', '')))
                log.it('\tMessage: {}'.format(error.get('message', '')))
                log.it('\tDecline code: {}'.format(error.get('decline_code', '')))

                # charge was unsuccessful - change its salesforce status to Failed and store the error message
                update = {
                    'StageName': 'Failed',
                    'Stripe_Error_Message__c': "Error: {}".format(e)
                    }

                resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
                if resp.status_code == 204:
                    log.it('salesforce updated - charge failed')
                else:
                    log.it('error updating salesforce because status code was not 204')
                    raise Exception('error')

                continue

            except stripe.error.InvalidRequestError as e:
                log.it("Error: {}".format(e))
                update = {
                    'StageName': 'Failed',
                    'Stripe_Error_Message__c': "Error: {}".format(e)
                    }
                resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
                if resp.status_code == 204:
                    log.it('salesforce updated with invalidrequesterror - charge failed')
                else:
                    log.it('error updating salesforce because status code was not 204')
                    raise Exception('error')

                continue
            except Exception as e:
                log.it("Error: {}".format(e))
                update = {
                    'StageName': 'Failed',
                    'Stripe_Error_Message__c': "Error: {}".format(e)
                    }
                resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
                if resp.status_code == 204:
                    log.it('salesforce updated with generic exception - charge failed')
                else:
                    log.it('error updating salesforce because status code was not 204')
                    raise Exception('error')
                continue
        else:
            log.it('---- Checking transaction {} for status update.'.format(item['Stripe_Transaction_ID__c']))
            charge = stripe.Charge.retrieve(item['Stripe_Transaction_ID__c'])


        if charge.status != 'succeeded' and charge.status != 'pending':
            log.it("Error: Charge failed. Check Stripe logs.")
            update = {
                'StageName': 'Failed',
                'Stripe_Error_Message__c': "Error: Unknown. Check logs"
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated - charge failed')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')
            continue

        if charge.status == 'pending':
            log.it("ACH charge pending. Check daily to see if it processes.")
            update = {
                'Stripe_Transaction_Id__c': charge.id,
                #'Stripe_Bank_Account__c': charge.source.id,
                'StageName': 'ACH Pending',
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated - charge is ach pending')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')
            continue

        # charge was successful
        if charge.source.object != 'bank_account':
            update = {
                'Stripe_Transaction_Id__c': charge.id,
                #'Stripe_Card__c': charge.source.id,
                'Card_type__c': charge.source.brand,
                'Card_expiration_date__c': str(charge.source.exp_month) + ' / ' + str(charge.source.exp_year),
                'Card_acct_last_4__c': charge.source.last4,
                'StageName': 'Closed Won',
                }
        else:
            update = {
                #'Stripe_Transaction_Id__c': charge.id,
                #'Stripe_Bank_Account__c': charge.source.id,
                'StageName': 'Closed Won'
                }

        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        # TODO: check 'errors' and 'success' too
        if resp.status_code == 204:
            log.it('salesforce updated - charge succeeded')
        else:
            log.it('error updating salesforce because status code was not 204')
            raise Exception('error')


def update_fees(query, log):
    #print('start the fee updates')
    #print(query)
    sf = SalesforceConnection()
    print('sf connected')
    response = sf.query(query)
    # TODO: check response code
    #print('we have a respoonse')
    #print(response)
    log.it('Found {} opportunities available to update fees.'.format(
        len(response)))

    for item in response:

        # salesforce connect
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)

        amount = float(item['Amount'])
        payment_type = item.get('payment_type')
        if entry.get('payment_type') == 'American Express' or item.get('Card_type__c') == 'American Express':
            payment_type = 'American Express'
        elif item.get('payment_type') == 'ach' or item.get('Stripe_Bank_Account__c') is not None:
            payment_type = 'ach'
        fees = calculate_amount_fees(amount, payment_type)

        log.it('---- Updating fee value to ${}'.format(fees))

        update = {
            'Stripe_Transaction_Fee__c': fees
            }
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        if resp.status_code == 204:
            log.it('salesforce updated with fee value')
        else:
            log.it('error updating salesforce with fee value')
            raise Exception('error')
        continue


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
        self.connection.setex(name=self.key, value='bar', time=1200)

    def release(self):
        self.connection.delete(self.key)


@celery.task()
def charge_cards():

    lock = Lock(key='charge-cards-lock')
    lock.acquire()

    log = Log()

    log.it('---Starting batch card job...')

    three_days_ago = (datetime.now(tz=zone) - timedelta(
        days=3)).strftime('%Y-%m-%d')
    today = datetime.now(tz=zone).strftime('%Y-%m-%d')

    # regular (non Circle) pledges:
    log.it('---Processing regular charges...')

    query = """
        SELECT Amount, Name, Stripe_Customer_Id__c, Description, StageName, Stripe_Card__c, Stripe_Bank_Account__c, Card_type__c,
            Stripe_Agreed_to_pay_fees__c, Referring_page__c, Shipping_address_name__c, Shipping_address_street__c,
            Shipping_address_city__c, Shipping_address_state__c, Shipping_address_ZIP__c, Shipping_address_country__c
        FROM Opportunity
        WHERE CloseDate <= {}
        AND CloseDate >= {}
        AND StageName = 'Pledged'
        AND Stripe_Customer_Id__c != ''
        """.format(today, three_days_ago)

    try:
        process_charges(query, log)
    finally:
        lock.release()


@celery.task()
def update_ach_charges():

    lock = Lock(key='update-ach-charges-lock')
    lock.acquire()

    log = Log()

    log.it('---Starting batch ach job...')

    #three_days_ago = (datetime.now(tz=zone) - timedelta(
    #    days=3)).strftime('%Y-%m-%d')
    #today = datetime.now(tz=zone).strftime('%Y-%m-%d')


    # regular (non Circle) pledges:
    log.it('---Checking for status changes on ACH charges...')

    query = """
        SELECT Stripe_Transaction_ID__c, Amount, Name, Stripe_Customer_Id__c, Description, StageName, Stripe_Card__c, Stripe_Bank_Account__c, Card_type__c,
            Stripe_Agreed_to_pay_fees__c, Referring_page__c, Shipping_address_name__c, Shipping_address_street__c,
            Shipping_address_city__c, Shipping_address_state__c, Shipping_address_ZIP__c, Shipping_address_country__c
        FROM Opportunity
        WHERE StageName = 'ACH Pending'
        AND Stripe_Customer_Id__c != ''
        """

    try:
        #print('we have a query here for the ach pending stuff')
        #print(query)
        process_charges(query, log)
    finally:
        lock.release()


@celery.task()
def save_stripe_fee():

    lock = Lock(key='save-stripe-fee-lock')
    lock.acquire()

    log = Log()

    log.it('---Starting batch stripe fee job...')

    query = """
        SELECT Name, npe03__Amount__c, Stripe_Customer_Id__c, Stripe_Card__c, Stripe_Bank_Account__c, Card_type__c, Stripe_Agreed_to_pay_fees__c, Stripe_Transaction_Fee__c
        FROM npe03__Recurring_Donation__c
        WHERE npe03__Open_Ended_Status__c = 'Open'
        AND Stripe_Transaction_Fee__c = null
        AND Stripe_Customer_Id__c != ''
        LIMIT 50
        """

    try:
        update_fees(query, log)
    finally:
        lock.release()


if __name__ == '__main__':
    charge_cards()
