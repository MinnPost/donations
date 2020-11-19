import csv
import json
import logging
import os
from datetime import datetime
from decimal import Decimal
from io import StringIO

import requests
from fuzzywuzzy import process
from pytz import timezone
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

ZONE = timezone(os.environ.get("TIMEZONE", "US/Central"))

SALESFORCE_API_VERSION = os.environ.get("SALESFORCE_API_VERSION", "v43.0")

SALESFORCE_CLIENT_ID = os.environ.get("SALESFORCE_CLIENT_ID", "")
SALESFORCE_CLIENT_SECRET = os.environ.get("SALESFORCE_CLIENT_SECRET", "")
SALESFORCE_USERNAME = os.environ.get("SALESFORCE_USERNAME", "")
SALESFORCE_PASSWORD = os.environ.get("SALESFORCE_PASSWORD", "")
SALESFORCE_HOST = os.environ.get("SALESFORCE_HOST", "")

COMBINED_EMAIL_FIELD = os.environ.get("COMBINED_EMAIL_FIELD", "")

TWOPLACES = Decimal(10) ** -2  # same as Decimal('0.01')

# this should match whatever record type Salesforce's NPSP is
# configured to use for opportunities on an RDO
DEFAULT_RDO_TYPE = os.environ.get("DEFAULT_RDO_TYPE", "Membership")

logging.getLogger("urllib3").setLevel(logging.DEBUG)


class SalesforceException(Exception):
    pass


def requests_retry_session(
    retries=3,
    backoff_factor=1,
    status_forcelist=(400, 500, 502, 503, 504),
    method_whitelist=False,
    session=None,
):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        status=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        method_whitelist=method_whitelist,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session


class SalesforceConnection(object):

    """
    Represents the Salesforce API.
    """

    host = SALESFORCE_HOST

    def __init__(self):

        self.payload = {
            "grant_type": "password",
            "client_id": SALESFORCE_CLIENT_ID,
            "client_secret": SALESFORCE_CLIENT_SECRET,
            "username": SALESFORCE_USERNAME,
            "password": SALESFORCE_PASSWORD,
        }
        token_path = "/services/oauth2/token"
        self.url = f"https://{self.host}{token_path}"

        self._instance_url = None

    def _get_token(self):

        r = requests_retry_session().post(self.url, data=self.payload)
        self.check_response(r)
        response = json.loads(r.text)

        self._instance_url = response["instance_url"]
        access_token = response["access_token"]

        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "X-PrettyPrint": "1",
            "Content-Type": "application/json",
        }

    @property
    def instance_url(self):
        if not self._instance_url:
            self._get_token()
        return self._instance_url

    @staticmethod
    def check_response(response=None, expected_status=200):
        """
        Check the response from API calls to determine if they succeeded and
        if not, why.
        """
        code = response.status_code
        if code == 204 and expected_status == 204:
            return True
        try:
            content = json.loads(response.content.decode("utf-8"))
        except Exception as e:
            logging.debug(f"Exception in check_response: {e}")
        if code != expected_status:
            e = SalesforceException(f"Expected {expected_status} but got {code}")
            try:
                e.content = content[0]
            except NameError:
                e.content = None
            except KeyError:
                e.content = content
            e.response = response
            logging.info(f"response.text: {response.text}")
            raise e
        return True

    def query(self, query, path=None):

        """
        Call the Salesforce API to do SOQL queries.
        """
        if path is None:
            path = f"/services/data/{SALESFORCE_API_VERSION}/query"

        url = f"{self.instance_url}{path}"
        if query is None:
            payload = {}
        else:
            payload = {"q": query}
        logging.debug(query)
        r = requests.get(url, headers=self.headers, params=payload)
        self.check_response(r)
        response = json.loads(r.text)
        # recursively get the rest of the records:
        if response["done"] is False:
            return response["records"] + self.query(
                query=None, path=response["nextRecordsUrl"]
            )
        logging.debug(response)
        return response["records"]

    def post(self, path, data):
        """
        Call the Salesforce API to make inserts.
        """
        url = f"{self.instance_url}{path}"
        resp = requests.post(url, headers=self.headers, data=json.dumps(data))
        response = json.loads(resp.text)
        self.check_response(response=resp, expected_status=201)
        logging.debug(response)
        return response

    def patch(self, path, data, expected_response=204):
        """
        Call the Saleforce API to make updates.
        """

        url = f"{self.instance_url}{path}"
        logging.debug(data)
        resp = requests.patch(url, headers=self.headers, data=json.dumps(data))
        self.check_response(response=resp, expected_status=expected_response)
        return resp

    def updates(self, objects, changes):

        if not objects:
            raise SalesforceException("at least one object must be specified")

        data = dict()
        # what should this value be?
        data["allOrNone"] = False
        records = list()
        for item in objects:
            record = dict()
            record["attributes"] = {"type": item.api_name}
            record["id"] = item.id
            for k, v in changes.items():
                record[k] = v
            records.append(record)
        data["records"] = records
        path = f"/services/data/{SALESFORCE_API_VERSION}/composite/sobjects/"
        response = self.patch(path, data, expected_response=200)
        response = json.loads(response.text)
        logging.debug(response)
        error = False
        for item in response:
            if item["success"] is not True:
                logging.warning(f"{item['errors']}")
                error = item["errors"]
        if error:
            raise SalesforceException(f"Failure on update: {error}")

        return response

    def save(self, sf_object):

        if sf_object.id:
            logging.info(f"{sf_object.api_name} object already exists; updating...")
            path = f"/services/data/{SALESFORCE_API_VERSION}/sobjects/{sf_object.api_name}/{sf_object.id}"
            try:
                response = self.patch(path=path, data=sf_object._format())
            except SalesforceException as e:
                logging.error(e.response.text)
                raise
            return sf_object

        logging.info(f"{sf_object.api_name} object doesn't exist; creating...")
        path = f"/services/data/{SALESFORCE_API_VERSION}/sobjects/{sf_object.api_name}"
        logging.debug(repr(sf_object))
        try:
            response = self.post(path=path, data=sf_object._format())
        except SalesforceException as e:
            logging.error(e.response.text)
            raise

        sf_object.id = response["id"]
        sf_object.created = True

        return sf_object


class SalesforceObject(object):
    """
    This is the parent of all the other Salesforce objects.
    """

    def _format(self):
        raise NotImplementedError

    def __repr__(self):
        obj = self._format()
        obj["Id"] = self.id
        return json.dumps(obj)

    def __init__(self, sf_connection=None):
        self.id = None
        self.sf = SalesforceConnection() if sf_connection is None else sf_connection


class Opportunity(SalesforceObject):

    api_name = "Opportunity"

    def __init__(
        self,
        #record_type_name=DEFAULT_RDO_TYPE,
        contact=None,
        stage_name="Pledged",
        account=None,
        sf_connection=None,
    ):
        super().__init__(sf_connection)

        if contact and account:
            raise SalesforceException("Account and Contact can't both be specified")

        today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")

        # set defaults for default opportunity fields
        if account is not None:
            self.account_id = account.id
        elif contact is not None:
            self.account_id = contact.account_id
        else:
            self.account_id = None

        self.id = None
        self.name = None
        self._amount = 0
        self.additional_donation = 0
        self.close_date = today
        self.description = None
        self.lead_source = None
        #self.record_type_name = record_type_name
        self.campaign = None
        self.stage_name = stage_name
        self.type = None

        # set defaults for custom opportunity fields
        self.agreed_to_pay_fees = False
        self.anonymous = False
        self.card_type = None
        self.closed_lost_reason = None
        self.created = False
        self.credited_as = None
        self.client_organization = None
        self.digital_wallet_type = None
        self.donor_first_name = None
        self.donor_last_name = None
        self.donor_email = None
        self.donor_address_one = None
        self.donor_city = None
        self.donor_state = None
        self.donor_zip = None
        self.donor_country = None
        self.email_notify = None
        self.email_user_when_canceled = False
        self.event_attendees = None
        self.event_ticket_quantity = None
        self.fair_market_value = None
        self.include_amount_in_notification = False
        self.in_honor_or_memory = None
        self.in_honor_memory_of = None
        self.notify_someone = False
        self.member_benefit_request_swag = None
        self.member_benefit_request_nyt = None
        self.member_benefit_request_atlantic = None
        self.member_benefit_request_atlantic_id = None
        self.invoice = None
        self.mrpledge_id = None
        self.subtype = None
        self.payment_url = None
        self.payment_type = None
        self.reason_for_supporting = ""
        self.reason_for_supporting_shareable = True
        self.referring_page = None
        self.shipping_name = None
        self.shipping_street = None
        self.shipping_city = None
        self.shipping_state = None
        self.shipping_zip = None
        self.shipping_country = None
        self.stripe_description = None
        self.stripe_error_message = None
        self.stripe_bank_account = None
        self.stripe_card = None
        self.stripe_card_expiration = None
        self.stripe_card_last_4 = None
        self.stripe_customer_id = None
        self.stripe_payment_type = None
        self._stripe_transaction_fee = 0
        self.stripe_transaction_id = None
        self.ticket_count = 0
        self.lock_key = None

    @classmethod
    def list(
        cls,
        begin=None,
        end=None,
        stage_name="Pledged",
        stripe_customer_id=None,
        opportunity_id=None,
        sf_connection=None,
    ):

        # TODO a more generic dserializing method
        # TODO allow filtering by anything that uses equality?

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        if stripe_customer_id is None:
            where = f"""
            WHERE CloseDate <= {end}
            AND CloseDate >= {begin}
            AND StageName = '{stage_name}'
        """
        else:
            where = f"""
                WHERE Stripe_Customer_ID__c = '{stripe_customer_id}'
                AND CloseDate <= {end}
                AND CloseDate >= {begin}
                AND StageName = '{stage_name}'
            """

        if opportunity_id is not None:
            where = f"""
                WHERE Id = '{opportunity_id}'
            """

        query = f"""
            SELECT
                AccountId,
                Amount,
                CloseDate,
                CampaignId,
                Description,
                Id,
                LeadSource,
                Name,
                StageName,
                Type,
                Anonymous__c,
                Card_type__c,
                npsp__Closed_Lost_Reason__c,
                Credited_as__c,
                Client_Organization__c,
                Digital_Wallet_Type__c,
                Donor_first_name__c,
                Donor_last_name__c,
                Donor_e_mail__c,
                Donor_address_line_1__c,
                Donor_city__c,
                Donor_state__c,
                Donor_ZIP__c,
                Donor_country__c,
                Email_to_notify__c,
                Email_User_When_Canceled__c,
                Fair_market_value__c,
                Include_amount_in_notification__c,
                In_Honor_Memory__c,
                In_Honor_of_In_Memory__c,
                Notify_someone__c,
                Member_benefit_request_Swag__c,
                Member_benefit_request_New_York_Times__c,
                Member_benefit_request_Other_benefits__c,
                Member_benefit_request_Atlantic_sub_ID__c,
                MinnPost_Invoice__c,
                MRpledge_com_ID__c,
                Opportunity_Subtype__c,
                Payment_Type__c,
                Reason_for_Gift__c,
                Reason_for_gift_shareable__c,
                Referring_page__c,
                Shipping_address_name__c,
                Shipping_address_street__c,
                Shipping_address_city__c,
                Shipping_address_state__c,
                Shipping_address_ZIP__c,
                Shipping_address_country__c,
                Stripe_Agreed_to_pay_fees__c,
                Stripe_Bank_Account__c,
                Stripe_Card__c,
                Stripe_Description__c,
                Card_expiration_date__c,
                Card_acct_last_4__c,
                Stripe_Customer_ID__c,
                Stripe_Error_Message__c,
                Stripe_Payment_Type__c,
                Stripe_Transaction_Fee__c,
                Stripe_Transaction_ID__c,
                Flask_Transaction_ID__c
            FROM Opportunity
            {where}
        """

        response = sf.query(query)
        logging.debug(response)

        results = list()
        for item in response:
            y = cls()
            y.account_id = item["AccountId"]
            y.amount = item["Amount"]
            y.close_date = item["CloseDate"]
            y.campaign = item["CampaignId"]
            y.description = item["Description"]
            y.id = item["Id"]
            y.lead_source = item["LeadSource"]
            y.name = item["Name"]
            #y.record_type_name = item["RecordType"]["Name"]
            y.stage_name = "Pledged"
            y.type = item["Type"]
            y.mrpledge_id = item["MRpledge_com_ID__c"]
            y.subtype = item["Opportunity_Subtype__c"]
            y.credited_as = item["Credited_as__c"]
            y.anonymous = item["Anonymous__c"]
            y.in_honor_or_memory = item["In_Honor_Memory__c"]
            y.in_honor_or_memory_of = item["In_Honor_of_In_Memory__c"]
            y.digital_wallet_type = item["Digital_Wallet_Type__c"]
            y.donor_address_one = item["Donor_address_line_1__c"]
            y.donor_city = item["Donor_city__c"]
            y.donor_state = item["Donor_state__c"]
            y.donor_zip = item["Donor_ZIP__c"]
            y.donor_country = item["Donor_country__c"]
            y.donor_first_name = item["Donor_first_name__c"]
            y.donor_last_name = item["Donor_last_name__c"]
            y.donor_email = item["Donor_e_mail__c"]
            y.card_type = item["Card_type__c"]
            y.closed_lost_reason = item["npsp__Closed_Lost_Reason__c"]
            y.payment_type = item["Payment_Type__c"]
            y.reason_for_supporting = item["Reason_for_Gift__c"]
            y.reason_for_supporting_shareable = item["Reason_for_gift_shareable__c"]
            y.referring_page = item["Referring_page__c"]
            y.shipping_name = item["Shipping_address_name__c"]
            y.shipping_street = item["Shipping_address_street__c"]
            y.shipping_city = item["Shipping_address_city__c"]
            y.shipping_state = item["Shipping_address_state__c"]
            y.shipping_zip = item["Shipping_address_ZIP__c"]
            y.shipping_country = item["Shipping_address_country__c"]
            y.agreed_to_pay_fees = item["Stripe_Agreed_to_pay_fees__c"]
            y.stripe_bank_account = item["Stripe_Bank_Account__c"]
            y.stripe_card = item["Stripe_Card__c"]
            y.stripe_customer_id = item["Stripe_Customer_ID__c"]
            y.stripe_description = item["Stripe_Description__c"]
            y.stripe_error_message = item["Stripe_Error_Message__c"]
            y.stripe_transaction_fee = item["Stripe_Transaction_Fee__c"]
            y.stripe_transaction_id = item["Stripe_Transaction_ID__c"]
            y.stripe_payment_type = item["Stripe_Payment_Type__c"]
            y.lock_key = item["Flask_Transaction_ID__c"]
            y.created = False
            results.append(y)

        return results


    @classmethod
    def load_after_submit(
        cls,
        begin=None,
        end=None,
        stage_name=None,
        lock_key=None,
        sf_connection=None,
    ):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        if lock_key is None or lock_key == "":
            return False

        if stage_name is None:
            where = f"""WHERE Flask_Transaction_ID__c = '{lock_key}'
        """
        else:
            where = f"""
                WHERE Flask_Transaction_ID__c = '{lock_key}'
                AND StageName = '{stage_name}'
            """

        query = f"""
            SELECT
                Id,
                Flask_Transaction_ID__c,
                Reason_for_Gift__c,
                Reason_for_gift_shareable__c,
                Daily_newsletter_sign_up__c,
                Greater_MN_newsletter__c,
                Sunday_Review_newsletter__c,
                DC_Memo_sign_up__c,
                Event_member_benefit_messages__c,
                Input_feedback_messages__c
            FROM Opportunity
            {where}
        """

        response = sf.query(query)
        logging.debug(response)

        results = list()
        for item in response:
            y = cls()
            y.id = item["Id"]
            y.lock_key = item["Flask_Transaction_ID__c"]
            y.reason_for_supporting = "Reason_for_Gift__c"
            y.reason_for_supporting_shareable = "Reason_for_gift_shareable__c"
            y.daily_newsletter = "Daily_newsletter_sign_up__c"
            y.greater_mn_newsletter = "Greater_MN_newsletter__c"
            y.sunday_review_newsletter = "Sunday_Review_newsletter__c"
            y.dc_memo = "DC_Memo_sign_up__c"
            y.event_messages = "Event_member_benefit_messages__c"
            y.feedback_messages = "Input_feedback_messages__c"
            results.append(y)

        return results

    @property
    def amount(self):
        if self.additional_donation != 0 and self.additional_donation != None:
            return str(Decimal(self._amount).quantize(TWOPLACES) + Decimal(self.additional_donation).quantize(TWOPLACES))
        else:
            return str(Decimal(self._amount).quantize(TWOPLACES))

    @property
    def stripe_transaction_fee(self):
        if self._stripe_transaction_fee != 0 and self._stripe_transaction_fee != None:
            return str(Decimal(self._stripe_transaction_fee).quantize(TWOPLACES))
        else:
            return str(0)

    @amount.setter
    def amount(self, amount):
        self._amount = amount

    @stripe_transaction_fee.setter
    def stripe_transaction_fee(self, stripe_transaction_fee):
        self._stripe_transaction_fee = stripe_transaction_fee    

    def _format(self):
        return {
            "AccountId": self.account_id,
            "Amount": self.amount,
            "CloseDate": self.close_date,
            "CampaignId": self.campaign,
            "Description": self.description,
            "LeadSource": self.lead_source,
            "Name": self.name,
            #"RecordType": {"Name": self.record_type_name},
            "StageName": self.stage_name,
            "Type": self.type,
            "Anonymous__c": self.anonymous,
            "Card_type__c": self.card_type,
            "npsp__Closed_Lost_Reason__c": self.closed_lost_reason,
            "Credited_as__c": self.credited_as,
            "Client_Organization__c": self.client_organization,
            "Digital_Wallet_Type__c": self.digital_wallet_type,
            "Donor_first_name__c": self.donor_first_name,
            "Donor_last_name__c": self.donor_last_name,
            "Donor_e_mail__c": self.donor_email,
            "Donor_address_line_1__c": self.donor_address_one,
            "Donor_city__c": self.donor_city,
            "Donor_state__c": self.donor_state,
            "Donor_ZIP__c": self.donor_zip,
            "Donor_country__c": self.donor_country,
            "Email_to_notify__c": self.email_notify,
            "Email_User_When_Canceled__c": self.email_user_when_canceled,
            "Fair_market_value__c": self.fair_market_value,
            "Include_amount_in_notification__c": self.include_amount_in_notification,
            "In_Honor_Memory__c": self.in_honor_or_memory,
            "In_Honor_of_In_Memory__c": self.in_honor_memory_of,
            "Notify_someone__c": self.notify_someone,
            "Member_benefit_request_Swag__c": self.member_benefit_request_swag,
            "Member_benefit_request_New_York_Times__c": self.member_benefit_request_nyt,
            "Member_benefit_request_Other_benefits__c": self.member_benefit_request_atlantic,
            "Member_benefit_request_Atlantic_sub_ID__c": self.member_benefit_request_atlantic_id,
            "MinnPost_Invoice__c": self.invoice,
            "MRpledge_com_ID__c": self.mrpledge_id,
            "Opportunity_Subtype__c": self.subtype,
            "Payment_Type__c": self.payment_type,
            "Reason_for_Gift__c": self.reason_for_supporting,
            "Reason_for_gift_shareable__c": self.reason_for_supporting_shareable,
            "Referring_page__c": self.referring_page,
            "Shipping_address_name__c": self.shipping_name,
            "Shipping_address_street__c": self.shipping_street,
            "Shipping_address_city__c": self.shipping_city,
            "Shipping_address_state__c": self.shipping_state,
            "Shipping_address_ZIP__c": self.shipping_zip,
            "Shipping_address_country__c": self.shipping_country,
            "Stripe_Agreed_to_pay_fees__c": self.agreed_to_pay_fees,
            "Stripe_Bank_Account__c": self.stripe_bank_account,
            "Stripe_Card__c": self.stripe_card,
            "Stripe_Description__c": self.stripe_description,
            "Card_expiration_date__c": self.stripe_card_expiration,
            "Card_acct_last_4__c": self.stripe_card_last_4,
            "Stripe_Customer_ID__c": self.stripe_customer_id,
            "Stripe_Error_Message__c": self.stripe_error_message,
            "Stripe_Transaction_Fee__c": self.stripe_transaction_fee,
            "Stripe_Transaction_ID__c": self.stripe_transaction_id,
            "Stripe_Payment_Type__c": self.stripe_payment_type,
            "Flask_Transaction_ID__c": self.lock_key,
        }

    @classmethod
    def update(cls, opportunities, details, sf_connection=None):
        if not opportunities:
            raise SalesforceException("at least one Opportunity must be specified")
        sf = SalesforceConnection() if sf_connection is None else sf_connection
        return sf.updates(opportunities, details)

    def __str__(self):
        return f"{self.id}: {self.name} for {self.amount} ({self.stripe_description})"

    def save(self):

        # TODO this will fail if name hasn't been set
        # truncate to 120 chars:
        self.name = self.name[:120]

        if self.account_id is None:
            raise SalesforceException("Account ID must be specified")
        if not self.name:
            raise SalesforceException("Opportunity name must be specified")

        try:
            self.sf.save(self)
            # TODO should the client decide what's retryable?
        except SalesforceException as e:
            if e.content["errorCode"] == "MALFORMED_ID":
                if e.content["fields"][0] == "CampaignId":
                    logging.warning("bad campaign ID; retrying...")
                    self.campaign = None
                    self.save()
                #elif e.content["fields"][0] == "Referral_ID__c":
                #    logging.warning("bad referral ID; retrying...")
                #    self.referral_id = None
                #    self.save()
                else:
                    raise
            else:
                raise


class RDO(SalesforceObject):
    """
    Recurring Donation objects.
    """

    api_name = "npe03__Recurring_Donation__c"

    def __init__(self, id=None, contact=None, account=None, sf_connection=None):
        super().__init__(sf_connection=sf_connection)

        if account and contact:
            raise SalesforceException("Account and Contact can't both be specified")

        today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")

        if contact is not None:
            self.contact_id = contact.id
            self.name = f"{contact.first_name} {contact.last_name} recurring donation {today}"
            self.account_id = None
        elif account is not None:
            self.account_id = account.id
            self.name = None
            self.contact_id = None
        else:
            self.name = None
            self.account_id = None
            self.contact_id = None

        self.id = id
        self.installments = None
        self.open_ended_status = None
        self.installment_period = None
        self.campaign = None
        #self.referral_id = None
        self._amount = 0
        self.additional_donation = 0
        self.type = "Recurring Donation"
        self.date_established = today
        self.lead_source = None

        # set defaults for custom rdo fields
        self.agreed_to_pay_fees = False
        self.anonymous = False
        self.card_type = None
        self.created = False
        self.credited_as = None
        self.digital_wallet_type = None
        self.donor_first_name = None
        self.donor_last_name = None
        self.donor_email = None
        self.donor_address_one = None
        self.donor_city = None
        self.donor_state = None
        self.donor_zip = None
        self.donor_country = None
        self.email_notify = None
        self.email_user_when_canceled = False
        self.include_amount_in_notification = False
        self.in_honor_or_memory = None
        self.in_honor_memory_of = None
        self.notify_someone = False
        self.member_benefit_request_swag = None
        self.member_benefit_request_nyt = None
        self.member_benefit_request_atlantic = None
        self.member_benefit_request_atlantic_id = None
        self.payment_type = None
        self.reason_for_supporting = ""
        self.reason_for_supporting_shareable = True
        self.referring_page = None
        self.shipping_name = None
        self.shipping_street = None
        self.shipping_city = None
        self.shipping_state = None
        self.shipping_zip = None
        self.shipping_country = None
        self.stripe_bank_account = None
        self.stripe_card = None
        self.stripe_card_expiration = None
        self.stripe_card_last_4 = None
        self.stripe_customer_id = None
        self.stripe_description = None
        self.stripe_payment_type = None
        self._stripe_transaction_fee = 0

        self.lock_key = None

    
    @classmethod
    def list(
        cls,
        begin=None,
        end=None,
        stripe_customer_id=None,
        recurring_id=None,
        sf_connection=None,
    ):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        if recurring_id is not None:
            where = f"""
                WHERE Id = '{recurring_id}'
            """

        query = f"""
            SELECT
                Id,
                Name,
                npe03__Amount__c,
                npe03__Recurring_Donation_Campaign__c,
                npe03__Contact__c,
                npe03__Date_Established__c,
                Anonymous__c,
                Credited_as__c,
                Card_type__c,
                Digital_Wallet_Type__c,
                Donor_first_name__c,
                Donor_last_name__c,
                Donor_e_mail__c,
                Donor_address_line_1__c,
                Donor_city__c,
                Donor_state__c,
                Donor_ZIP__c,
                Donor_country__c,
                Email_to_notify__c,
                Email_User_When_Canceled__c,
                Include_amount_in_notification__c,
                In_Honor_Memory__c,
                In_honor_memory_of__c,
                Notify_someone__c,
                Member_benefit_request_Swag__c,
                Member_benefit_request_New_York_Times__c,
                Member_benefit_request_Other_benefits__c,
                Member_benefit_request_Atlantic_sub_ID__c,
                npe03__Installments__c,
                npe03__Installment_Period__c,
                Lead_Source__c,
                npe03__Open_Ended_Status__c,
                Payment_Type__c,
                Reason_for_Gift__c,
                Reason_for_gift_shareable__c,
                Referring_page__c,
                Shipping_address_name__c,
                Shipping_address_street__c,
                Shipping_address_city__c,
                Shipping_address_state__c,
                Shipping_address_ZIP__c,
                Shipping_address_country__c,
                Stripe_Agreed_to_pay_fees__c,
                Stripe_Bank_Account__c,
                Stripe_Card__c,
                Stripe_Description__c,
                Card_expiration_date__c,
                Card_acct_last_4__c,
                Stripe_Customer_Id__c,
                Stripe_Payment_Type__c,
                Stripe_Transaction_Fee__c
            FROM npe03__Recurring_Donation__c
            {where}
        """

        response = sf.query(query)
        logging.debug(response)

        results = list()
        for item in response:
            y = cls()

            y.id = item["Id"]
            y.name = item["Name"]
            y.amount = item["npe03__Amount__c"]
            y.campaign = item["npe03__Recurring_Donation_Campaign__c"]
            y.contact_id = item["npe03__Contact__c"]
            y.date_established = item["npe03__Date_Established__c"]
            y.anonymous = item["Anonymous__c"]
            y.credited_as = item["Credited_as__c"]
            y.card_type = item["Card_type__c"]
            y.digital_wallet_type = item["Digital_Wallet_Type__c"]
            y.donor_first_name = item["Donor_first_name__c"]
            y.donor_last_name = item["Donor_last_name__c"]
            y.donor_email = item["Donor_e_mail__c"]
            y.donor_address_one = item["Donor_address_line_1__c"]
            y.donor_city = item["Donor_city__c"]
            y.donor_state = item["Donor_state__c"]
            y.donor_zip = item["Donor_ZIP__c"]
            y.donor_country = item["Donor_country__c"]
            y.email_notify = item["Email_to_notify__c"]
            y.email_user_when_canceled = item["Email_User_When_Canceled__c"]
            y.include_amount_in_notification = item["Include_amount_in_notification__c"]
            y.in_honor_or_memory = item["In_Honor_Memory__c"]
            y.in_honor_memory_of = item["In_honor_memory_of__c"]
            y.notify_someone = item["Notify_someone__c"]
            y.member_benefit_request_swag = item["Member_benefit_request_Swag__c"]
            y.member_benefit_request_nyt = item["Member_benefit_request_New_York_Times__c"]
            y.member_benefit_request_atlantic = item["Member_benefit_request_Other_benefits__c"]
            y.member_benefit_request_atlantic_id = item["Member_benefit_request_Atlantic_sub_ID__c"]
            y.installments = item["npe03__Installments__c"]
            y.installment_period = item["npe03__Installment_Period__c"]
            y.lead_source = item["Lead_Source__c"]
            y.open_ended_status = item["npe03__Open_Ended_Status__c"]
            y.payment_type = item["Payment_Type__c"]
            y.reason_for_supporting = item["Reason_for_Gift__c"]
            y.reason_for_supporting_shareable = item["Reason_for_gift_shareable__c"]
            y.referring_page = item["Referring_page__c"]
            y.shipping_name = item["Shipping_address_name__c"]
            y.shipping_street = item["Shipping_address_street__c"]
            y.shipping_city = item["Shipping_address_city__c"]
            y.shipping_state = item["Shipping_address_state__c"]
            y.shipping_zip = item["Shipping_address_ZIP__c"]
            y.shipping_country = item["Shipping_address_country__c"]
            y.agreed_to_pay_fees = item["Stripe_Agreed_to_pay_fees__c"]
            y.stripe_bank_account = item["Stripe_Bank_Account__c"]
            y.stripe_card = item["Stripe_Card__c"]
            y.stripe_description = item["Stripe_Description__c"]
            y.stripe_card_expiration = item["Card_expiration_date__c"]
            y.stripe_card_last_4 = item["Card_acct_last_4__c"]
            y.stripe_customer_id = item["Stripe_Customer_Id__c"]
            y.stripe_payment_type = item["Stripe_Payment_Type__c"]
            y.stripe_transaction_fee = item["Stripe_Transaction_Fee__c"]

            y.created = False
            results.append(y)

        return results
    
    
    def _format(self):

        # TODO be sure to reverse this on deserialization
        amount = self.amount
        stripe_transaction_fee = self.stripe_transaction_fee

        # TODO should this be in the client?
        #if self.installments:
        #    amount = str(float(self.amount) * int(self.installments))

        recurring_donation = {
            "Name": self.name,
            "npe03__Amount__c": amount,
            "npe03__Recurring_Donation_Campaign__c": self.campaign,
            "npe03__Contact__c": self.contact_id,
            "npe03__Date_Established__c": self.date_established,
            "Anonymous__c": self.anonymous,
            "Credited_as__c": self.credited_as,
            "Card_type__c": self.card_type,
            "Digital_Wallet_Type__c": self.digital_wallet_type,
            "Donor_first_name__c": self.donor_first_name,
            "Donor_last_name__c": self.donor_last_name,
            "Donor_e_mail__c": self.donor_email,
            "Donor_address_line_1__c": self.donor_address_one,
            "Donor_city__c": self.donor_city,
            "Donor_state__c": self.donor_state,
            "Donor_ZIP__c": self.donor_zip,
            "Donor_country__c": self.donor_country,
            "Email_to_notify__c": self.email_notify,
            "Email_User_When_Canceled__c": self.email_user_when_canceled,
            "Include_amount_in_notification__c": self.include_amount_in_notification,
            "In_Honor_Memory__c": self.in_honor_or_memory,
            "In_honor_memory_of__c": self.in_honor_memory_of,
            "Notify_someone__c": self.notify_someone,
            #'npe03__Installments__c': self.installments,
            "npe03__Installment_Period__c": self.installment_period, # this has to be there even if it is open ended
            "Lead_Source__c": self.lead_source,
            "Member_benefit_request_Swag__c": self.member_benefit_request_swag,
            "Member_benefit_request_New_York_Times__c": self.member_benefit_request_nyt,
            "Member_benefit_request_Other_benefits__c": self.member_benefit_request_atlantic,
            "Member_benefit_request_Atlantic_sub_ID__c": self.member_benefit_request_atlantic_id,
            "npe03__Open_Ended_Status__c": self.open_ended_status,
            "Payment_Type__c": self.payment_type,
            "Reason_for_Gift__c": self.reason_for_supporting,
            "Reason_for_gift_shareable__c": self.reason_for_supporting_shareable,
            "Referring_page__c": self.referring_page,
            "Shipping_address_name__c": self.shipping_name,
            "Shipping_address_street__c": self.shipping_street,
            "Shipping_address_city__c": self.shipping_city,
            "Shipping_address_state__c": self.shipping_state,
            "Shipping_address_ZIP__c": self.shipping_zip,
            "Shipping_address_country__c": self.shipping_country,
            "Stripe_Agreed_to_pay_fees__c": self.agreed_to_pay_fees,
            "Stripe_Bank_Account__c": self.stripe_bank_account,
            "Stripe_Card__c": self.stripe_card,
            "Stripe_Description__c": self.stripe_description,
            "Card_expiration_date__c": self.stripe_card_expiration,
            "Card_acct_last_4__c": self.stripe_card_last_4,
            "Stripe_Customer_Id__c": self.stripe_customer_id,
            "Stripe_Payment_Type__c": self.stripe_payment_type,
            "Stripe_Transaction_Fee__c": self.stripe_transaction_fee,
            #"Type__c": self.type, Texas uses this field on their recurring donation object but we don't currently have it
            "Flask_Transaction_ID__c": self.lock_key,
        }
        return recurring_donation

    def __str__(self):
        return f"{self.id}: {self.name} for {self.amount} ({self.stripe_description})"

    # TODO sensible way to cache this to prevent it from being run multiple times when nothing
    # has changed? The opportunities themselves may've changed even when the RDO hasn't so
    # this may not be doable.

    def opportunities(self):
        query = f"""
            SELECT
                AccountId,
                Amount,
                CloseDate,
                CampaignId,
                Description,
                Id,
                LeadSource,
                Name,
                StageName,
                Type,
                Anonymous__c,
                Card_type__c,
                npsp__Closed_Lost_Reason__c,
                Credited_as__c,
                Client_Organization__c,
                Digital_Wallet_Type__c,
                Donor_first_name__c,
                Donor_last_name__c,
                Donor_e_mail__c,
                Donor_address_line_1__c,
                Donor_city__c,
                Donor_state__c,
                Donor_ZIP__c,
                Donor_country__c,
                Email_to_notify__c,
                Email_User_When_Canceled__c,
                Fair_market_value__c,
                Include_amount_in_notification__c,
                In_Honor_Memory__c,
                In_Honor_of_In_Memory__c,
                Notify_someone__c,
                Member_benefit_request_Swag__c,
                Member_benefit_request_New_York_Times__c,
                Member_benefit_request_Other_benefits__c,
                Member_benefit_request_Atlantic_sub_ID__c,
                MinnPost_Invoice__c,
                MRpledge_com_ID__c,
                Opportunity_Subtype__c,
                Payment_Type__c,
                Reason_for_Gift__c,
                Reason_for_gift_shareable__c,
                Referring_page__c,
                Shipping_address_name__c,
                Shipping_address_street__c,
                Shipping_address_city__c,
                Shipping_address_state__c,
                Shipping_address_ZIP__c,
                Shipping_address_country__c,
                Stripe_Agreed_to_pay_fees__c,
                Stripe_Bank_Account__c,
                Stripe_Card__c,
                Stripe_Description__c,
                Card_expiration_date__c,
                Card_acct_last_4__c,
                Stripe_Customer_ID__c,
                Stripe_Error_Message__c,
                Stripe_Payment_Type__c,
                Stripe_Transaction_Fee__c,
                Stripe_Transaction_ID__c,
                Flask_Transaction_ID__c
            FROM Opportunity
            WHERE npe03__Recurring_Donation__c = '{self.id}'
        """
        # TODO must make this dynamic
        response = self.sf.query(query)
        results = list()
        for item in response:
            y = Opportunity(sf_connection=self.sf)
            y.account_id = item["AccountId"]
            y.amount = item["Amount"]
            y.close_date = item["CloseDate"]
            y.campaign = item["CampaignId"]
            y.description = item["Description"]
            y.id = item["Id"]
            y.lead_source = item["LeadSource"]
            y.name = item["Name"]
            y.stage_name = "Pledged"
            y.type = item["Type"]
            y.anonymous = item["Anonymous__c"]
            y.card_type = item["Card_type__c"]
            y.closed_lost_reason = item["npsp__Closed_Lost_Reason__c"]
            y.credited_as = item["Credited_as__c"]
            y.client_organization = item["Client_Organization__c"]
            y.digital_wallet_type = item["Digital_Wallet_Type__c"]
            y.donor_first_name = item["Donor_first_name__c"]
            y.donor_last_name = item["Donor_last_name__c"]
            y.donor_email = item["Donor_e_mail__c"]
            y.donor_address_one = item["Donor_address_line_1__c"]
            y.donor_city = item["Donor_city__c"]
            y.donor_state = item["Donor_state__c"]
            y.donor_zip = item["Donor_ZIP__c"]
            y.donor_country = item["Donor_country__c"]
            y.email_notify = item["Email_to_notify__c"]
            y.email_user_when_canceled = item["Email_User_When_Canceled__c"]
            y.fair_market_value = item["Fair_market_value__c"]
            y.include_amount_in_notification = item["Include_amount_in_notification__c"]
            y.in_honor_or_memory = item["In_Honor_Memory__c"]
            y.in_honor_memory_of = item["In_Honor_of_In_Memory__c"]
            y.notify_someone = item["Notify_someone__c"]
            y.member_benefit_request_swag = item["Member_benefit_request_Swag__c"]
            y.member_benefit_request_nyt = item["Member_benefit_request_New_York_Times__c"]
            y.member_benefit_request_atlantic = item["Member_benefit_request_Other_benefits__c"]
            y.member_benefit_request_atlantic_id = item["Member_benefit_request_Atlantic_sub_ID__c"]
            y.invoice = item["MinnPost_Invoice__c"]
            y.mrpledge_id = item["MRpledge_com_ID__c"]
            y.subtype = item["Opportunity_Subtype__c"]
            y.payment_type = item["Payment_Type__c"]
            y.reason_for_supporting = item["Reason_for_Gift__c"]
            y.reason_for_supporting_shareable = item["Reason_for_gift_shareable__c"]
            y.referring_page = item["Referring_page__c"]
            y.shipping_name = item["Shipping_address_name__c"]
            y.shipping_street = item["Shipping_address_street__c"]
            y.shipping_city = item["Shipping_address_city__c"]
            y.shipping_state = item["Shipping_address_state__c"]
            y.shipping_zip = item["Shipping_address_ZIP__c"]
            y.shipping_country = item["Shipping_address_country__c"]
            y.agreed_to_pay_fees = item["Stripe_Agreed_to_pay_fees__c"]
            y.stripe_bank_account = item["Stripe_Bank_Account__c"]
            y.stripe_card = item["Stripe_Card__c"]
            y.stripe_description = item["Stripe_Description__c"]
            y.stripe_card_expiration = item["Card_expiration_date__c"]
            y.stripe_card_last_4 = item["Card_acct_last_4__c"]
            y.stripe_customer_id = item["Stripe_Customer_ID__c"]
            y.stripe_error_message = item["Stripe_Error_Message__c"]
            y.stripe_payment_type = item["Stripe_Payment_Type__c"]
            y.stripe_transaction_fee = item["Stripe_Transaction_Fee__c"]
            y.stripe_transaction_id = item["Stripe_Transaction_ID__c"]
            y.lock_key = item["Flask_Transaction_ID__c"]            
            y.created = False
            results.append(y)
        return results

    @classmethod
    def load_after_submit(
        cls,
        begin=None,
        end=None,
        lock_key=None,
        sf_connection=None,
    ):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        if lock_key is None or lock_key == "":
            return False

        where = f"""
            WHERE Flask_Transaction_ID__c = '{lock_key}'
        """

        query = f"""
            SELECT
                Id,
                Flask_Transaction_ID__c,
                Reason_for_Gift__c,
                Reason_for_gift_shareable__c,
                Daily_newsletter_sign_up__c,
                Greater_MN_newsletter__c,
                Sunday_Review_newsletter__c,
                DC_Memo_sign_up__c,
                Event_member_benefit_messages__c,
                Input_feedback_messages__c
            FROM npe03__Recurring_Donation__c
            {where}
        """

        response = sf.query(query)
        logging.debug(response)

        results = list()
        for item in response:
            y = cls()
            y.id = item["Id"]
            y.lock_key = item["Flask_Transaction_ID__c"]
            y.reason_for_supporting = "Reason_for_Gift__c"
            y.reason_for_supporting_shareable = "Reason_for_gift_shareable__c"
            y.daily_newsletter = "Daily_newsletter_sign_up__c"
            y.greater_mn_newsletter = "Greater_MN_newsletter__c"
            y.sunday_review_newsletter = "Sunday_Review_newsletter__c"
            y.dc_memo = "DC_Memo_sign_up__c"
            y.event_messages = "Event_member_benefit_messages__c"
            y.feedback_messages = "Input_feedback_messages__c"
            results.append(y)

        return results

    @classmethod
    def update(cls, rdo, details, sf_connection=None):
        if not rdo:
            raise SalesforceException("at least one recurring donation must be specified")
        sf = SalesforceConnection() if sf_connection is None else sf_connection
        return sf.updates(rdo, details)

    @property
    def amount(self):
        if self.additional_donation != 0 and self.additional_donation != None:
            return str(Decimal(self._amount).quantize(TWOPLACES) + Decimal(self.additional_donation).quantize(TWOPLACES))
        else:
            return str(Decimal(self._amount).quantize(TWOPLACES))

    @property
    def stripe_transaction_fee(self):
        if self._stripe_transaction_fee != 0 and self._stripe_transaction_fee != None:
            return str(Decimal(self._stripe_transaction_fee).quantize(TWOPLACES))
        else:
            return str(0)

    @amount.setter
    def amount(self, amount):
        self._amount = amount

    @stripe_transaction_fee.setter
    def stripe_transaction_fee(self, stripe_transaction_fee):
        self._stripe_transaction_fee = stripe_transaction_fee

    def save(self):

        # truncate to 120 characters
        self.name = self.name[:120]

        if self.account_id is None and self.contact_id is None:
            raise SalesforceException(
                "One of Contact ID or Account ID must be specified."
            )

        try:
            self.sf.save(self)
        except SalesforceException as e:
            if e.content["errorCode"] == "MALFORMED_ID":
                if e.content["fields"][0] == "npe03__Recurring_Donation_Campaign__c":
                    logging.warning("bad campaign ID; retrying...")
                    self.campaign = None
                    self.save()
                elif e.content["fields"][0] == "Referral_ID__c":
                    logging.warning("bad referral ID; retrying...")
                    self.referral_id = None
                    self.save()
                else:
                    raise
            else:
                raise

        # since NPSP doesn't let you pass through the record
        # type ID of the opportunity (it will only use one hard-coded value)
        # we set them for all of the opportunities here. But if the RDO
        # is open ended then it'll create new opportunities of the wrong
        # type on its own. We warn about that.
        #
        # You should fix this through
        # process builder/mass action scheduler or some other process on the
        # SF side
        #if self.record_type_name == DEFAULT_RDO_TYPE or self.record_type_name is None:
        #    return
        #if self.open_ended_status == "Open":
        #    logging.warning(
        #        f"RDO {self} is open-ended so new opportunities won't have type {self.record_type_name}"
        #    )
        #    return
        #logging.info(
        #    f"Setting record type for {self} opportunities to {self.record_type_name}"
        #)
        #update = {"RecordType": {"Name": self.record_type_name}}
        #self.sf.updates(self.opportunities(), update)


class Account(SalesforceObject):

    api_name = "Account"

    def __init__(self, sf_connection=None):
        super().__init__(sf_connection)

        self.id = None
        self.name = None
        self.created = False
        self.website = None
        self.shipping_street = None
        self.shipping_city = None
        self.shipping_postalcode = None
        self.shipping_state = None
        self.record_type_name = "Household"

    def _format(self):
        return {
            "Website": self.website,
            "RecordType": {"Name": self.record_type_name},
            "Name": self.name,
            "ShippingStreet": self.shipping_street,
            "ShippingCity": self.shipping_city,
            "ShippingPostalCode": self.shipping_postalcode,
            "ShippingState": self.shipping_state,
        }

    def __str__(self):
        return f"{self.id}: {self.name} ({self.website})"

    @classmethod
    def get_or_create(
        cls,
        record_type_name="Household",
        website=None,
        name=None,
        shipping_city=None,
        shipping_street=None,
        shipping_state=None,
        shipping_postalcode=None,
        sf_connection=None,
    ):
        account = cls.get(
            record_type_name=record_type_name,
            website=website,
            sf_connection=sf_connection,
        )
        if account:
            return account
        account = Account()
        account.website = website
        account.name = name
        account.shipping_city = shipping_city
        account.shipping_postalcode = shipping_postalcode
        account.shipping_state = shipping_state
        account.shipping_street = shipping_street
        account.record_type_name = record_type_name
        account.save()
        return account

    @classmethod
    def get(
        cls, record_type_name="Household", website=None, name=None, sf_connection=None
    ):
        """
        Right now we're only using the website to search for existing accounts.
        """

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        query = f"""
            SELECT Id, Name, Website
            FROM Account WHERE
            RecordType.Name IN ('{record_type_name}')
        """
        response = sf.query(query)

        # We do a fuzzy search on the website and if the top hit
        # has a confidence of 95 or higher we use it.
        website_idx = {
            x["Website"]: {"id": x["Id"], "name": x["Name"]}
            for x in response
            if x["Website"] is not None and x["Website"] != "NULL"
        }
        url_list = list(website_idx.keys())

        extracted = process.extractOne(website, url_list)
        logging.debug(extracted)
        if extracted is None:
            return None
        url, confidence = extracted
        if confidence < 95:
            return None
        account = Account()
        account.id = website_idx[url]["id"]
        account.name = website_idx[url]["name"]
        account.website = url
        account.created = False

        return account

    def save(self):
        self.sf.save(self)


class Contact(SalesforceObject):

    api_name = "Contact"

    def __init__(self, sf_connection=None):
        super().__init__(sf_connection)

        self.id = None
        self.account_id = None
        self.first_name = None
        self.last_name = None
        self.created = False
        self.email = None
        self.lead_source = "Stripe"
        self.description = None
        self.mailing_street = None
        self.mailing_city = None
        self.mailing_state = None
        self.mailing_postal_code = None
        self.mailing_country = None
        self.duplicate_found = False
        self.stripe_customer_id = None


    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @staticmethod
    def parse_all_email(email, results):
        """
        This field is a CSV. So we parse that to make sure we've got an exact match and not just a substring match.
        """
        filtered_results = list()
        for item in results:
            all_email = item[COMBINED_EMAIL_FIELD].lower()
            buffer = StringIO(all_email)
            reader = csv.reader(buffer, skipinitialspace=True)
            if email.lower() in list(reader)[0]:
                filtered_results.append(item)
        return filtered_results

    def _format(self):
        return {
            "Email": self.email,
            "FirstName": self.first_name,
            "LastName": self.last_name,
            "Description": self.description,
            "LeadSource": self.lead_source,
            "Stripe_Customer_Id__c": self.stripe_customer_id,
            "MailingStreet": self.mailing_street,
            "MailingCity": self.mailing_city,
            "MailingState": self.mailing_state,
            "MailingPostalCode": self.mailing_postal_code,
            "MailingCountry": self.mailing_country,
        }

    @classmethod
    def get_or_create(cls, email, first_name=None, last_name=None, stripe_customer_id=None, street=None, city=None, state=None, zipcode=None, country=None):
        contact = cls.get(email=email)
        if contact:
            logging.debug(f"Contact found: {contact}")
            return contact
        logging.debug("Creating contact...")
        contact = Contact()
        contact.email = email
        contact.first_name          = first_name
        contact.last_name           = last_name
        contact.stripe_customer_id  = stripe_customer_id
        contact.mailing_street      = street
        contact.mailing_city        = city
        contact.mailing_state       = state
        contact.mailing_postal_code = zipcode
        contact.mailing_country     = country
        contact.save()
        return contact

    @classmethod
    def get(cls, id=None, email=None, sf_connection=None):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        if id is None and email is None:
            raise SalesforceException("id or email must be specified")
        if id and email:
            raise SalesforceException("id and email can't both be specified")
        if id:
            query = f"""
                    SELECT
                        Id,
                        AccountId,
                        Email,
                        FirstName,
                        LastName,
                        Description,
                        LeadSource,
                        MailingStreet,
                        MailingCity,
                        MailingState,
                        MailingPostalCode,
                        MailingCountry,
                        Stripe_Customer_Id__c
                    FROM Contact
                    WHERE id = '{id}'
                    """
            response = sf.query(query)
            # should only be one result here because we're
            # querying by id
            response = response[0]
            contact = Contact()
            contact.id = response["Id"]
            contact.account_id = response["AccountId"]
            contact.first_name = response["FirstName"]
            contact.last_name = response["LastName"]
            contact.email = response["Email"]
            contact.description = response["Description"]
            contact.lead_source = response["LeadSource"]
            contact.mailing_street = response["MailingStreet"]
            contact.mailing_city = response["MailingCity"]
            contact.mailing_state = response["MailingState"]
            contact.mailing_postal_code = response["MailingPostalCode"]
            contact.mailing_country = response["MailingCountry"]
            contact.stripe_customer_id = response["Stripe_Customer_Id__c"]
            contact.created = False
            return contact

        query = f"""
                SELECT 
                    Id,
                    AccountId,
                    {COMBINED_EMAIL_FIELD},
                    Email,
                    FirstName,
                    LastName,
                    Description,
                    LeadSource,
                    MailingStreet,
                    MailingCity,
                    MailingState,
                    MailingPostalCode,
                    MailingCountry,
                    Stripe_Customer_Id__c
                FROM Contact
                WHERE {COMBINED_EMAIL_FIELD}
                LIKE '%{email}%'
                """

        response = sf.query(query)
        if not response:
            return None
        response = cls.parse_all_email(email=email, results=response)
        if not response:
            return None
        contact = Contact()
        if len(response) > 1:
            contact.duplicate_found = True
        response = response[0]
        contact.id = response["Id"]
        contact.account_id = response["AccountId"]
        contact.first_name = response["FirstName"]
        contact.last_name = response["LastName"]
        contact.email = response["Email"]
        contact.description = response["Description"]
        contact.lead_source = response["LeadSource"]
        contact.mailing_street = response["MailingStreet"]
        contact.mailing_city = response["MailingCity"]
        contact.mailing_state = response["MailingState"]
        contact.mailing_postal_code = response["MailingPostalCode"]
        contact.mailing_country = response["MailingCountry"]
        contact.stripe_customer_id = response["Stripe_Customer_Id__c"]
        contact.created = False
        return contact


    def __str__(self):
        return f"{self.id} ({self.account_id}): {self.first_name} {self.last_name}"

    def save(self):
        self.sf.save(self)
        # TODO this is a workaround for now because creating a new
        # contact will also create a new account and we need that account ID
        # so we have to re-fetch the contact to get it
        tmp_contact = self.get(id=self.id)
        self.account_id = tmp_contact.account_id


class Affiliation(SalesforceObject):
    """
    This object is a link between a contact and an account.
    """

    api_name = "npe5__Affiliation__c"

    def __init__(self, contact=None, account=None, role=None, sf_connection=None):
        super().__init__(sf_connection)
        # TODO allow id to be set in __init__?
        self.id = None
        self.contact = contact.id
        self.account = account.id
        self.role = role

    @classmethod
    def get(cls, contact, account, sf_connection=None):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        query = f"""
            SELECT Id, npe5__Role__c from npe5__Affiliation__c
            WHERE npe5__Contact__c = '{contact.id}'
            AND npe5__Organization__c = '{account.id}'
        """
        response = sf.query(query)

        if not response:
            return None

        if len(response) > 1:
            raise SalesforceException("More than one affiliation found")
        role = response[0]["npe5__Role__c"]

        affiliation = Affiliation(contact=contact, account=account, role=role)
        affiliation.id = response[0]["Id"]
        return affiliation

    @classmethod
    def get_or_create(cls, account=None, contact=None, role=None):
        affiliation = cls.get(account=account, contact=contact)
        if affiliation:
            return affiliation
        affiliation = Affiliation(account=account, contact=contact, role=role)
        affiliation.save()
        return affiliation

    def save(self):
        self.sf.save(self)

    def __str__(self):
        return (
            f"{self.id}: {self.contact} is affiliated with {self.account} ({self.role})"
        )

    def _format(self):
        return {
            "npe5__Contact__c": self.contact,
            "npe5__Role__c": self.role,
            "npe5__Organization__c": self.account,
        }


class Task(SalesforceObject):

    api_name = "Task"

    def __init__(self, owner_id=None, what_id=None, subject=None, sf_connection=None):
        super().__init__(sf_connection)
        self.owner_id = owner_id
        self.what_id = what_id
        self.subject = subject

    def save(self):
        self.sf.save(self)

    def __str__(self):
        return f"{self.subject}"

    def _format(self):
        return {
            "OwnerId": self.owner_id,
            "WhatId": self.what_id,
            "Subject": self.subject,
        }


class User(SalesforceObject):

    api_name = "User"

    def __init__(self, sf_connection=None):
        super().__init__(sf_connection)

    def __str__(self):
        return f"{self.id}: {self.username}"

    @classmethod
    def get(cls, username, sf_connection=None):

        sf = SalesforceConnection() if sf_connection is None else sf_connection

        query = f"""
            SELECT Id, Username FROM User
            WHERE username = '{username}'
        """
        response = sf.query(query)

        if not response:
            return None

        user = User()
        user.id = response[0]["Id"]
        user.username = response[0]["Username"]
        return user
