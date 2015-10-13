import json
import requests
import locale
from datetime import datetime
from config import SALESFORCE
from config import DONATION_RECORDTYPEID
from pprint import pprint  # TODO: remove

# TODO: insert URLs like this?
# https://dashboard.stripe.com/test/customers/cus_77dLtLXIezcSHe?

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')


class SalesforceConnection(object):

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

    def init(self):

        # TODO: some error handling here:
        r = requests.post(self.url, data=self.payload)
        print (r)
        print (r.text)
        response = json.loads(r.text)
        self.instance_url = response['instance_url']
        access_token = response['access_token']

        self.headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'X-PrettyPrint': '1',
                'Content-Type': 'application/json'
                }

        return True

    def query(self, query, path='/services/data/v34.0/query'):
        url = '{}{}'.format(self.instance_url, path)
        if query is None:
            payload = {}
        else:
            payload = {'q': query}
        # TODO: error handling:
        r = requests.get(url, headers=self.headers, params=payload)
        response = json.loads(r.text)
        # recursively get the rest of the records:
        if response['done'] is False:
            return response['records'] + self.query(query=None,
                    path=response['nextRecordsUrl'])
        return response['records']

    def post(self, path=None, data=None):
        url = '{}{}'.format(self.instance_url, path)
        resp = requests.post(url, headers=self.headers, data=json.dumps(data))
        response = json.loads(resp.text)
        pprint(response)
        pprint(resp)
        print (resp.status_code)
        if resp.status_code != 201:
            raise Exception("bad")  # TODO
        else:
            return response

    def create_contact(self, request):

        print ("----Creating contact...")

        try:
            stripe_id = request['Stripe_Customer_Id__c']
        except KeyError:
            stripe_id = None

        contact = {
            'Email': request['stripeEmail'],
            'FirstName': request['Contact.FirstName'],
            'LastName': request['Contact.LastName'],
            'HomePhone': request['Contact.HomePhone'],
            'MailingStreet': request['Contact.street'],
#            'MailingStreet': request['Contact.MailingStreet'],
            'MailingCity': 'Austin',
            'MailingState': 'TX',
            'MailingPostalCode': request['Contact.postalCode'],
#            'MailingPostalCode': request['Contact.MailingPostalCode'],
            'Description': 'added by Stripe/Checkout app',
            'LeadSource': 'Stripe',
            'Stripe_Customer_Id__c': stripe_id,
            }
        path = '/services/data/v34.0/sobjects/Contact'
        response = self.post(path=path, data=contact)
        contact_id = response['id']
        query = """
                SELECT AccountId
                FROM Contact
                WHERE id = '{}'
                """.format(contact_id)
        # pprint (query)
        response = self.query(query)
        # unlike elsewhere there should only be one result here because we're
        # querying on a 1:1 relationship:
        return response[0]

    def get_contact(self, email=None):

        query = """
                SELECT AccountId, Id, Stripe_Customer_Id__c
                FROM Contact
                WHERE All_In_One_EMail__c
                LIKE '%{}%'
                """.format(email)
        # jpprint (query)
        response = self.query(query)
        return response

    def get_or_create_contact(self, request):

        created = False

        response = self.get_contact(email=request['stripeEmail'])

        # if the response is empty then nothing matched and we
        # have to create a contact:
        if len(response) < 1:
            contact = self.create_contact(request)
            created = True
            return created, contact

        elif len(response) > 1:
            print ("more than one result")
            # TODO: send alert because more than one account matched

        return created, response[0]


def upsert(customer=None, request=None):
    """
    Creates the user if it doesn't exist in Salesforce. If it does exist
    the Stripe Customer ID is added to the Salesforce record.
    """

    if customer is None:
        raise Exception("Value for 'customer' must be specified.")
    if request is None:
        raise Exception("Value for 'request' must be specified.")

    update = {'Stripe_Customer_Id__c': customer.id}
    updated_request = update.copy()
    updated_request.update(request.form.to_dict())

    sf = SalesforceConnection()
    sf.init()
    created, contact = sf.get_or_create_contact(updated_request)

    if not created:
        print ("----Exists, updating")
        # pprint (contact)
        path = '/services/data/v34.0/sobjects/Contact/{}'.format(contact['Id'])
        url = '{}{}'.format(sf.instance_url, path)
        print (url)
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        # TODO: check 'errors' and 'success' too
        print (resp)
        if resp.status_code == 204:
            print ("ok")
        else:
            raise Exception('problem')

    return True


def add_opportunity(request=None, customer=None, charge=None, reason=None):

    print ("----Adding opportunity...")
    sf = SalesforceConnection()
    sf.init()
    _, contact = sf.get_or_create_contact(request.form)
    now = datetime.now().isoformat()

    opportunity = {
            'AccountId': '{}'.format(contact['AccountId']),
            'Amount': '{}'.format(request.form['Opportunity.Amount']),
            'CloseDate': now,
            'RecordTypeId': DONATION_RECORDTYPEID,
            'Name': 'TODO',
            'StageName': 'Pledged',
            'Stripe_Customer_Id__c': customer.id,
#            'Stripe_Transaction_Id__c': charge.id,
#            'Stripe_Card__c': charge.source.id,
            'LeadSource': 'Stripe',
#            'Description': charge.description,
            'Encouraged_to_contribute_by__c': reason,
            # Co Member First name, last name, and email
            }
    #pprint (opportunity)
    path = '/services/data/v34.0/sobjects/Opportunity'
    response = sf.post(path=path, data=opportunity)
    pprint (response)

    return response


def add_recurring_donation(request=None, customer=None, reason=None):

    print ("----Adding recurring donation...")
    sf = SalesforceConnection()
    sf.init()
    _, contact = sf.get_or_create_contact(request.form)
    now = datetime.now().strftime('%Y-%m-%d')
    recurring_donation = {
            'npe03__Contact__c': '{}'.format(contact['Id']),
            'npe03__Amount__c': '{}'.format(
                request.form['Opportunity.Amount']),
            'npe03__Date_Established__c': now,
            'npe03__Open_Ended_Status__c': '',
#            'Name': 'TODO',
            'Stripe_Customer_Id__c': customer.id,
#            'Stripe_Transaction_Id__c': charge.id,
#            'Stripe_Card__c': charge.source.id,
            'Lead_Source__c': 'Stripe', # TODO: this is showing as Givalike in SF; probably a trigger to remove
            'Encouraged_to_contribute_by__c': reason,
            'npe03__Open_Ended_Status__c': 'Open',
            'npe03__Installments__c': '', # TODO: 3 or 36 for circle
            'npe03__Installment_Period__c': 'Monthly', #TODO: could be yearly
            # Co Member First name, last name, and email  TODO
            # Type (Giving Circle, etc) TODO
            }
    # pprint (recurring_donation)
    path = '/services/data/v34.0/sobjects/npe03__Recurring_Donation__c'
    response = sf.post(path=path, data=recurring_donation)
    # TODO: error handling
    pprint(response)

    return True
