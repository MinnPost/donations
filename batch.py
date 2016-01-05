from datetime import datetime, timedelta
import json

import celery
from emails import send_email
from pytz import timezone
import requests
import stripe

from helpers import amount_to_charge

from salesforce import SalesforceConnection
from config import STRIPE_KEYS
from config import ACCOUNTING_MAIL_RECIPIENT
from config import TIMEZONE

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

    print(query)
    sf = SalesforceConnection()

    response = sf.query(query)
    # TODO: check response code

    log.it('Found {} opportunities available to process.'.format(
        len(response)))

    for item in response:
        # print (item)
        amount = amount_to_charge(item)
        try:
            log.it("---- Charging ${} to {} ({})".format(amount / 100,
                item['Stripe_Customer_ID__c'],
                item['Name']))

            if item['Shipping_address_name__c'] != '':
                shipping_address = {'line1' : item['Shipping_address_street__c'], 'city' : item['Shipping_address_city__c'], 'state' : item['Shipping_address_state__c'], 'postal_code' : item['Shipping_address_ZIP__c'], 'country' : item['Shipping_address_country__c']}
                shipping_details = {'name' : item['Shipping_address_name__c'], 'address' : shipping_address}
            else:
                shipping_details = NULL

            charge = stripe.Charge.create(
                    customer=item['Stripe_Customer_ID__c'],
                    amount=amount,
                    currency='usd',
                    description=item['Description'],
                    metadata={'source': item['Referring_page__c']},
                    shipping=shipping_details
                    )


        except stripe.error.CardError as e:
            # look for decline code:
            print('Unable to extract decline code')
            return jsonify(e)
        except stripe.error.InvalidRequestError as e:
            log.it("Problem: {}".format(e))
            continue
        # print ('Charge: {}'.format(charge))
        # TODO: check for success
        # TODO: catch other errors

        # print ("Charge id: {}".format(charge.id))
        update = {
                'Stripe_Transaction_Id__c': charge.id,
                'Stripe_Card__c': charge.source.id,
                'StageName': 'Closed Won',
                }
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)
        # print (url)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        # TODO: check 'errors' and 'success' too
        # print (resp)
        if resp.status_code == 204:
            log.it("ok")
        else:
            log.it("problem")
            raise Exception('problem')


@celery.task()
def charge_cards():

    log = Log()

    log.it('---Starting batch job...')

    three_days_ago = (datetime.now(tz=zone) - timedelta(
        days=3)).strftime('%Y-%m-%d')
    today = datetime.now(tz=zone).strftime('%Y-%m-%d')

    # regular (non Circle) pledges:
    log.it('---Processing regular charges...')

    query = """
        SELECT Amount, Name, Stripe_Customer_Id__c, Description,
            Stripe_Agreed_to_pay_fees__c, Referring_page__c, Shipping_address_name__c, Shipping_address_street__c,
            Shipping_address_city__c, Shipping_address_state__c, Shipping_address_ZIP__c, Shipping_address_country__c
        FROM Opportunity
        WHERE CloseDate <= {}
        AND CloseDate >= {}
        AND StageName = 'Pledged'
        AND Stripe_Customer_Id__c != ''
        """.format(today, three_days_ago)

    process_charges(query, log)

    #
    # Circle transactions are different from the others. The Close Dates for a
    # given Circle donation are all identical. That's so that the gift can be
    # recognized all at once on the donor wall. So we use another field to
    # determine when the card is actually charged:
    # Giving_Circle_Expected_Giving_Date__c. So we process charges separately
    # for Circles.
    #

    # log.it('---Processing Circle charges...')

    # query = """
    #     SELECT Amount, Name, Stripe_Customer_Id__c, Description,
    #         Stripe_Agreed_to_pay_fees__c
    #     FROM Opportunity
    #     WHERE Giving_Circle_Expected_Giving_Date__c <= {}
    #     AND Giving_Circle_Expected_Giving_Date__c >= {}
    #     AND StageName = 'Pledged'
    #     AND Stripe_Customer_Id__c != ''
    #     AND Type = 'Giving Circle'
    #     """.format(today, three_days_ago)

    # process_charges(query, log)
    # log.send()


if __name__ == '__main__':
    charge_cards()
