from datetime import datetime, timedelta
import json

#from flask import jsonify

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

    sf = SalesforceConnection()

    response = sf.query(query)
    # TODO: check response code

    log.it('Found {} opportunities available to process.'.format(
        len(response)))

    for item in response:
        amount = amount_to_charge(item)

        # salesforce connect
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)

        try:
            log.it('---- Charging ${} to {} ({})'.format(amount / 100,
                item['Stripe_Customer_ID__c'],
                item['Name']))

            if item['Shipping_address_name__c'] != '':
                shipping_address = {'line1' : item['Shipping_address_street__c'], 'city' : item['Shipping_address_city__c'], 'state' : item['Shipping_address_state__c'], 'postal_code' : item['Shipping_address_ZIP__c'], 'country' : item['Shipping_address_country__c']}
                print('shipping')
                print(shipping_address)
                if shipping_address.setdefault('line1', '') != '':
                    print('should not be empty here')
                    print(shipping_address['line1'])
                    shipping_details = {'name' : item['Shipping_address_name__c'], 'address' : shipping_address}
                else:
                    print('no shipping. take that stufff out')
                    shipping_details = NULL
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
            #print('Unable to extract decline code')
            error = e.json_body['error']
            log.it('Error: The card has been declined:')
            log.it('\tStatus: {}'.format(e.http_status))
            log.it('\tType: {}'.format(error.get('type', '')))
            log.it('\tCode: {}'.format(error.get('code', '')))
            log.it('\tParam: {}'.format(error.get('param', '')))
            log.it('\tMessage: {}'.format(error.get('message', '')))
            log.it('\tDecline code: {}'.format(error.get('decline_code', '')))

            # charge was unsuccessful
            update = {
                'StageName': 'Closed Lost',
                'Stripe_Error_Message__c': "Error: {}".format(e)
                }

            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')

            continue

        except stripe.error.InvalidRequestError as e:
            log.it("Error: {}".format(e))
            update = {
                'StageName': 'Closed Lost',
                'Stripe_Error_Message__c': "Error: {}".format(e)
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')

            continue
        except Exception as e:
            log.it("Error: {}".format(e))
            update = {
                'StageName': 'Closed Lost',
                'Stripe_Error_Message__c': "Error: {}".format(e)
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')

            continue
        if charge.status != 'succeeded':
            log.it("Error: Charge failed. Check Stripe logs.")
            update = {
                'StageName': 'Closed Lost',
                'Stripe_Error_Message__c': "Error: Unknown. Check logs"
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                log.it('salesforce updated')
            else:
                log.it('error updating salesforce because status code was not 204')
                raise Exception('error')

            continue
        # charge was successful
        update = {
            'Stripe_Transaction_Id__c': charge.id,
            'Stripe_Card__c': charge.source.id,
            'Card_type__c': charge.source.brand,
            'Card_expiration_date__c': str(charge.source.exp_month) + ' / ' + str(charge.source.exp_year),
            'Card_acct_last_4__c': charge.source.last4,
            'StageName': 'Closed Won',
            }

        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        # TODO: check 'errors' and 'success' too
        if resp.status_code == 204:
            log.it('salesforce updated')
        else:
            log.it('error updating salesforce because status code was not 204')
            raise Exception('error')


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
    # determine when the card is actually charged: Expected_Giving_Date__c.
    # So we process charges separately for Circles.
    #

    # log.it('---Processing Circle charges...')

    # query = """
    #     SELECT Amount, Name, Stripe_Customer_Id__c, Description,
    #         Stripe_Agreed_to_pay_fees__c
    #     FROM Opportunity
    #     WHERE Expected_Giving_Date__c <= {}
    #     AND Expected_Giving_Date__c >= {}
    #     AND StageName = 'Pledged'
    #     AND Stripe_Customer_Id__c != ''
    #     AND Type = 'Giving Circle'
    #     """.format(today, three_days_ago)

    # process_charges(query, log)
    # log.send()


if __name__ == '__main__':
    charge_cards()
