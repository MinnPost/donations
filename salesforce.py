from datetime import datetime
from decimal import Decimal
import json
import time
import redis
import locale
from pprint import pprint   # TODO: remove

#import celery
from app_celery import make_celery

from core import db, create_app
from models import Transaction
import requests
from pytz import timezone

from config import SALESFORCE
from config import DONATION_RECORDTYPEID
from config import TIMEZONE
from config import ENABLE_SLACK
from config import SLACK_API_KEY
from config import SLACK_CHANNEL
from config import MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT
from config import COMBINED_EMAIL_FIELD
from config import FORM_EMAIL_FIELD
from config import DEFAULT_CAMPAIGN_ONETIME
from config import DEFAULT_CAMPAIGN_RECURRING
from config import ROOT_URL
from config import REDIS_URL
from config import REPORT_RUN_FREQUENCY
from config import REPORT_INSTANCE_FALLBACK

from config import CELERY_BROKER_URL
from config import CELERY_RESULT_BACKEND

from emails import send_email
from check_response import check_response

zone = timezone(TIMEZONE)

ttl = REPORT_RUN_FREQUENCY # how often to run the salesforce report anew

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

TWOPLACES = Decimal(10) ** -2       # same as Decimal('0.01')

WARNINGS = dict()

app = create_app() # create new app instance
app.config.from_pyfile('config.py')
celery=make_celery(app)

def notify_slack(message):
    """
    Send a notification about a donation to Slack.
    """
    if ENABLE_SLACK == 'True':
        payload = {
                'token': SLACK_API_KEY,
                'channel': SLACK_CHANNEL,
                'text': message,
                'username': 'moneybot',
                'icon_emoji': ':moneybag:'

                }
        url = 'https://slack.com/api/chat.postMessage'
        try:
            requests.get(url, params=payload)
        except Exception as e:
            print ('Failed to send Slack notification: {}'.format(e))


def warn_multiple_accounts(email, count):
    """
    Track warnings about multiple accounts (so we don't send
    duplicate warnings about duplicates)
    """
    WARNINGS[email] = count


def send_multiple_account_warning():
    """
    Send the warnings about multiple accounts.
    """

    for email in WARNINGS:
        count = WARNINGS[email]
        body = """
        {} accounts were found matching the email address <{}>
        while inserting a Stripe transaction.

        The transaction was attached to the first match found. You may want to
        move the transaction to the proper account if the one chosen is not
        correct. You may also want to delete or otherwise correct the duplicate
        account(s).
        """.format(count, email)

        send_email(
                recipient=MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT,
                subject="Multiple accounts found for {}".format(email),
                body=body
                )

def get_email(form):
    if 'subscriber_email' in form:
        email = form['subscriber_email']
        print("found subscriber email: {}".format(email))
        return email
    else:
        return form.get('stripeEmail')


class SalesforceConnection(object):
    """
    Represents the Salesforce API.
    """

    def __init__(self):

        self.payload = {
                'grant_type': 'password',
                'client_id': SALESFORCE['CLIENT_ID'],
                'client_secret': SALESFORCE['CLIENT_SECRET'],
                'username': SALESFORCE['USERNAME'],
                'password': SALESFORCE['PASSWORD'],
                }
        token_path = '/services/oauth2/token'
        self.url = '{}://{}{}'.format('https', SALESFORCE['HOST'],
                token_path)

        r = requests.post(self.url, data=self.payload)
        check_response(r)
        response = json.loads(r.text)

        self.instance_url = response['instance_url']
        access_token = response['access_token']

        self.headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'X-PrettyPrint': '1',
                'Content-Type': 'application/json'
                }

        return None


    def query(self, query, path='/services/data/v{}/query'.format(SALESFORCE['API_VERSION'])):
        """
        Call the Salesforce API to do SOQL queries.
        """
        url = '{}{}'.format(self.instance_url, path)
        if query is None:
            payload = {}
        else:
            payload = {'q': query}
        r = requests.get(url, headers=self.headers, params=payload)
        check_response(r)
        response = json.loads(r.text)
        # recursively get the rest of the records:
        if response['done'] is False:
            return response['records'] + self.query(query=None,
                    path=response['nextRecordsUrl'])
        return response['records']

    def post(self, path=None, data=None):
        """
        Call the Salesforce API to make inserts/updates.
        """
        url = '{}{}'.format(self.instance_url, path)
        resp = requests.post(url, headers=self.headers, data=json.dumps(data))
        response = json.loads(resp.text)
        check_response(response=resp, expected_status=201)
        return response

    def _format_contact(self, form=None):
        """
        Format a contact for update/insert.
        """

        stripe_id = form.get('Stripe_Customer_Id__c', None)

        try:
            billing_full = form['full_address']
            try:
                billing_street = form['billing_street_geocode']
                if billing_street == '':
                    billing_street = billing_full
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city_geocode']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state_geocode']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip_geocode']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country_geocode']
            except:
                billing_country = ''
        except:
            try:
                billing_street = form['billing_street']
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country']
            except:
                billing_country = ''

        contact = {
            'Email': form[FORM_EMAIL_FIELD],
            'FirstName': form['first_name'],
            'LastName': form['last_name'],
            'Description': form['description'],
            'LeadSource': 'Stripe',
            'Stripe_Customer_Id__c': stripe_id,
            'MailingStreet': billing_street,
            'MailingCity': billing_city,
            'MailingState': billing_state,
            'MailingPostalCode': billing_zip,
            'MailingCountry': billing_country
            }

        return contact

    def _get_contact(self, contact_id=None):
        """
        We get the contact (after creating it) so that we can find out the ID
        of the account that also created. We need the account so we can tie
        an opportunity to it.
        """

        query = """
                SELECT AccountId
                FROM Contact
                WHERE id = '{}'
                """.format(contact_id)
        response = self.query(query)
        # unlike elsewhere there should only be one result here because we're
        # querying on a 1:1 relationship:
        contact = response[0]
        return contact

    def create_contact(self, form):
        """
        Create and return a contact. Then fetch that created contact to get
        the associated account ID.
        """

        print ("----Creating contact...")
        contact = self._format_contact(form=form)
        path = '/services/data/v{}/sobjects/Contact'.format(SALESFORCE['API_VERSION'])
        response = self.post(path=path, data=contact)
        contact_id = response['id']
        contact = self._get_contact(contact_id)
        return contact

    def find_contact(self, email=None):
        """
        Given an email address return all contacts matching
        it. Returns a list with Account and Stripe IDs.
        """

        query = """
                SELECT AccountId, Id, Stripe_Customer_Id__c
                FROM Contact
                WHERE {0}
                LIKE '%{1}%'
                """.format(COMBINED_EMAIL_FIELD, email)
        response = self.query(query)
        return response

    def get_or_create_contact(self, form):
        """
        Return a contact. If one already exists it's returned. Otherwise
        a new contact is created and returned.
        """

        created = False
        email = form[FORM_EMAIL_FIELD]

        response = self.find_contact(email=email)

        # if the response is empty then nothing matched and we
        # have to create a contact:
        if len(response) < 1:
            contact = self.create_contact(form)
            created = True
            return created, contact

        elif len(response) > 1:
            warn_multiple_accounts(email=email, count=len(response))

        return created, response[0]


# allow for cents to be used in donations without breaking the app
def _format_amount(number):
    return str(Decimal(number).quantize(TWOPLACES))


# customer already exists in stripe; this is adding it to salesforce
def upsert_customer(customer=None, form=None):
    """
    Creates the user if it doesn't exist in Salesforce. If it does exist
    the Stripe Customer ID is added to the Salesforce record.
    """

    if customer is None:
        raise Exception("Value for 'customer' must be specified.")
    if form is None:
        raise Exception("Value for 'form' must be specified.")

    update = {'Stripe_Customer_Id__c': customer.id}
    updated_request = update.copy()
    updated_request.update(form.to_dict())

    sf = SalesforceConnection()
    created, contact = sf.get_or_create_contact(updated_request)

    if not created:
        print ("----Exists, updating")

        path = '/services/data/v{}/sobjects/Contact/{}'.format(SALESFORCE['API_VERSION'], contact['Id'])
        url = '{}{}'.format(sf.instance_url, path)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        check_response(response=resp, expected_status=204)

    return True


def _format_opportunity(contact=None, form=None, customer=None, extra_values=None):
    """
    Format an opportunity for insertion.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    amount = _format_amount(form['amount'])

    # payment method for this opportunity
    if 'stripe_card' in extra_values:
        stripe_card = extra_values['stripe_card'] 
    else:
        stripe_card = ''
    if 'stripe_bank_account' in extra_values:
        stripe_bank_account = extra_values['stripe_bank_account']
    else:
        stripe_bank_account = ''

    #print('opportunity: stripe card is {} and stripe bank is {}'.format(stripe_card, stripe_bank_account))

    try:
        if form['campaign'] != '':
            campaign = form['campaign']
        else:
            campaign = DEFAULT_CAMPAIGN_ONETIME
    except:
        campaign = DEFAULT_CAMPAIGN_ONETIME

    try:
        if form['pledge'] != '':
            pledge = form['pledge']
        else:
            pledge = ''
    except:
        pledge = ''

    try:
        if extra_values['fair_market_value'] != '':
            fair_market_value = extra_values['fair_market_value']
        else:
            fair_market_value = ''
    except:
        fair_market_value = ''

    try:
        if extra_values['invoice'] != '':
            invoice = extra_values['invoice']
        else:
            invoice = ''
    except:
        invoice = ''

    try:
        if extra_values['organization'] != '':
            organization = extra_values['organization']
        else:
            organization = ''
    except:
        organization = ''

    try:
        if extra_values['quantity'] != '':
            quantity = extra_values['quantity']
        else:
            quantity = ''
    except:
        quantity = ''

    try:
        if form['opp_type'] != '':
            type__c = form['opp_type']
        else:
            type__c = 'Donation'
    except:
        type__c = 'Donation'

    try:
        if form['opp_subtype'] != '':
            subtype = form['opp_subtype']
        else:
            subtype = 'Donation: Individual'
    except:
        subtype = 'Donation: Individual'

    try:
        if form['anonymous'] == '1':
            anonymous = True
        else:
            anonymous = False
    except:
        anonymous = False

    try:
        credited_as = form['display_as']
    except:
        credited_as = ''

    try:
        email = form[FORM_EMAIL_FIELD]
    except:
        email = ''

    try:
        first_name = form['first_name']
    except:
        first_name = ''

    try:
        last_name = form['last_name']
    except:
        last_name = ''

    try:
        billing_full = form['full_address']
        try:
            billing_street = form['billing_street_geocode']
            if billing_street == '':
                billing_street = billing_full
        except:
            billing_street = ''
        try:
            billing_city = form['billing_city_geocode']
        except:
            billing_city = ''
        try:
            billing_state = form['billing_state_geocode']
        except:
            billing_state = ''
        try:
            billing_zip = form['billing_zip_geocode']
        except:
            billing_zip = ''
        try:
            billing_country = form['billing_country_geocode']
        except:
            billing_country = ''
    except:
        try:
            billing_street = form['billing_street']
        except:
            billing_street = ''
        try:
            billing_city = form['billing_city']
        except:
            billing_city = ''
        try:
            billing_state = form['billing_state']
        except:
            billing_state = ''
        try:
            billing_zip = form['billing_zip']
        except:
            billing_zip = ''
        try:
            billing_country = form['billing_country']
        except:
            billing_country = ''

    try:
        shipping_name = form['shipping_name']
    except:
        shipping_name = ''
    try:
        shipping_full = form['full_shipping_address']
        try:
            shipping_street = form['shipping_street_geocode']
        except:
            shipping_street = ''
        try:
            shipping_city = form['shipping_city_geocode']
        except:
            shipping_city = ''
        try:
            shipping_state = form['shipping_state_geocode']
        except:
            shipping_state = ''
        try:
            shipping_zip = form['shipping_zip_geocode']
        except:
            shipping_zip = ''
        try:
            shipping_country = form['shipping_country_geocode']
        except:
            shipping_country = ''
    except:
        try:
            shipping_street = form['shipping_street']
        except:
            shipping_street = ''
        try:
            shipping_city = form['shipping_city']
        except:
            shipping_city = ''
        try:
            shipping_state = form['shipping_state']
        except:
            shipping_state = ''
        try:
            shipping_zip = form['shipping_zip']
        except:
            shipping_zip = ''
        try:
            shipping_country = form['shipping_country']
        except:
            shipping_country = ''

    if shipping_name == '' and shipping_street != '':
        shipping_name = first_name + ' ' + last_name

    try:
        flask_id = form['flask_id']
    except:
        flask_id = ''

    try:
        in_memory_name = form['in_memory_name']
    except:
        in_memory_name = ''

    try:
        in_honor_name = form['in_honor_name']
    except:
        in_honor_name = ''

    try:
        if form['in_honor_notify'] == '1':
            in_honor_notify = True
        else:
            in_honor_notify = False
    except:
        in_honor_notify = False

    try:
        in_honor_email = form['in_honor_email']
    except:
        in_honor_email = ''

    try:
        if form['in_honor_amount'] == '1':
            in_honor_amount = True
        else:
            in_honor_amount = False
    except:
        in_honor_amount = False

    try:
        if form['in_memory_notify'] == '1':
            in_memory_notify = True
        else:
            in_memory_notify = False
    except:
        in_memory_notify = False

    try:
        in_memory_email = form['in_memory_email']
    except:
        in_memory_email = ''

    try:
        if form['in_memory_amount'] == '1':
            in_memory_amount = True
        else:
            in_memory_amount = False
    except:
        in_memory_amount = False

    if (in_memory_name != ''):
        inhonorormemory = 'In memory of...'
        inhonorormemoryof = in_memory_name
        inhonorormemory_notify = in_memory_notify
        inhonorormemory_email = in_memory_email
        inhonorormemory_include_amount = in_memory_amount
    elif (in_honor_name != ''):
        inhonorormemory = 'In honor of...'
        inhonorormemoryof = in_honor_name
        inhonorormemory_notify = in_honor_notify
        inhonorormemory_email = in_honor_email
        inhonorormemory_include_amount = in_honor_amount
    else:
        inhonorormemory = ''
        inhonorormemoryof = ''
        inhonorormemory_notify = ''
        inhonorormemory_email = ''
        inhonorormemory_include_amount = ''

    try:
        referral_url = form['source']
    except:
        referral_url = ''

    try:
        full_url = form['url']
    except:
        full_url = ''

    try:
        swag = form['swag'].capitalize()
    except:
        swag = ''

    try:
        swag_other_benefits = form['swag_atlanticsubscription']
        try:
            existing_atlantic_id = form['atlantic_id']
        except:
            existing_atlantic_id = ''
    except:
        swag_other_benefits = ''
        existing_atlantic_id = ''

    if (swag_other_benefits == 'new' or swag_other_benefits == 'existing'):
        swag_other_benefits = 'Atlantic subscription'
    else:
        swag_other_benefits = ''

    try:
        if form['pay_fees'] == '1':
            pay_fees = True
        else:
            pay_fees = False
    except:
        pay_fees = False

    try:
        if extra_values['additional_donation'] != None:
            additional_donation = extra_values['additional_donation']
            amount = float(amount) + float(additional_donation)
        else:
            additional_donation = ''
    except:
        additional_donation = ''

    try:
        if extra_values['attendees'] != '':
            attendees = extra_values['attendees']
        else:
            attendees = ''
    except:
        attendees = ''

    opportunity = {
            'AccountId': '{}'.format(contact['AccountId']),
            'Amount': '{}'.format(amount),
            'CloseDate': today,
            'Description': '{}'.format(form['description']),
            'LeadSource': 'Stripe',
            #'RecordTypeId': DONATION_RECORDTYPEID,
            'Name': '{0} {1} {2} {3}'.format(
                form['first_name'],
                form['last_name'],
                type__c,
                today
            ),
            'Campaignid': campaign,
            'StageName': 'Pledged',
            'Type': type__c,
            'Anonymous__c': anonymous,
            'Credited_as__c': credited_as,
            'Client_Organization__c': organization,
            'Donor_first_name__c': first_name,
            'Donor_last_name__c': last_name,
            'Donor_e_mail__c': email,
            'Donor_address_line_1__c': billing_street,
            'Donor_city__c': billing_city,
            'Donor_state__c': billing_state,
            'Donor_ZIP__c': billing_zip,
            'Donor_country__c': billing_country,
            'Email_to_notify__c': inhonorormemory_email,
            'Event_Attendees__c': attendees,
            'gweb__Eventbrite_Ticket_Quantity__c': quantity,
            'Fair_market_value__c': fair_market_value,
            'Include_amount_in_notification__c': inhonorormemory_include_amount,
            'Flask_Transaction_ID__c': flask_id,
            'In_Honor_Memory__c': inhonorormemory,
            'In_Honor_of_In_Memory__c': inhonorormemoryof,
            'Notify_someone__c': in_honor_notify,
            'Member_benefit_request_Swag__c': swag,
            'Member_benefit_request_Other_benefits__c': swag_other_benefits,
            'Member_benefit_request_Atlantic_sub_ID__c': existing_atlantic_id,
            'MinnPost_Invoice__c': invoice,
            'MRpledge_com_ID__c': pledge,
            'Opportunity_Subtype__c': subtype,
            'Payment_Page_Full_URL__c': full_url,
            'Payment_Type__c': 'Stripe',
            'Referring_page__c': referral_url,
            'Shipping_address_name__c':shipping_name,
            'Shipping_address_street__c': shipping_street,
            'Shipping_address_city__c': shipping_city,
            'Shipping_address_state__c': shipping_state,
            'Shipping_address_ZIP__c': shipping_zip,
            'Shipping_address_country__c': shipping_street,
            'Stripe_Agreed_to_pay_fees__c': pay_fees,
            'Stripe_Bank_Account__c': stripe_bank_account,
            'Stripe_Card__c': stripe_card,
            'Stripe_Customer_Id__c': customer.id,    
            'Ticket_count__c': quantity,        
            #'Encouraged_to_contribute_by__c': '{}'.format(form['reason']),
            # Co Member First name, last name, and email
            }
    #print('opportunity')
    #print(opportunity)
    return opportunity


def add_opportunity(form=None, customer=None, extra_values=None, charge=None):

    print ("----Adding opportunity...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    opportunity = _format_opportunity(contact=contact, form=form,
            customer=customer, extra_values=extra_values)
    path = '/services/data/v{}/sobjects/Opportunity'.format(SALESFORCE['API_VERSION'])
    response = sf.post(path=path, data=opportunity)
    send_multiple_account_warning()

    return response

def get_opportunity(opp_id=None, customer=None, form=None, extra_values=None):
        """
        Return an opportunity. Return an error if it does not exist, but try to log stuff.
        """

        result = _find_opportunity(opp_id=opp_id, customer=customer, form=form) # form is if we are updating it also
        opportunity = result[0]
        response = {'opportunity':opportunity, 'id': opp_id, 'success': True, 'errors' : []}

        # if the response is empty then there is no opportunity for this ID
        if response is None:
            print('Error: this opportunity does not exist')
            response['errors'] = 'We were unable to find your pledge.'
            response['success'] = False

#        print('get existing opportunity')
#        print(response)

        return response


def get_report(report_id=None, async=True):
        """
        Return a report. Return an error if it does not exist, but try to log stuff.
        """

        result = _find_report(report_id=report_id, async=async)
        report = result
        response = {'report':report, 'id': report_id, 'success': True, 'errors' : []}

        # if the response is empty then there is no report for this ID
        if response is None:
            print('Error: this report does not exist')
            response['errors'] = 'We were unable to find your report.'
            response['success'] = False

        return response



def get_recurring(recurring_id=None, customer=None, form=None, extra_values=None):
        """
        Return an opportunity. Return an error if it does not exist, but try to log stuff.
        """

        result = _find_recurring(recurring_id=recurring_id, customer=customer, form=form) # form is if we are updating it also
        recurring = result[0]
        response = {'recurring':recurring, 'id': recurring_id, 'success': True, 'errors' : []}

        # if the response is empty then there is no opportunity for this ID
        if response is None:
            print('Error: this recurring donation does not exist')
            response['errors'] = 'We were unable to find your recurring donation.'
            response['success'] = False

        return response


def get_campaign(campaign_id=None):

    """
    Return a campaign. Return an error if it does not exist, but try to log stuff.
    """

    result = _find_campaign(campaign_id=campaign_id)
    campaign = result[0]
    response = {'campaign':campaign, 'id': campaign_id, 'success': True, 'errors' : []}

    # if the response is empty then there is no campaign for this ID
    if response is None:
        print('Error: this campaign does not exist')
        response['errors'] = 'We were unable to find this event.'
        response['success'] = False

    return response


def _find_opportunity(opp_id=None, customer=None, form=None):
    """
    Given an ID, return the Opportunity matching it.
    If there is form data, update it also.
    """

    query = """
            SELECT Id, Amount, Campaignid, Description, StageName, Type, MRpledge_com_ID__c,
            Donor_first_name__c, Donor_last_name__c, Donor_e_mail__c,
            Stripe_Customer_Id__c
            FROM Opportunity
            WHERE Id='{0}'
            """.format(opp_id)

    sf = SalesforceConnection()
    opportunity = sf.query(query)

    if form is not None:
        print ("----Opportunity form data present, update the record")

        try:
            billing_full = form['full_address']
            try:
                billing_street = form['billing_street_geocode']
                if billing_street == '':
                    billing_street = billing_full
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city_geocode']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state_geocode']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip_geocode']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country_geocode']
            except:
                billing_country = ''
        except:
            try:
                billing_street = form['billing_street']
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country']
            except:
                billing_country = ''

        update = {
            'Description': form['description'],
            'StageName': 'Pledged',
            'Donor_address_line_1__c': billing_street,
            'Donor_city__c': billing_city,
            'Donor_state__c': billing_state,
            'Donor_ZIP__c': billing_zip,
            'Donor_country__c': billing_country,
            'Donor_first_name__c': form['first_name'],
            'Donor_last_name__c': form['last_name'],
            'Donor_e_mail__c': form['email'],
            'Flask_Transaction_ID__c': form['flask_id'],
            'Stripe_Customer_Id__c': customer.id
        }

        if 'amount' in form:
            update['amount'] = _format_amount(form['amount'])

        path = '/services/data/v{}/sobjects/Opportunity/{}'.format(SALESFORCE['API_VERSION'], form['opp_id'])
        url = '{}{}'.format(sf.instance_url, path)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        check_response(response=resp, expected_status=204)
        return opportunity
    else:
        return opportunity



def _find_report(report_id=None, async=True, clear_cache=False):

    sf = SalesforceConnection()

    db = redis.StrictRedis.from_url(REDIS_URL, decode_responses=True)

    report_url = 'analytics/reports/{}/instances'.format(report_id);

    if clear_cache == True:
        db.delete(report_url)
    
    if not db.exists(report_url) or async == False:
        instance = {}

        path = '/services/data/v{}/analytics/reports/{}/?includeDetails=true'.format(SALESFORCE['API_VERSION'], report_id)
        url = '{}{}'.format(sf.instance_url, path)
        r = requests.get(url, headers=sf.headers)
        check_response(r)
        result = json.loads(r.text)

        if 'reportMetadata' in result and result['reportMetadata'] != None:
            path = '/services/data/v{}/{}'.format(SALESFORCE['API_VERSION'], report_url)
            url = '{}{}'.format(sf.instance_url, path)
            params = json.dumps(
                {'reportMetadata': result['reportMetadata']}
            )

            r = requests.post(url, headers=sf.headers, data=params)
            check_response(r)
            result = json.loads(r.text)
            
            if 'id' in result:
                instance['last_updated'] = int(time.time())
                instance['ttl'] = ttl
                instance['id'] = result['id']
                db.hmset(report_url, instance)
                db.expire(report_url, ttl)
                print('---Report {} has an instance id and it is {}. cache it. ---'.format(report_id, instance['id']))
            else:
                print('---Rerun report ID {} because there was no instance ID in the result reportMetadata ---'.format(report_id))
                _find_report(report_id, True)
        else:
            print('---Rerun report ID {} because there was no reportMetadata in the result or its value is None ---'.format(report_id))
            print(r.text)
            _find_report(report_id, True)

    else:
        instance = db.hgetall(report_url)
        print('load cached instance. id is {}'.format(instance['id']))

    path = '/services/data/v{}/{}/{}'.format(SALESFORCE['API_VERSION'], report_url, instance['id'])
    url = '{}{}'.format(sf.instance_url, path)

    r = requests.get(url, headers=sf.headers)
    if r.status_code == 404:
        print('---Rerun report ID {} and instance ID {} because it had a 404 ---'.format(report_id, instance['id']))
        db.delete(report_url)
        _find_report(report_id, True, True)

    check_response(r)
    result = json.loads(r.text)
    if result['attributes']['status'] == 'Success':
        print('success. cache the result')
        cached_report = {}
        cached_report['last_updated'] = int(time.time())
        cached_report['ttl'] = REPORT_INSTANCE_FALLBACK
        cached_report['json'] = result
        db.hmset(report_id + '_' + instance['id'], cached_report)
        db.expire(report_id + '_' + instance['id'], REPORT_INSTANCE_FALLBACK)
    else:
        if db.exists(report_id + '_' + instance['id']):
            result = db.hgetall(report_id + '_' + instance['id'])
            print('return the cached instance because the current call is still running')

    return result



def _find_campaign(campaign_id=None):
    """
    Given an ID, return the Campaign matching it.
    If there is form data, update it also.
    """

    query = """
            SELECT Id, Name, ExpectedRevenue, On_Sale__c, Sold_out__c, Not_on_sale_copy__c, Sold_out_copy__c
            FROM Campaign
            WHERE Id='{0}'
            """.format(campaign_id)

    sf = SalesforceConnection()
    campaign = sf.query(query)

    return campaign


def _find_recurring(recurring_id=None, customer=None, form=None):
    """
    Given an ID, return the Recurring Donation matching it.
    If there is form data, update it also.
    """

    query = """
            SELECT Id, SF_Recurring_Donation_ID__c, npe03__Amount__c, npe03__Recurring_Donation_Campaign__c,
            Donor_first_name__c, Donor_last_name__c, Donor_e_mail__c,
            Stripe_Customer_Id__c
            FROM npe03__Recurring_Donation__c
            WHERE Id = '{}'
            """.format(recurring_id)

    sf = SalesforceConnection()
    recurring = sf.query(query)

    if form is not None:
        print ("----Recurring Donation form data present, update the record")

        try:
            billing_full = form['full_address']
            try:
                billing_street = form['billing_street_geocode']
                if billing_street == '':
                    billing_street = billing_full
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city_geocode']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state_geocode']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip_geocode']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country_geocode']
            except:
                billing_country = ''
        except:
            try:
                billing_street = form['billing_street']
            except:
                billing_street = ''
            try:
                billing_city = form['billing_city']
            except:
                billing_city = ''
            try:
                billing_state = form['billing_state']
            except:
                billing_state = ''
            try:
                billing_zip = form['billing_zip']
            except:
                billing_zip = ''
            try:
                billing_country = form['billing_country']
            except:
                billing_country = ''

        update = {
            'Donor_address_line_1__c': billing_street,
            'Donor_city__c': billing_city,
            'Donor_state__c': billing_state,
            'Donor_ZIP__c': billing_zip,
            'Donor_country__c': billing_country,
            'Donor_first_name__c': form['first_name'],
            'Donor_last_name__c': form['last_name'],
            'Donor_e_mail__c': form['email'],
            'Flask_Transaction_ID__c': form['flask_id'],
            'Stripe_Customer_Id__c': customer.id
        }

        if 'amount' in form:
            update['npe03__Amount__c'] = _format_amount(form['amount'])
        
        path = '/services/data/v{}/sobjects/npe03__Recurring_Donation__c/{}'.format(SALESFORCE['API_VERSION'], form['recurring_id'])
        url = '{}{}'.format(sf.instance_url, path)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        check_response(response=resp, expected_status=204)
        return recurring
    else:
        return recurring


def _format_recurring_donation(contact=None, form=None, customer=None, extra_values=None):
    """
    Format a recurring donation for insertion into SF.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    now = datetime.now(tz=zone).strftime('%Y-%m-%d %I:%M:%S %p %Z')
    amount = _format_amount(form['amount'])

    # payment method for this recurring donation
    if 'stripe_card' in extra_values:
        stripe_card = extra_values['stripe_card'] 
    else:
        stripe_card = ''
    if 'stripe_bank_account' in extra_values:
        stripe_bank_account = extra_values['stripe_bank_account']
    else:
        stripe_bank_account = ''

    try:
        if form['campaign'] != '':
            campaign = form['campaign']
        else:
            campaign = DEFAULT_CAMPAIGN_RECURRING
    except:
        campaign = DEFAULT_CAMPAIGN_RECURRING

    try:
        if form['anonymous'] == '1':
            anonymous = True
        else:
            anonymous = False
    except:
        anonymous = False

    try:
        credited_as = form['display_as']
    except:
        credited_as = ''

    try:
        email = form[FORM_EMAIL_FIELD]
    except:
        email = ''

    try:
        first_name = form['first_name']
    except:
        first_name = ''

    try:
        last_name = form['last_name']
    except:
        last_name = ''

    try:
        billing_full = form['full_address']
        try:
            billing_street = form['billing_street_geocode']
            if billing_street == '':
                billing_street = billing_full
        except:
            billing_street = ''
        try:
            billing_city = form['billing_city_geocode']
        except:
            billing_city = ''
        try:
            billing_state = form['billing_state_geocode']
        except:
            billing_state = ''
        try:
            billing_zip = form['billing_zip_geocode']
        except:
            billing_zip = ''
        try:
            billing_country = form['billing_country_geocode']
        except:
            billing_country = ''
    except:
        try:
            billing_street = form['billing_street']
        except:
            billing_street = ''
        try:
            billing_city = form['billing_city']
        except:
            billing_city = ''
        try:
            billing_state = form['billing_state']
        except:
            billing_state = ''
        try:
            billing_zip = form['billing_zip']
        except:
            billing_zip = ''
        try:
            billing_country = form['billing_country']
        except:
            billing_country = ''

    try:
        shipping_name = form['shipping_name']
    except:
        shipping_name = ''
    try:
        shipping_full = form['full_shipping_address']
        try:
            shipping_street = form['shipping_street_geocode']
        except:
            shipping_street = ''
        try:
            shipping_city = form['shipping_city_geocode']
        except:
            shipping_city = ''
        try:
            shipping_state = form['shipping_state_geocode']
        except:
            shipping_state = ''
        try:
            shipping_zip = form['shipping_zip_geocode']
        except:
            shipping_zip = ''
        try:
            shipping_country = form['shipping_country_geocode']
        except:
            shipping_country = ''
    except:
        try:
            shipping_street = form['shipping_street']
        except:
            shipping_street = ''
        try:
            shipping_city = form['shipping_city']
        except:
            shipping_city = ''
        try:
            shipping_state = form['shipping_state']
        except:
            shipping_state = ''
        try:
            shipping_zip = form['shipping_zip']
        except:
            shipping_zip = ''
        try:
            shipping_country = form['shipping_country']
        except:
            shipping_country = ''

    if shipping_name == '' and shipping_street != '':
        shipping_name = first_name + ' ' + last_name

    try:
        flask_id = form['flask_id']
    except:
        flask_id = ''

    try:
        in_memory_name = form['in_memory_name']
    except:
        in_memory_name = ''

    try:
        in_honor_name = form['in_honor_name']
    except:
        in_honor_name = ''

    try:
        if form['in_honor_notify'] == '1':
            in_honor_notify = True
        else:
            in_honor_notify = False
    except:
        in_honor_notify = False

    try:
        in_honor_email = form['in_honor_email']
    except:
        in_honor_email = ''

    try:
        if form['in_honor_amount'] == '1':
            in_honor_amount = True
        else:
            in_honor_amount = False
    except:
        in_honor_amount = False

    try:
        if form['in_memory_notify'] == '1':
            in_memory_notify = True
        else:
            in_memory_notify = False
    except:
        in_memory_notify = False

    try:
        in_memory_email = form['in_memory_email']
    except:
        in_memory_email = ''

    try:
        if form['in_memory_amount'] == '1':
            in_memory_amount = True
        else:
            in_memory_amount = False
    except:
        in_memory_amount = False

    if (in_memory_name != ''):
        inhonorormemory = 'In memory of...'
        inhonorormemoryof = in_memory_name
        inhonorormemory_notify = in_memory_notify
        inhonorormemory_email = in_memory_email
        inhonorormemory_include_amount = in_memory_amount
    elif (in_honor_name != ''):
        inhonorormemory = 'In honor of...'
        inhonorormemoryof = in_honor_name
        inhonorormemory_notify = in_honor_notify
        inhonorormemory_email = in_honor_email
        inhonorormemory_include_amount = in_honor_amount
    else:
        inhonorormemory = ''
        inhonorormemoryof = ''
        inhonorormemory_notify = ''
        inhonorormemory_email = ''
        inhonorormemory_include_amount = ''

    try:
        referral_url = form['source']
    except:
        referral_url = ''

    try:
        full_url = form['url']
    except:
        full_url = ''

    try:
        swag = form['swag'].capitalize()
    except:
        swag = ''

    try:
        swag_other_benefits = form['swag_atlanticsubscription']
        try:
            existing_atlantic_id = form['atlantic_id']
        except:
            existing_atlantic_id = ''
    except:
        swag_other_benefits = ''
        existing_atlantic_id = ''

    if (swag_other_benefits == 'new' or swag_other_benefits == 'existing'):
        swag_other_benefits = 'Atlantic subscription'
    else:
        swag_other_benefits = ''


    open_ended_status = 'Open'

    try:
        if form['pay_fees'] == '1':
            pay_fees = True
        else:
            pay_fees = False
    except:
        pay_fees = False

    # remove type__c field because it is no longer in salesforce
    # texas is using type__c = 'Recurring Donation'
    # I feel like we had a pattern of using Donation here, but do not know why
    #try:
    #    if form['opp_type'] != '':
    #        type__c = form['opp_type']
    #    else:
    #        type__c = 'Donation'
    #except:
    #    type__c = 'Donation'
    #
    try:
        if extra_values['additional_donation'] != None:
            additional_donation = extra_values['additional_donation']
            amount = float(amount) + float(additional_donation)
        else:
            additional_donation = ''
    except:
        additional_donation = ''

    # TODO: test this:
    #if installments != 'None':
    #    amount = int(amount) * int(installments)
    #else:
    #    installments = 0

    if form['recurring'] != 'None':
        installment_period = form['recurring'].title()
    else:
        installment_period = ''

    recurring_donation = {
        'Name': '{0} {1} {2} {3}'.format(
            form['first_name'],
            form['last_name'],
            'recurring donation',
            today
        ),
        'npe03__Amount__c': '{}'.format(amount),
        'Anonymous__c': anonymous,
        'npe03__Recurring_Donation_Campaign__c': '{}'.format(campaign),
        'npe03__Contact__c': '{}'.format(contact['Id']),
        'Credited_as__c': credited_as,
        'npe03__Date_Established__c': today,
        'Donor_address_line_1__c': billing_street,
        'Donor_city__c': billing_city,
        'Donor_state__c': billing_state,
        'Donor_ZIP__c': billing_zip,
        'Donor_country__c': billing_country,
        'Donor_e_mail__c': email,
        'Donor_first_name__c': first_name,
        'Donor_last_name__c': last_name,
        'Email_to_notify__c': inhonorormemory_email,
        'Include_amount_in_notification__c': inhonorormemory_include_amount,
        'In_Honor_Memory__c': inhonorormemory,
        'In_honor_memory_of__c': inhonorormemoryof,
        'Flask_Transaction_ID__c': flask_id,
        'Notify_someone__c': in_honor_notify,
        #'npe03__Installments__c': installments, # only add this if we need to close it
        'npe03__Installment_Period__c': installment_period, # this has to be there even if it is open ended
        'Lead_Source__c': 'Stripe',
        'Member_benefit_request_Swag__c': swag,
        'Member_benefit_request_Other_benefits__c': swag_other_benefits,
        'Member_benefit_request_Atlantic_sub_ID__c': existing_atlantic_id,
        'npe03__Open_Ended_Status__c': open_ended_status,
        'Payment_Page_Full_URL__c': full_url,
        'Payment_Type__c': 'Stripe',
        'Referring_page__c': referral_url,
        'Shipping_address_name__c':shipping_name,
        'Shipping_address_street__c': shipping_street,
        'Shipping_address_city__c': shipping_city,
        'Shipping_address_state__c': shipping_state,
        'Shipping_address_ZIP__c': shipping_zip,
        'Shipping_address_country__c': shipping_street,
        'Stripe_Agreed_to_pay_fees__c': pay_fees,
        'Stripe_Bank_Account__c': stripe_bank_account,
        'Stripe_Card__c': stripe_card,
        'Stripe_Customer_Id__c': customer.id,
        'Stripe_Description__c': '{}'.format(form['description']),
        #'Encouraged_to_contribute_by__c': '{}'.format(form['reason']),
        #'Type__c': type__c,
    }
    #pprint(recurring_donation)   # TODO: rm
    return recurring_donation


def add_recurring_donation(form=None, customer=None, extra_values=None):
    """
    Insert a recurring donation into SF.
    """

    print ("----Adding recurring donation...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    recurring_donation = _format_recurring_donation(contact=contact,
            form=form, customer=customer, extra_values=extra_values)
    path = '/services/data/v{}/sobjects/npe03__Recurring_Donation__c'.format(SALESFORCE['API_VERSION'])
    response = sf.post(path=path, data=recurring_donation)
    send_multiple_account_warning()

    return response


@celery.task(name='salesforce.add_customer_and_charge')
def add_customer_and_charge(form=None, customer=None, flask_id=None, extra_values=None):
    """
    Add a contact and their donation into SF. 
    Texas does this in the background, but MinnPost does not since our donation form has a couple of stages
    and we want to show the user what has happened.
    """
    amount = _format_amount(form['amount'])
    name = '{} {}'.format(form['first_name'], form['last_name'])
        
    #reason = form['reason']
    #if reason != '':
        #reason = ' (encouraged by {})'.format(reason)

    upsert_customer(form=form, customer=customer) # remember customer already exists; this adds it to sf

    if flask_id != None:
        form = form.to_dict()
        form['flask_id'] = flask_id

    if (form['recurring'] == 'one-time'):
        print("----One time payment...")
        msg = '*{}* pledged *${}*'.format(name, amount)
        print(msg)
        notify_slack(msg)
        if 'opp_id' not in form and 'recurring_id' not in form:
            response = add_opportunity(form=form, customer=customer, extra_values=extra_values)
        elif 'recurring_id' in form:
            response = get_recurring(recurring_id=form['recurring_id'], customer=customer, form=form, extra_values=extra_values)
        else:
            response = get_opportunity(opp_id=form['opp_id'], customer=customer, form=form, extra_values=extra_values)
        
        #print('response is')
        #print(response)
        #print('end response')

    else:
        print("----Recurring payment...")
        msg = '*{}* pledged *${}* [recurring]'.format(name, amount)
        print(msg)
        notify_slack(msg)
        response = add_recurring_donation(form=form, customer=customer, extra_values=extra_values)

    #print('1')
    #print(response)

    if not response['errors']:
        #print('update the database')
        #print(response)

        with app.app_context():
            # add the salesforce id to the local database where the flask id matches
            transaction = Transaction.query.get(flask_id)
            # print(flask_id)
            # print(transaction)
            # transaction = db.session.query(Transaction).get(flask_id)
            #print('add the sf id {} to the transaction with flask ID {}'.format(response['id'], flask_id))
            transaction.sf_id = response['id']
            db.session.commit()
            # print('committed the db')

    return response


def _format_blast_rdo(contact=None, form=None, customer=None):
    """
    Format a Blast subscription for insertion into SF.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    now = datetime.now(tz=zone).strftime('%Y-%m-%d %I:%M:%S %p %Z')
    amount = _format_amount(form['amount'])
    installments = 0
    open_ended_status = 'Open'
    pprint(form)

    if form['pay_fees_value'] == 'True':
        pay_fees = True
    else:
        pay_fees = False

    if amount == '40':
        installment_period = 'monthly'
    else:
        installment_period = 'yearly'

    blast_subscription = {
            'npe03__Contact__c': '{}'.format(contact['Id']),
            'npe03__Amount__c': '{}'.format(amount),
            'npe03__Date_Established__c': today,
            'npe03__Open_Ended_Status__c': 'Open',
            'Name': '{} {} - {} - The Blast'.format(
                form['first_name'],
                form['last_name'],
                now,
                ),
            'Stripe_Customer_Id__c': customer.id,
            'Lead_Source__c': 'Stripe',
            'Stripe_Description__c': '{}'.format(form['description']),
            'Stripe_Agreed_to_pay_fees__c': pay_fees,
            'npe03__Open_Ended_Status__c': open_ended_status,
            'npe03__Installments__c': installments,
            'npe03__Installment_Period__c': installment_period,
            'Type__c': 'The Blast',
            'Billing_Email__c': '{}'.format(form['stripeEmail']),
            'Blast_Subscription_Email__c': '{}'.format(
                form['subscriber_email']),
            }
    pprint(blast_subscription)   # TODO: rm
    return blast_subscription


def add_blast_subscription(form=None, customer=None, charge=None):

    print ("----Adding Blast RDO...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    recurring_donation = _format_blast_rdo(contact=contact,
            form=form, customer=customer)
    path = '/services/data/v{}/sobjects/npe03__Recurring_Donation__c'.format(SALESFORCE['API_VERSION'])
    response = sf.post(path=path, data=recurring_donation)
    send_multiple_account_warning()

    return response


@celery.task(name='salesforce.add_blast_customer_and_charge')
def add_blast_customer_and_charge(form=None, customer=None):

    upsert_customer(customer=customer, form=form)

    add_blast_subscription(form=form, customer=customer)

    return True




@celery.task(name='salesforce.update_donation_object', bind=True, max_retries=None)
#def update_donation_object(object_name=None, sf_id=None, form=None):
def update_donation_object(self, object_name=None, flask_id=None, form=None):
    print ("----Update {}...".format(object_name))
    #print('---Updating this {} ---'.format(object_name))
    #print('update the flask id {}'.format(flask_id))
    #print(form)

    try:
        reason_for_supporting = form['reason_for_supporting']
    except:
        reason_for_supporting = ''

    try:
        if form['reason_shareable'] == '1':
            reason_for_supporting_shareable = True
        else:
            reason_for_supporting_shareable = False
    except:
        reason_for_supporting_shareable = False

    newsletters = form.getlist('newsletters')
    messages = form.getlist('messages')

    if 'Daily newsletter' in newsletters:
        daily_newsletter = True
    else:
        daily_newsletter = False

    if 'Greater Minnesota newsletter' in newsletters:
        greater_mn_newsletter = True
    else:
        greater_mn_newsletter = False

    if 'Sunday review' in newsletters:
        sunday_review_newsletter = True
    else:
        sunday_review_newsletter = False

    if 'Events & member benefits' in messages:
        event_messages = True
    else:
        event_messages = False

    if 'Opportunities to give MinnPost input/feedback' in messages:
        feedback_messages = True
    else:
        feedback_messages = False

    with app.app_context():
        # get the salesforce id from the local database where the flask id matches
        #print('flask id')
        #print(flask_id)
        transaction = Transaction.query.filter(Transaction.id==flask_id,Transaction.sf_id!='NULL').first()
        #print('Retrieve transaction with flask ID {} and a non-null Salesforce ID'.format(flask_id))
        if transaction is not None:
            #print('transaction has been added to salesforce. get its sf id ({}) and update it in salesforce.'.format(transaction.sf_id))
            #if transaction.sf_id != 'NULL':
            sf_id = transaction.sf_id
            #print('sf id?')
            #print(sf_id)
        else:
            print('no sf id here yet. delay and try again.')
            raise self.retry(countdown=300)

        sf = SalesforceConnection()

        query = """
            SELECT Reason_for_Gift__c, Reason_for_gift_shareable__c,
            Daily_newsletter_sign_up__c, Greater_MN_newsletter__c, Sunday_Review_newsletter__c,
            Event_member_benefit_messages__c, Input_feedback_messages__c
            FROM {} 
            WHERE Id = '{}'
            """.format(object_name, sf_id)

        response = sf.query(query)

        if response:
            path = response[0]['attributes']['url']
            url = '{}{}'.format(sf.instance_url, path)
            #print (url)

            update = {
                'Reason_for_Gift__c': reason_for_supporting,
                'Reason_for_gift_shareable__c': reason_for_supporting_shareable,
                'Daily_newsletter_sign_up__c': daily_newsletter,
                'Greater_MN_newsletter__c': greater_mn_newsletter,
                'Sunday_Review_newsletter__c': sunday_review_newsletter,
                'Event_member_benefit_messages__c': event_messages,
                'Input_feedback_messages__c': feedback_messages
                }
            
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            # TODO: check 'errors' and 'success' too
            #print (resp)
            if resp.status_code == 204:
                return True
            else:
                raise Exception('problem')
        else:
            print('Error: No response from Salesforce query {}'.format(query))
        
