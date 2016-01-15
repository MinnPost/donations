from datetime import datetime
import json
import locale
from pprint import pprint   # TODO: remove

import celery
import requests
from pytz import timezone

from config import SALESFORCE
from config import DONATION_RECORDTYPEID, TEXASWEEKLY_RECORDTYPEID
from config import TIMEZONE
from config import ENABLE_SLACK
from config import SLACK_API_KEY
from config import SLACK_CHANNEL
from config import MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT
from config import COMBINED_EMAIL_FIELD
from config import FORM_EMAIL_FIELD
from config import DEFAULT_CAMPAIGN_ONETIME
from config import DEFAULT_CAMPAIGN_RECURRING

from emails import send_email
from check_response import check_response

zone = timezone(TIMEZONE)

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

WARNINGS = dict()


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

    def query(self, query, path='/services/data/v35.0/query'):
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

        try:
            stripe_id = form['Stripe_Customer_Id__c']
        except KeyError:
            stripe_id = None

        contact = {
            'Email': form[FORM_EMAIL_FIELD],
            'FirstName': form['first_name'],
            'LastName': form['last_name'],
            'Description': form['description'],
            'LeadSource': 'Stripe',
            'Stripe_Customer_Id__c': stripe_id,
            'MailingStreet': form['billing_street_geocode'],
            'MailingCity': form['billing_city_geocode'],
            'MailingState': form['billing_state_geocode'],
            'MailingPostalCode': form['billing_zip_geocode'],
            'MailingCountry': form['billing_country_geocode']
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
        path = '/services/data/v35.0/sobjects/Contact'
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

        path = '/services/data/v35.0/sobjects/Contact/{}'.format(contact['Id'])
        url = '{}{}'.format(sf.instance_url, path)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        check_response(response=resp, expected_status=204)

    return True


def _format_opportunity(contact=None, form=None, customer=None):
    """
    Format an opportunity for insertion.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')

    try:
        if form['campaign'] != '':
            campaign = form['campaign']
        else:
            campaign = DEFAULT_CAMPAIGN_ONETIME
    except:
        campaign = DEFAULT_CAMPAIGN_ONETIME

    try:
        if form['type'] != '':
            type__c = form['type']
        else:
            type__c = 'Donation'
    except:
        type__c = 'Donation'

    try:
        if form['subtype'] != '':
            subtype = form['subtype']
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

    opportunity = {
            'AccountId': '{}'.format(contact['AccountId']),
            'Amount': '{}'.format(form['amount']),
            'CloseDate': today,
            'Description': '{}'.format(form['description']),
            'LeadSource': 'Stripe',
            #'RecordTypeId': DONATION_RECORDTYPEID,
            'Name': '{0} {1} {2} {3}'.format(
                form['first_name'],
                form['last_name'],
                'Donation',
                today
            ),
            'Campaignid': campaign,
            'StageName': 'Pledged',
            'Type': type__c,
            'Anonymous__c': anonymous,
            'Credited_as__c': credited_as,
            'Donor_first_name__c': first_name,
            'Donor_last_name__c': last_name,
            'Donor_e_mail__c': email,
            'Donor_address_line_1__c': billing_street,
            'Donor_city__c': billing_city,
            'Donor_state__c': billing_state,
            'Donor_ZIP__c': billing_zip,
            'Donor_country__c': billing_country,
            'Email_to_notify__c': inhonorormemory_email,
            'Include_amount_in_notification__c': inhonorormemory_include_amount,
            'Flask_Transaction_ID__c': flask_id,
            'In_Honor_Memory__c': inhonorormemory,
            'In_Honor_of_In_Memory__c': inhonorormemoryof,
            'Notify_someone__c': in_honor_notify,
            'Member_benefit_request_Swag__c': swag,
            'Member_benefit_request_Other_benefits__c': swag_other_benefits,
            'Member_benefit_request_Atlantic_sub_ID__c': existing_atlantic_id,
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
            'Stripe_Customer_Id__c': customer.id,            
            #'Encouraged_to_contribute_by__c': '{}'.format(form['reason']),
            # Co Member First name, last name, and email
            }
    print('opportunity')
    print(opportunity)
    return opportunity


def add_opportunity(form=None, customer=None, charge=None):

    print ("----Adding opportunity...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    opportunity = _format_opportunity(contact=contact, form=form,
            customer=customer)
    path = '/services/data/v35.0/sobjects/Opportunity'
    response = sf.post(path=path, data=opportunity)
    send_multiple_account_warning()

    return response


def _format_recurring_donation(contact=None, form=None, customer=None):
    """
    Format a recurring donation for insertion into SF.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    now = datetime.now(tz=zone).strftime('%Y-%m-%d %I:%M:%S %p %Z')
    amount = form['amount']

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

    try:
        if form['type'] != '':
            type__c = form['type']
        else:
            type__c = 'Donation'
    except:
        type__c = 'Donation'

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
        'Stripe_Customer_Id__c': customer.id,
        'Stripe_Description__c': '{}'.format(form['description']),
        #'Encouraged_to_contribute_by__c': '{}'.format(form['reason']),
        'Type__c': type__c,
    }
    #pprint(recurring_donation)   # TODO: rm
    return recurring_donation


def add_recurring_donation(form=None, customer=None):
    """
    Insert a recurring donation into SF.
    """

    print ("----Adding recurring donation...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    recurring_donation = _format_recurring_donation(contact=contact,
            form=form, customer=customer)
    path = '/services/data/v35.0/sobjects/npe03__Recurring_Donation__c'
    response = sf.post(path=path, data=recurring_donation)
    send_multiple_account_warning()

    return response


@celery.task(name='salesforce.add_customer_and_charge')
def add_customer_and_charge(form=None, customer=None, flask_id=None):
    """
    Add a contact and their donation into SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them.
    """
    amount = form['amount']
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
        response = add_opportunity(form=form, customer=customer)
    else:
        print("----Recurring payment...")
        msg = '*{}* pledged *${}* [recurring]'.format(name, amount)
        print(msg)
        notify_slack(msg)
        response = add_recurring_donation(form=form, customer=customer)

    if not response['errors']:
        # do something to notify that the task was finished successfully
        message = {'flask_id' : flask_id, 'sf_id' : response['id']}
        print(message)
        print('call endpoint now and update it')
        #url = url_for('transaction_result', _external=True)
        res = requests.post('http://0.0.0.0:5000/transaction_result/', json=json.dumps(message))
    return response


def _format_tw_opportunity(contact=None, form=None, customer=None):
    """
    Format a Texas Weekly opportunity for insertion.
    """

    today = datetime.now(tz=zone).strftime('%Y-%m-%d')

    opportunity = {
            'AccountId': '{}'.format(contact['AccountId']),
            'Amount': '{}'.format(form['amount']),
            'CloseDate': today,
            'RecordTypeId': TEXASWEEKLY_RECORDTYPEID,
            'Type': 'Single',
            'Name': '{}{} ({})'.format(
                form['first_name'],
                form['last_name'],
                form[FORM_EMAIL_FIELD],
                ),
            'StageName': 'Pledged',
            'Stripe_Customer_Id__c': customer.id,
            'LeadSource': 'Stripe',
            'Description': '{}'.format(form['description']),
            }
    return opportunity


def add_tw_subscription(form=None, customer=None, charge=None):

    print ("----Adding TW subscription opportunity...")
    sf = SalesforceConnection()
    _, contact = sf.get_or_create_contact(form)
    opportunity = _format_tw_opportunity(contact=contact, form=form,
            customer=customer)
    path = '/services/data/v35.0/sobjects/Opportunity'
    response = sf.post(path=path, data=opportunity)
    send_multiple_account_warning()

    return response


#@celery.task(name='salesforce.add_tw_customer_and_charge')
def add_tw_customer_and_charge(form=None, customer=None):

    upsert_customer(customer=customer, form=form)

    add_tw_subscription(form=form, customer=customer)

    return True




@celery.task(name='salesforce.update_donation_object')
def update_donation_object(object_name=None, sf_id=None, form=None):
    print ("----Update opportunity...")
    #print('---Updating this {} ---'.format(object_name))

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

    sf = SalesforceConnection()

    query = """
        SELECT Reason_for_Gift__c, Reason_for_gift_shareable__c,
        Daily_newsletter_sign_up__c, Greater_MN_newsletter__c, Sunday_Review_newsletter__c,
        Event_member_benefit_messages__c, Input_feedback_messages__c
        FROM {} 
        WHERE Id = '{}'
        """.format(object_name, sf_id)

    response = sf.query(query)

    update = {
        'Reason_for_Gift__c': reason_for_supporting,
        'Reason_for_gift_shareable__c': reason_for_supporting_shareable,
        'Daily_newsletter_sign_up__c': daily_newsletter,
        'Greater_MN_newsletter__c': greater_mn_newsletter,
        'Sunday_Review_newsletter__c': sunday_review_newsletter,
        'Event_member_benefit_messages__c': event_messages,
        'Input_feedback_messages__c': feedback_messages
        }

    path = response[0]['attributes']['url']
    url = '{}{}'.format(sf.instance_url, path)
    #print (url)
    resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
    # TODO: check 'errors' and 'success' too
    #print (resp)
    if resp.status_code == 204:
        return True
    else:
        raise Exception('problem')
