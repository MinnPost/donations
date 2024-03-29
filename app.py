"""
This file is the entrypoint for this Flask application. Can be executed with 'flask
run', 'python app.py' or via a WSGI server like gunicorn or uwsgi.

"""
import calendar
#import json
import locale
import logging
import os
import re
import uuid
from datetime import datetime, timedelta
from pprint import pformat

import stripe
import plaid
from plaid.api import plaid_api
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.processor_stripe_bank_account_token_create_request import ProcessorStripeBankAccountTokenCreateRequest

from amazon_pay.client import AmazonPayClient
from amazon_pay.ipn_handler import IpnHandler
from flask import Flask, jsonify, redirect, render_template, request, send_from_directory
from flask_limiter import Limiter
from flask_talisman import Talisman
from nameparser import HumanName
from pytz import timezone
from email_validator import validate_email, EmailNotValidError

from app_celery import make_celery
from bad_actor import BadActor
from charges import ChargeException, QuarantinedException, charge, create_plaid_link_token, calculate_amount_fees, check_level
from batch import Lock
from config import (
    TIMEZONE,
    AMAZON_MERCHANT_ID,
    AMAZON_SANDBOX,
    AMAZON_CAMPAIGN_ID,
    MWS_ACCESS_KEY,
    MWS_SECRET_KEY,
    DEFAULT_FREQUENCY,
    FLASK_SECRET_KEY,
    FLASK_DEBUG,
    WTF_CSRF_ENABLED,
    LOG_LEVEL,
    PLAID_SECRET,
    PLAID_ENVIRONMENT,
    PLAID_API_VERSION,
    ENABLE_PORTAL,
    ADVERTISING_CAMPAIGN_ID,
    ANNIVERSARY_PARTY_CAMPAIGN_ID,
    COMBINED_EMAIL_FIELD,
    DEFAULT_CAMPAIGN_ONETIME,
    DEFAULT_CAMPAIGN_RECURRING,
    FESTIVAL_CAMPAIGN_ID,
    TONIGHT_CAMPAIGN_ID,
    MINNROAST_CAMPAIGN_ID,
    MERCHANDISE_SALES_CAMPAIGN_ID,
    SALESFORCE_CONTACT_ADVERTISING_EMAIL,
    ENABLE_SENTRY,
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    REPORT_URI,
    STRIPE_WEBHOOK_SECRET,
    GOOGLE_ANALYTICS_ID,
    GOOGLE_ANALYTICS_TRACKING_CODE_TYPE,
    GOOGLE_TAG_MANAGER_ID,
    GOOGLE_TAG_MANAGER_AUTH,
    GOOGLE_TAG_MANAGER_PREVIEW
)
from forms import (
    format_amount,
    format_swag,
    format_swag_subscription,
    is_human,
    PlaidForm,
    DonateForm,
    MinimalForm,
    SponsorshipForm,
    SalesForm,
    AdvertisingForm,
    CancelForm,
    FinishForm,
)
from npsp import RDO, Account, Affiliation, Contact, Opportunity
from util import (
    clean,
    notify_slack,
    send_multiple_account_warning,
    dir_last_updated,
    is_known_spam_email,
)

ZONE = timezone(TIMEZONE)

if ENABLE_SENTRY:
    import sentry_sdk
    from sentry_sdk.integrations.celery import CeleryIntegration
    from sentry_sdk.integrations.flask import FlaskIntegration

    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment=SENTRY_ENVIRONMENT,
        integrations=[FlaskIntegration(), CeleryIntegration()],
    )

locale.setlocale(locale.LC_ALL, "C")
csp = {
    "default-src": ["'self'", "*.minnpost.com"],
    "font-src": [
        "'self'",
        "data:",
        "*.cloudflare.com",
        "fonts.gstatic.com",
        "use.typekit.net",
    ],
    "style-src": [
        "'self'",
        "'unsafe-inline'",
        "*.googleapis.com",
        "tagmanager.google.com",
    ],
    "img-src": [
        "'self'",
        "data:",
        "*.minnpost.com",
        "q.stripe.com",
        "www.facebook.com",
        "stats.g.doubleclick.net",
        "www.google-analytics.com",
        "www.google.com",
        "googleads.g.doubleclick.net",
        "www.googletagmanager.com",
        "p.typekit.net",
        "www.google.se",
        "www.gstatic.com",
        "www.google.iq",
        "www.google-analytics.com",
        "www.google.md",
        "www.google.com.qa",
        "www.google.ca",
        "www.google.es",
        "www.google.am",
        "www.google.de",
        "www.google.jo",
        "www.google.com.pr",
        "www.google.com.ng",
        "www.google.com.lb",
        "www.google.be",
        "www.google.se",
        "www.google.co.uk",
        "www.google.co.in",
        "srclinkapp.biz",
        "www.google.com.mx",
        "*",
    ],
    "connect-src": [
        "*.stripe.com",
        "*.minnpost.com",
        "www.google-analytics.com",
        "www.facebook.com",
        "stats.g.doubleclick.net",
        "performance.typekit.net",
        "*",
    ],
    "frame-src": [
        "'self'",
        "*.stripe.com",
        "www.googletagmanager.com",
        "www.facebook.com",
        "bid.g.doubleclick.net",
        "bid.g.doubleclick.net",
        "fonts.gstatic.com",
        "connect.facebook.net",
        "wib.capitalone.com",
        "api.pmmapads.com",
        "*",
    ],
    "script-src": [
        "data:",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "*.minnpost.com",
        "www.googleadservices.com",
        "js.stripe.com",
        "*.googleapis.com",
        "connect.facebook.net",
        "www.googletagmanager.com",
        "use.typekit.net",
        "code.jquery.com",
        "checkout.stripe.com",
        "www.google-analytics.com",
        "googleads.g.doubleclick.net",
        "watcher.risd.net",
        "*",
    ],
}


app = Flask(__name__)

Talisman(
    app,
    content_security_policy={},
    content_security_policy_report_only=True,
    content_security_policy_report_uri=REPORT_URI,
)


def get_real_user_ip():
    """ratelimit the users original ip instead of (optional) reverse proxy"""
    if not request.headers.getlist("X-Forwarded-For"):
        ip = request.remote_addr
    else:
        ip = request.headers.getlist("X-Forwarded-For")[0]
    return ip


limiter = Limiter(
    app, key_func=get_real_user_ip, default_limits=["200 per day", "250 per hour"]
)

log_level = logging.getLevelName(LOG_LEVEL)
app.logger.setLevel(log_level)
for handler in app.logger.handlers:
    limiter.logger.addHandler(handler)

app.secret_key = FLASK_SECRET_KEY

app.config.from_pyfile("config.py")
app.config.update(
    CELERY_ACCEPT_CONTENT=["pickle", "json"],
    CELERY_ALWAYS_EAGER=False,
    CELERY_IMPORTS=("app", "npsp", "batch"),
)
stripe.api_key = app.config["STRIPE_KEYS"]["secret_key"]

celery = make_celery(app)


"""
Redirects.
"""

# support.minnpost.com/minnroast-sponsorship
@app.route("/minnroast-sponsorship/")
def minnroast_sponsorship_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/minnroast-patron/?%s" % query_string, code=302)

# support.minnpost.com/minnroast-pledge
@app.route("/minnroast-pledge/")
def minnroast_pledge_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/pledge-payment/?%s" % query_string, code=302)

# support.minnpost.com/recurring-donation-update
@app.route("/recurring-donation-update/")
def minnpost_recurring_donation_update_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/donation-update/?%s" % query_string, code=302)

# support.minnpost.com/anniversary-sponsorship
@app.route("/anniversary-sponsorship/")
def anniversary_sponsorship_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/anniversary/?%s" % query_string, code=302)

# support.minnpost.com/anniversary-patron
@app.route("/anniversary-patron/")
def anniversary_patron_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/anniversary/?%s" % query_string, code=302)

# support.minnpost.com/minnpost-advertising
@app.route("/minnpost-advertising/")
def minnpost_advertising_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/advertising-payment/?%s" % query_string, code=302)


def apply_card_details(data=None, customer=None, payment_method=None, charge_source=None):

    """
    Takes the expiration date, card brand and expiration from a Stripe object and copies
    it to an RDO or Opportunity in Salesforce. The object is NOT saved and must be done
    after calling this function. That's to save an API call since other SF details will
    almost certainly need to be saved as well.

    This method is not called if the payment type is bank account.
    """

    # if the charge does not specify a payment method get it from the customer
    if payment_method is None and charge_source is None:
        payment_methods = stripe.PaymentMethod.list(
            customer=customer["id"],
            type="card",
            limit=1,
        )
        if payment_methods is not []:
            card_id = payment_methods.data[0].id
            card = payment_methods.data[0].card
            year = card.exp_year
            month = card.exp_month
            brand = card.brand
            last4 = card.last4
        else:
            customer = stripe.Customer.retrieve(customer["id"])
            card_id = customer.sources.data[0].id
            card = customer.sources.retrieve(card_id)
            year = card.exp_year
            month = card.exp_month
            brand = card.brand
            last4 = card.last4
    elif payment_method is not None:
        # there is a payment method object
        card = payment_method["card"]
        card_id = payment_method["id"]
        year = card["exp_year"]
        month = card["exp_month"]
        brand = card["brand"]
        last4 = card["last4"]

        if card["wallet"] is not None:
            wallet_type = card["wallet"]["type"]
            logging.info(f"digital wallet type is {wallet_type} ")
            data.digital_wallet_type = card["wallet"]["type"]

    elif charge_source is not None:
        # there is a charge object
        card = charge_source
        card_id = card["id"]
        year = card["exp_year"]
        month = card["exp_month"]
        brand = card["brand"]
        last4 = card["last4"]

    day = calendar.monthrange(year, month)[1]

    # card details for Salesforce
    data.stripe_card = card_id
    data.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
    data.card_type = brand
    data.stripe_card_last_4 = last4

    return data


@celery.task(name="app.add_donation")
def add_donation(form=None, customer=None, donation_type=None, payment_method=None, charge_source=None, bad_actor_request=None):
    """
    Add a contact and their donation into SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """
    #bad_actor_response = BadActor(bad_actor_request=bad_actor_request)
    #quarantine = bad_actor_response.quarantine
    quarantine = False

    form               = clean(form)
    first_name         = form.get("first_name", "")
    last_name          = form.get("last_name", "")
    installment_period = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    email              = form.get("email", "")
    street             = form.get("billing_street", "")
    city               = form.get("billing_city", "")
    state              = form.get("billing_state", "")
    country            = form.get("billing_country", "")
    zipcode            = form.get("billing_zip", "")
    stripe_customer_id = form.get("stripe_customer_id", "")
    fair_market_value  = form.get("fair_market_value", 0)

    opportunity_subtype = form.get('opportunity_subtype', None)
    if opportunity_subtype is not None and opportunity_subtype == 'Sales: Advertising':
        email = SALESFORCE_CONTACT_ADVERTISING_EMAIL

    logging.info("----Getting contact....")
    contact = Contact.get_or_create(
        email=email, first_name=first_name, last_name=last_name, stripe_customer_id=stripe_customer_id,
        street=street, city=city, state=state, zipcode=zipcode, country=country
    )
    logging.info(contact)

    if opportunity_subtype is None or opportunity_subtype != 'Sales: Advertising':
        if contact.first_name != first_name or contact.last_name != last_name:
            logging.info(
                f"Contact name doesn't match: {contact.first_name} {contact.last_name}"
            )

        if not contact.created:
            logging.info(f"Updating contact {first_name} {last_name}")
            contact.first_name          = first_name
            contact.last_name           = last_name
            contact.mailing_street      = street
            contact.mailing_city        = city
            contact.mailing_state       = state
            contact.mailing_postal_code = zipcode
            contact.mailing_country     = country

            if stripe_customer_id != "":
                contact.stripe_customer_id  = stripe_customer_id

            contact.save()

    if contact.duplicate_found:
        send_multiple_account_warning(contact)

    if form["in_honor_or_memory"] != None:
        honor_or_memory = form["in_honor_or_memory"]
        form["in_honor_or_memory"] = 'In ' + str(honor_or_memory) + ' of...'

    if installment_period == "one-time":
        logging.info("----Creating one time payment...")
        opportunity = add_opportunity(
            contact=contact, form=form, customer=customer, payment_method=payment_method, charge_source=charge_source, quarantine=quarantine
        )
        try:
            charge(opportunity)
            lock = Lock(key=opportunity.lock_key)
            lock.append(key=opportunity.lock_key, value=opportunity.id)
            logging.info(opportunity)
            notify_slack(contact=contact, opportunity=opportunity)
        except ChargeException as e:
            e.send_slack_notification()
        except QuarantinedException:
            bad_actor_response.notify_bad_actor(
                transaction_type="Opportunity", transaction=opportunity
            )
        return True
    else:
        logging.info("----Creating recurring payment...")
        rdo = add_recurring_donation(
            contact=contact, form=form, customer=customer, payment_method=payment_method, charge_source=charge_source, quarantine=quarantine
        )

        # get opportunities
        opportunities = rdo.opportunities()
        today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
        closing_today = [
            opportunity
            for opportunity in opportunities
            if opportunity.close_date == today
        ]
        if len(closing_today):
            opp = closing_today[0]
            opp.fair_market_value = fair_market_value # set the first opportunity's fair market value
            try:
                charge(opp)
                lock = Lock(key=rdo.lock_key)
                lock.append(key=rdo.lock_key, value=rdo.id)
                logging.info(rdo)
                notify_slack(contact=contact, rdo=rdo)
            except ChargeException as e:
                e.send_slack_notification()
            except QuarantinedException:
                bad_actor_response.notify_bad_actor(transaction_type="RDO", transaction=rdo)
            return True


# this is used to update or cancel donations
@celery.task(name="app.update_donation")
def update_donation(form=None, customer=None, donation_type=None, payment_method=None, charge_source=None, bad_actor_request=None):
    """
    Update a contact and their donation in SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """

    #bad_actor_response = BadActor(bad_actor_request=bad_actor_request)
    #quarantine = bad_actor_response.quarantine
    quarantine = False

    form               = clean(form)
    first_name         = form.get("first_name", "")
    last_name          = form.get("last_name", "")
    installment_period = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    email              = form.get("email", "")
    street             = form.get("billing_street", "")
    city               = form.get("billing_city", "")
    state              = form.get("billing_state", "")
    country            = form.get("billing_country", "")
    zipcode            = form.get("billing_zip", "")
    stripe_customer_id = form.get("stripe_customer_id", "")

    opportunity_subtype = form.get('opportunity_subtype', None)
    if opportunity_subtype is not None and opportunity_subtype == 'Sales: Advertising':
        email = SALESFORCE_CONTACT_ADVERTISING_EMAIL

    logging.info("----Getting contact....")
    contact = Contact.get_or_create(
        email=email, first_name=first_name, last_name=last_name, stripe_customer_id=stripe_customer_id,
        street=street, city=city, state=state, zipcode=zipcode, country=country
    )
    logging.info(contact)

    if opportunity_subtype is None or opportunity_subtype != 'Sales: Advertising':
        if contact.first_name != first_name or contact.last_name != last_name:
            logging.info(
                f"Contact name doesn't match: {contact.first_name} {contact.last_name}"
            )

        if not contact.created:
            logging.info(f"Updating contact {first_name} {last_name}")
            contact.first_name          = first_name
            contact.last_name           = last_name
            contact.stripe_customer_id  = stripe_customer_id
            contact.mailing_street      = street
            contact.mailing_city        = city
            contact.mailing_state       = state
            contact.mailing_postal_code = zipcode
            contact.mailing_country     = country
            contact.save()

    if contact.duplicate_found:
        send_multiple_account_warning(contact)

    if form["in_honor_or_memory"] != None:
        honor_or_memory = form["in_honor_or_memory"]
        form["in_honor_or_memory"] = 'In ' + str(honor_or_memory) + ' of...'

    if installment_period == "one-time":
        logging.info("----Updating one time payment...")
        opportunity = update_opportunity(
            contact=contact, form=form, customer=customer, payment_method=payment_method, charge_source=charge_source, quarantine=quarantine
        )
        return True
    else:
        logging.info("----Updating recurring payment...")
        rdo = update_recurring_donation(
            contact=contact, form=form, customer=customer, payment_method=payment_method, charge_source=charge_source, quarantine=quarantine
        )

        # get opportunities
        opportunities = rdo.opportunities()
        today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
        closing_today = [
            opportunity
            for opportunity in opportunities
            if opportunity.close_date == today
        ]
        if len(closing_today):
            opp = closing_today[0]
            return True


# retry it for up to one hour, then stop
@celery.task(name="app.finish_donation", bind=True, max_retries=30)
def finish_donation(self, form=None):
    """
    Update the post-submit donation info in SF if supplied
    """

    # we don't run clean() on this form because the messages field is a list

    installment_period = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    lock_key = form.get("lock_key", "")
    post_submit_details = dict()

    # update the post submit fields

    # testimonial
    reason_for_supporting = form.get("reason_for_supporting", "")
    reason_for_supporting_shareable = form.get("reason_shareable", False)

    # newsletters
    groups_submitted = form.get("groups_submitted", [])

    if reason_for_supporting == "" and groups_submitted == []:
        return False

    if "04471b1571" in groups_submitted:
        daily_newsletter = True
    else:
        daily_newsletter = False

    if "94fc1bd7c9" in groups_submitted:
        sunday_review_newsletter = True
    else:
        sunday_review_newsletter = False

    if "ce6fd734b6" in groups_submitted:
        greater_mn_newsletter = True
    else:
        greater_mn_newsletter = False

    if "d89249e207" in groups_submitted:
        dc_memo = True
    else:
        dc_memo = False

    if "68449d845c" in groups_submitted:
        event_messages = True
    else:
        event_messages = False

    if "958bdb5d3c" in groups_submitted:
        feedback_messages = True
    else:
        feedback_messages = False

    # testimonial in salesforce
    post_submit_details["Reason_for_Gift__c"] = reason_for_supporting
    post_submit_details["Reason_for_gift_shareable__c"] = reason_for_supporting_shareable

    # newsletters in salesforce
    post_submit_details["Daily_newsletter_sign_up__c"] = daily_newsletter
    post_submit_details["Sunday_Review_newsletter__c"] = sunday_review_newsletter
    post_submit_details["Greater_MN_newsletter__c"] = greater_mn_newsletter
    post_submit_details["DC_Memo_sign_up__c"] = dc_memo
    post_submit_details["Event_member_benefit_messages__c"] = event_messages
    post_submit_details["Input_feedback_messages__c"] = feedback_messages

    if installment_period == "one-time":
        opps = Opportunity.load_after_submit(
            lock_key=lock_key
        )

        if not opps:
            logging.info("No opportunity id here yet. Delay and try again.")
            raise self.retry(countdown=120)

        response = Opportunity.update(opps, post_submit_details)
    else:
        rdo = RDO.load_after_submit(
            lock_key=lock_key
        )

        if not rdo:
            logging.info("No recurring donation id here yet. Delay and try again.")
            raise self.retry(countdown=120)

        rdo_response = RDO.update(rdo, post_submit_details)

        opps = Opportunity.load_after_submit(
            stage_name="Closed Won",
            lock_key=lock_key
        )

        if not opps:
            logging.info("No closed opportunity id here yet. Delay and try again.")
            raise self.retry(countdown=120)
        
        opps_response = Opportunity.update(opps, post_submit_details)
        


def do_charge_or_show_errors(form_data, template, function, donation_type):
    app.logger.debug("----Creating or updating Stripe customer...")

    amount = form_data["amount"]
    amount_formatted = format(amount, ",.2f")
    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]
    installment_period = form_data.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    customer_id = form_data.get("customer_id", "")
    update_default_source = form_data.get("update_default_source", "")
    stripe_payment_type = form_data.get("stripe_payment_type", "")

    charge_source = None
    payment_method_id = None
    payment_method = None
    bank_token = None
    source_token = None
    customer = None

    if form_data.get("payment_method_id", ""):
        payment_method_id = form_data["payment_method_id"]
    elif form_data.get("bankToken", ""):
        bank_token = form_data["bankToken"]
    elif form_data.get("stripeToken", ""):
        source_token = form_data["stripeToken"]

    app.logger.info(f"payment id is {payment_method_id} and bank token is {bank_token} and source token is {source_token}")

    if stripe_payment_type == "card":
        if payment_method_id is None and source_token is None:
            body = []
            message = "To pay with your credit card, first be sure to add all of the required information."
            app.logger.error(f"Missing credit card error: {message}")
            body.append({'type': 'missing_payment', 'message': message})
            return jsonify(errors=body)
    elif stripe_payment_type == "bank_account":
        if bank_token is None:
            body = []
            message = "To pay with your bank account, first sign in above to authorize the charge."
            app.logger.error(f"Missing bank account error: {message}")
            body.append({'type': 'missing_payment', 'message': message})
            return jsonify(errors=body)

    if customer_id == "": # this is a new customer
        app.logger.debug("----Creating new Stripe customer...")
        # if it is a new customer, assume they only have one payment method and it should be the default
        try:
            if payment_method_id is not None:
                customer = stripe.Customer.create(
                    email=email,
                    payment_method=payment_method_id
                )
                # retrieve the payment method object for consistency
                payment_method = stripe.PaymentMethod.retrieve(
                    payment_method_id
                )
            elif bank_token is not None:
                customer = stripe.Customer.create(
                    email=email,
                    source=bank_token
                )
            elif source_token is not None:
                customer = stripe.Customer.create(
                    email=email,
                    source=source_token
                )
            app.logger.info(customer)
        except stripe.error.CardError as e: # Stripe returned a card error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe CardError: {message}")
            return jsonify(errors=body)
        except stripe.error.InvalidRequestError as e:
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe InvalidRequestError: {message}")
            return jsonify(errors=body)
        except stripe.error.RateLimitError as e: # Too many requests made to the API too quickly
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe RateLimitError: {message}")
            return jsonify(errors=body)
        except stripe.error.AuthenticationError as e: # Authentication with Stripe's API failed
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe AuthenticationError: {message}")
            return jsonify(errors=body)
        except stripe.error.APIConnectionError as e: # Network communication with Stripe failed
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe APIConnectionError: {message}")
            return jsonify(errors=body)
        except stripe.error.StripeError as e: # Generic stripe error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe StripeError: {message}")
            return jsonify(errors=body)
        except Exception as e: # Unknown Stripe error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe Unknown Error: {message}")
            return jsonify(errors=body)
    elif customer_id is not None and customer_id != '': # this is an existing customer
        app.logger.info(f"----Updating existing Stripe customer: ID {customer_id}")
        customer = stripe.Customer.retrieve(customer_id)
        # since this is an existing customer, add the current payment method to the list.
        # we don't keep doing the default source thing since Stripe doesn't push it now.
        try:
            if payment_method_id is not None:
                app.logger.info(f"----Update customer: ID {customer_id}. Retrieve payment method.")
                customer = stripe.Customer.modify(
                    customer_id,
                    email=email,
                )
                # retrieve the payment method object
                payment_method = stripe.PaymentMethod.retrieve(
                    payment_method_id
                )
            elif bank_token is not None:
                app.logger.info(f"----Update customer: ID {customer_id}. Retrieve bank account.")
                customer = stripe.Customer.modify(
                    customer_id,
                    email=email,
                )
                # retrieve the bank account object
                charge_source = stripe.Customer.create_source(
                    customer_id,
                    source=bank_token,
                )
            elif source_token is None:
                if update_default_source != "":
                    app.logger.info(f"----Add new default source for customer: ID {customer_id}.")
                    customer = stripe.Customer.modify(
                        customer_id,
                        email=email,
                        source=source_token
                    )
                else:
                    app.logger.info(f"----Add new source for customer: ID {customer_id}")
                    charge_source = stripe.Customer.create_source(
                        customer_id,
                        source=source_token,
                    )
        except stripe.error.CardError as e: # Stripe returned a card error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe CardError: {message}")
            return jsonify(errors=body)
        except stripe.error.InvalidRequestError as e: # Stripe returned a bank account error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            if message == 'A bank account with that routing number and account number already exists for this customer.':
                # try to get the bank account that matches the token they've supplied
                try:
                    token = stripe.Token.retrieve(bank_token)
                    bank_accounts = stripe.Customer.list_sources(
                        customer_id,
                        object="bank_account",
                    )
                    for bank_account in bank_accounts:
                        if bank_account.object == 'bank_account' and bank_account.routing_number == token.bank_account.routing_number and bank_account.last4 == token.bank_account.last4:
                            customer = stripe.Customer.modify(
                                customer_id,
                                email=email,
                            )
                            charge_source = bank_account
                            app.logger.debug("----Reuse this bank account that was already on the Stripe customer...")
                        break
                except stripe.error.InvalidRequestError as e: # give up
                    body = e.json_body
                    err = body.get("error", {})
                    message = err.get("message", "")
                    app.logger.error(f"Stripe InvalidRequestError: {message}")
                    return jsonify(errors=body)
            else:
                app.logger.error(f"Stripe InvalidRequestError: {message}")
                return jsonify(errors=body)
        except stripe.error.RateLimitError as e: # Too many requests made to the API too quickly
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe RateLimitError: {message}")
            return jsonify(errors=body)
        except stripe.error.AuthenticationError as e: # Authentication with Stripe's API failed
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe AuthenticationError: {message}")
            return jsonify(errors=body)
        except stripe.error.APIConnectionError as e: # Network communication with Stripe failed
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe APIConnectionError: {message}")
            return jsonify(errors=body)
        except stripe.error.StripeError as e: # Generic stripe error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe StripeError: {message}")
            return jsonify(errors=body)
        except Exception as e: # Unknown Stripe error
            body = e.json_body
            err = body.get("error", {})
            message = err.get("message", "")
            app.logger.error(f"Stripe Unknown Error: {message}")
            return jsonify(errors=body)

    app.logger.info(f"Customer id: {customer.id} Customer email: {email} Customer name: {first_name} {last_name} Charge amount: {amount_formatted} Charge installment period: {installment_period}")
    bad_actor_request = None
    #try:
    #    if "zipcode" in form_data:
    #        zipcode = form_data["zipcode"]
    #    else:
    #        zipcode = form_data["billing_zip"]
    #    bad_actor_request = BadActor.create_bad_actor_request(
    #        headers=request.headers,
    #        captcha_token=form_data["recaptchaToken"],
    #        email=email,
    #        amount=amount,
    #        zipcode=zipcode,
    #        first_name=form_data["first_name"],
    #        last_name=form_data["last_name"],
    #        remote_addr=request.remote_addr,
    #    )
    #    app.logger.info(bad_actor_request)
    #except Exception as error:
    #    app.logger.warning("Unable to check for bad actor: %s", error)

    function(
        customer=customer,
        form=clean(form_data),
        donation_type=donation_type,
        payment_method=payment_method,
        charge_source=charge_source,
        bad_actor_request=bad_actor_request,
    )

    # get the json response from the server and put it into the specified template
    return jsonify(success=True)


def validate_form(FormType, template, function=add_donation.delay):

    form = FormType(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data
    form_errors = form.errors
    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]

    app.logger.info(pformat(form_data))

    # currently donation_type is not used for anything. maybe it should be used for the opportunity type
    if FormType is DonateForm or FormType is MinimalForm or FormType is CancelForm or FormType is FinishForm:
        donation_type = "Donation"
    elif FormType is AdvertisingForm or FormType is SalesForm:
        donation_type = "Sales"
    elif FormType is SponsorshipForm:
        donation_type = "Sponsorship"
    else:
        raise Exception("Unrecognized form type")

    # some form types allow for updating an existing Salesforce record
    if FormType is MinimalForm or FormType is CancelForm:
        if form_data["opportunity_id"] or form_data["recurring_id"]:
            function = update_donation.delay

    body = []

    try:
        valid = validate_email(email, allow_smtputf8=False) # validate and get info
        email = valid.email # replace with normalized form
    except EmailNotValidError as e:
        # email is not valid, exception message is human-readable
        app.logger.error(f"Email validation failed on address: {email}")
        message = str(e)
        body.append({"field": "email", "message": message})
        return jsonify(errors=body)
        
    if not form.validate():
        app.logger.error(f"Form validation errors: {form.errors}")
        for field in form.errors:
            body.append({"field": field, "message": form.errors[field]})
        return jsonify(errors=body)

    email_is_spam = is_known_spam_email(email)
    if email_is_spam is True: # email was a spammer
        body = []
        message = f"Please ensure you have a valid email address. {email} has been flagged as a possible spam email address."
        body.append({"field": "email", "message": message})
        return jsonify(errors=body)

    if app.config["USE_RECAPTCHA"] == True:
        captcha_response = request.form['g-recaptcha-response']
        if not is_human(captcha_response):
            app.logger.error(f"Error: recaptcha failed on donation: {email} {first_name} {last_name}")
            message = 'Our system was unable to verify that you are a human. Please email members@minnpost.com for assistance.'
            body.append({'field': 'recaptcha', 'message': message})
            return jsonify(errors=body)

    # for a cancel form, we go ahead and pass the data to the function and then stop
    if FormType is CancelForm:
        customer = None
        customer_id = form_data["customer_id"]
        if customer_id:
            customer = stripe.Customer.retrieve(form_data["customer_id"])
        function(customer=customer, form=clean(form_data), donation_type=donation_type)
        # get the json response from the server and put it into the specified template
        return True

    return do_charge_or_show_errors(
        form_data=form_data,
        template=template,
        function=function,
        donation_type=donation_type,
    )


@app.route("/robots.txt")
def robots_txt():
    root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(os.path.join(root_dir, "app"), "robots.txt")


@app.route("/")
def root_form():
    template    = "root.html"
    title       = "Support MinnPost"
    form        = MinimalForm()
    form_action = "/give/"

    # if there is already an amount, use it
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        amount = ""
        amount_formatted = ""

    # installment period
    installment_period = request.args.get("frequency", app.config["DEFAULT_FREQUENCY"])
    if installment_period == "monthly":
        yearly = 12
    else:
        yearly = 1

    # salesforce campaign
    campaign = request.args.get("campaign", "")

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # referring page url
    referring_page = request.args.get("referring_page", '')

    # user first name
    first_name = request.args.get("firstname", '')

    # user last name
    last_name = request.args.get("lastname", '')

    # user email
    email = request.args.get("email", '')

    return render_template(
        template,
        form=form,
        title=title,
        form_action=form_action,
        amount=amount_formatted, installment_period=installment_period, yearly=yearly,
        first_name=first_name, last_name=last_name, email=email,
        campaign=campaign, customer_id=customer_id, referring_page=referring_page,
        plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/give/", methods=["GET", "POST"])
def give_form():
    template    = "give.html"
    title       = "Payment information | MinnPost"
    description = "MinnPost Donation"
    form        = DonateForm()
    form_action = "/thanks/"
    step        = "pay"

    if request.method == "POST":
        return validate_form(DonateForm, template=template)

    # fields from URL

    # amount is the bare minimum to work
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        message = "The page you requested can't be found."
        return render_template("error.html", message=message, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW)

    # installment period
    installment_period = request.args.get("frequency", app.config["DEFAULT_FREQUENCY"])
    if installment_period == "monthly":
        yearly = 12
    else:
        yearly = 1

    # salesforce campaign
    campaign = request.args.get("campaign", "")

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # referring page url
    referring_page = request.args.get("referring_page", "")

    # user first name
    first_name = request.args.get("firstname", "")

    # user last name
    last_name = request.args.get("lastname", "")

    # user email
    email = request.args.get("email", "")

    # user address

    # street
    billing_street = request.args.get("billing_street", "")

    # city
    billing_city = request.args.get("billing_city", "")

    # state
    billing_state = request.args.get("billing_state", "")

    # zip
    billing_zip = request.args.get("billing_zip", "")

    # country
    billing_country = request.args.get("billing_country", "")

    # thank you gifts

    # swag item
    swag = request.args.get("swag", "")
    swag_form = format_swag(swag)

    # atlantic subscription
    atlantic_subscription = request.args.get("atlantic_subscription", "")
    atlantic_subscription_form = format_swag_subscription(atlantic_subscription)

    # existing atlantic subscriber
    atlantic_id = request.args.get("atlantic_id", "")

    # url for atlantic
    atlantic_id_url = ""
    if atlantic_id != "":
        atlantic_id_url = "&amp;" + atlantic_id

    # new york times subscription
    nyt_subscription = request.args.get("nyt_subscription", "")
    nyt_subscription_form = format_swag_subscription(nyt_subscription)

    # new york times games subscription
    nyt_games_subscription = request.args.get("nyt_games_subscription", "")
    nyt_games_subscription_form = format_swag_subscription(nyt_games_subscription)

    # minnpost t-shirt
    minnpost_tshirt = request.args.get("minnpost-t-shirt", "")
    minnpost_tshirt_form = format_swag_subscription(minnpost_tshirt)
    minnpost_tshirt_size_name = request.args.get("gift_option_name", "")
    minnpost_tshirt_size_value = request.args.get(minnpost_tshirt_size_name, "")

    # fair market value
    fair_market_value = 0
    fair_market_value_formatted = 0
    if request.args.get("fair_market_value"):
        fair_market_value = format_amount(request.args.get("fair_market_value", 0))
        fair_market_value_formatted = format(fair_market_value, ",.2f")

    # decline all benefits
    if request.args.get("decline_benefits"):
        decline_benefits = request.args.get("decline_benefits")
        if decline_benefits == "true":
            swag = ""
            atlantic_subscription = ""
            atlantic_id = ""
            nyt_subscription = ""
            nyt_games_subscription = ""
            minnpost_tshirt = ""
            minnpost_tshirt_size_name = ""
            minnpost_tshirt_size_value = ""
    else:
        decline_benefits = ""
    
    # url for declining
    if decline_benefits != "":
        decline_benefits_url = "&amp;decline_benefits=" + decline_benefits

    # fees
    fees = calculate_amount_fees(amount, "card")

    step_one_url = f'{app.config["MINNPOST_ROOT"]}/support/?amount={amount_formatted}&amp;frequency={installment_period}&amp;campaign={campaign}&amp;customer_id={customer_id}&amp;swag={swag}&amp;atlantic_subscription={atlantic_subscription}{atlantic_id_url}&amp;nyt_subscription={nyt_subscription}&amp;nyt_games_subscription={nyt_games_subscription}&amp;minnpost-t-shirt={minnpost_tshirt}&amp;{minnpost_tshirt_size_name}={minnpost_tshirt_size_value}&amp;gift_option_name={minnpost_tshirt_size_name}{decline_benefits}'

    # interface settings
    with_shipping = True
    hide_pay_comments = True
    show_amount_field = False

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # show apple pay
    show_payment_request = app.config["SHOW_PAYMENT_REQUEST"]

    # plaid token
    plaid_link_token = create_plaid_link_token()
    if plaid_link_token == {}:
        show_ach = False

    button = "Place this Donation"

    # make a uuid for redis and lock it
    lock_key = str(uuid.uuid4())
    lock = Lock(key=lock_key)
    lock.acquire()

    return render_template(
        template,
        title=title,
        form=form, step=step,
        form_action=form_action,
        amount=amount_formatted, fair_market_value=fair_market_value_formatted, installment_period=installment_period, yearly=yearly, description=description,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id, referring_page=referring_page,
        swag=swag_form,
        atlantic_subscription=atlantic_subscription_form, atlantic_id=atlantic_id,
        nyt_subscription=nyt_subscription_form, nyt_games_subscription=nyt_games_subscription_form,
        minnpost_tshirt=minnpost_tshirt_form, minnpost_tshirt_size_name=minnpost_tshirt_size_name, minnpost_tshirt_size_value=minnpost_tshirt_size_value,
        decline_benefits=decline_benefits,
        with_shipping=with_shipping, hide_pay_comments=hide_pay_comments, show_amount_field=show_amount_field, show_ach=show_ach, show_payment_request=show_payment_request, button=button, plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"], step_one_url=step_one_url,
        lock_key=lock_key,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], plaid_link_token=plaid_link_token,
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/donation-update/", methods=["GET", "POST"])
def donation_update_form():
    title       = "Update Your Donation"
    heading     = title
    description = title
    summary     = "Thank you for your support of MinnPost. Please fill out the fields to update your donation."
    # interface settings
    show_amount_field       = True
    allow_additional_amount = False
    hide_amount_heading     = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Update Your Donation"

    # require an opportunity or recurring donation ID to update
    if request.method == "GET" and not request.args.get("opportunity") and not request.args.get("recurring"):
        heading = "Update Your Donation"
        message = "To update a donation, this page needs to have the unique identifier for that donation."
        return render_template("error.html", heading=heading, message=message, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW)

    return minimal_form("donation-update", title, heading, description, summary, button, show_amount_field, allow_additional_amount, hide_amount_heading, hide_honor_or_memory, hide_display_name)


@app.route("/donation-cancel/", methods=["GET", "POST"])
def donation_cancel_form():

    template    = "cancel.html"
    form        = CancelForm()
    form_action = "/donation-cancel/"
    function    = update_donation.delay
    heading     = "Cancel Donation"
    path        = "donation-cancel"
    folder      = ""

    # salesforce donation object
    opportunity_id = request.args.get("opportunity", "")
    recurring_id = request.args.get("recurring", "")

    # salesforce donation object loader
    opportunity = None
    recurring = None
    donation = None

    # donation and user info
    amount = 0
    amount_formatted = amount
    yearly = 1
    installment_period = app.config["DEFAULT_FREQUENCY"]

    # required field values
    stage_name        = "Closed Lost"
    open_ended_status = "Closed"
    close_date        = None
    first_name        = ""
    last_name         = ""
    email             = ""
    customer_id       = ""
    
    if opportunity_id:
        heading       = "Cancel Single Donation"
    elif recurring_id:
        heading       = "Cancel Recurring Donation"

    title = f"{heading} | MinnPost"
    
    if request.method == "POST":
        valid_form = validate_form(CancelForm, template=template, function=function)
        if valid_form is True:
            return render_template(
                "finish.html",
                title=title,
                path=path, folder=folder,
                minnpost_root=app.config["MINNPOST_ROOT"],
                stripe=app.config["STRIPE_KEYS"]["publishable_key"], last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
            )
        else:
            return valid_form

    if opportunity_id:
        try:
            opportunity = Opportunity.list(
                opportunity_id=opportunity_id
            )
            donation = opportunity[0]
        except:
            donation = None
        installment_period = "one-time"
        close_date = donation.close_date
        close_date_formatted = datetime.strptime(close_date, '%Y-%m-%d').strftime('%B %-d, %Y')
    elif recurring_id:
        try:
            rdo = RDO.list(
                recurring_id=recurring_id
            )
            donation = rdo[0]
            installment_period = donation.installment_period.lower()
        except:
            donation = None

    if donation is not None:
        # set default values
        amount = donation.amount
        amount_formatted = amount
        first_name = donation.donor_first_name
        last_name = donation.donor_last_name
        email = donation.donor_email
        customer_id = donation.stripe_customer_id
        if recurring_id:
            summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} {installment_period.lower()} donation, click the button."
        else:
            if close_date is not None:
                summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} donation scheduled for {close_date_formatted}, click the button."
            else:
                summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} donation, click the button."
    # require an opportunity or recurring donation ID to cancel
    else:
        heading = "Cancel Your Donation"
        message = "To cancel a donation, this page needs to have the unique identifier for that donation."
        return render_template("error.html", heading=heading, message=message, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW)

    # interface settings
    button = "Confirm your cancellation"
    show_amount_field       = False
    allow_additional_amount = False
    hide_amount_heading     = True
   
    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        first_name=first_name, last_name=last_name, email=email, customer_id=customer_id,
        path=path, amount=amount_formatted, installment_period=installment_period,
        stage_name=stage_name, open_ended_status=open_ended_status, close_date=close_date, opportunity_id=opportunity_id, recurring_id=recurring_id,
        heading=heading, summary=summary, button=button,
        last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/donate/", methods=["GET", "POST"])
def donate_form():
    title       = "MinnPost Donation"
    heading     = title
    description = title
    summary     = "Thank you for supporting MinnPost’s nonprofit newsroom. If you have any questions, please email us at <a href=\"mailto:members@minnpost.com\">members@minnpost.com</a>."
    # interface settings
    show_amount_field       = True
    allow_additional_amount = False
    hide_amount_heading     = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Make Your Donation"
    
    return minimal_form("minimal", title, heading, description, summary, button, show_amount_field, allow_additional_amount, hide_amount_heading, hide_honor_or_memory, hide_display_name)


@app.route("/advertising-payment/", methods=["GET", "POST"])
def advertising_form():
    path        = "advertising-payment"
    template    = "advertising.html"
    title       = "Advertising Payment | MinnPost"
    heading     = "MinnPost Advertising"
    description = heading
    summary     = ""
    form        = AdvertisingForm()
    form_action = "/finish/"

    if request.method == "POST":
        return validate_form(AdvertisingForm, template=template)

    # fields from URL

    # amount
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        amount = 0
        amount_formatted = amount

    # installment period
    installment_period = "one-time"

    # salesforce campaign
    campaign = request.args.get("campaign", ADVERTISING_CAMPAIGN_ID)

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # invoice
    invoice = request.args.get("invoice", "")

    # organization
    client_organization = request.args.get("client_organization", "")

    # user first name
    first_name = request.args.get("firstname", "")

    # user last name
    last_name = request.args.get("lastname", "")

    # user email
    email = request.args.get("email", "")

    # user address

    # street
    billing_street = request.args.get("billing_street", "")

    # city
    billing_city = request.args.get("billing_city", "")

    # state
    billing_state = request.args.get("billing_state", "")

    # zip
    billing_zip = request.args.get("billing_zip", "")

    # country
    billing_country = request.args.get("billing_country", "")

    # default sf fields
    stage_name = "Pledged"
    now = datetime.now()
    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')
    close_date = today
    opportunity_type = "Sales"
    opportunity_subtype = "Sales: Advertising"

    # interface settings
    show_amount_field       = True
    allow_additional_amount = False
    hide_amount_heading     = True
    hide_honor_or_memory    = True
    hide_display_name       = True
    button                  = "Make Your Payment"
    recognition_label       = ""
    email_before_billing    = True
    hide_minnpost_account   = True
    hide_pay_comments       = True
    show_invoice            = True
    show_organization       = True
    pay_fees                = False

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # show apple pay
    show_payment_request = app.config["SHOW_PAYMENT_REQUEST"]

    # plaid token
    plaid_link_token = create_plaid_link_token()
    if plaid_link_token == {}:
        show_ach = False

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        path=path, amount=amount_formatted, installment_period=installment_period, description=description, close_date=close_date, stage_name=stage_name,
        opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        invoice=invoice, client_organization=client_organization,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        show_invoice=show_invoice, show_organization=show_organization,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, show_payment_request=show_payment_request, button=button, plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], plaid_link_token=plaid_link_token,
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/festival-vip/" , methods=["GET", "POST"])
def festival_vip_form():
    title       = "MinnPost Festival VIP Packages"
    heading     = ""
    description = title
    summary     = "With your VIP support for the MinnPost Festival, you're providing a crucial investment in MinnPost's public-service journalism year-round. Thank you for going deeper with us into these conversations and for standing behind with our nonprofit newsroom with your generous support."
    folder      = "festival"

    # salesforce campaign
    campaign = request.args.get("campaign", FESTIVAL_CAMPAIGN_ID)

    # interface settings
    allow_additional_amount = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Purchase your VIP package"
    
    return sponsorship_form(folder, title, heading, description, summary, campaign, button, allow_additional_amount, hide_honor_or_memory, hide_display_name)


@app.route("/tonight-vip/" , methods=["GET", "POST"])
def tonight_vip_form():
    title       = "MinnPost Tonight VIP Packages"
    heading     = ""
    description = title
    summary     = "With your VIP support as part of MinnPost Tonight, you’re providing a crucial investment in MinnPost’s public-service journalism year-round. Thank you for going deeper with us into these conversations and for standing behind with our nonprofit newsroom with your generous support."
    folder      = "tonight"

    # salesforce campaign
    campaign = request.args.get("campaign", TONIGHT_CAMPAIGN_ID)

    # interface settings
    allow_additional_amount = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Purchase your VIP package"
    
    return sponsorship_form(folder, title, heading, description, summary, campaign, button, allow_additional_amount, hide_honor_or_memory, hide_display_name)


@app.route("/anniversary/" , methods=["GET", "POST"])
def anniversary_form():
    title       = "MinnPost Anniversary"
    heading     = ""
    description = title
    summary     = "Thank you for joining us to celebrate and support MinnPost as we kick off our 15th Anniversary year on Tuesday, Sept. 13, 5:30-7:30 p.m. on the 25th floor of Expo Mpls."
    folder      = "anniversary"

    # salesforce campaign
    campaign = request.args.get("campaign", ANNIVERSARY_PARTY_CAMPAIGN_ID)

    # interface settings
    allow_additional_amount = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Purchase"
    
    return sponsorship_form(folder, title, heading, description, summary, campaign, button, allow_additional_amount, hide_honor_or_memory, hide_display_name)


@app.route("/minnroast-patron/" , methods=["GET", "POST"])
def minnroast_patron_form():
    title       = "MinnRoast Patron Packages"
    heading     = title
    description = title
    summary     = "Thank you for becoming a MinnRoast Patron! As a Patron, you receive the most exclusive access to this unique annual tradition and provide crucial financial support for MinnPost's nonprofit newsroom. Cheers!"
    folder      = "minnroast"

    # salesforce campaign
    campaign = request.args.get("campaign", MINNROAST_CAMPAIGN_ID)

    # interface settings
    allow_additional_amount = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Purchase your Patron package"

    return sponsorship_form(folder, title, heading, description, summary, campaign, button, allow_additional_amount, hide_honor_or_memory, hide_display_name)


@app.route("/pledge-payment/", methods=["GET", "POST"])
def pledge_payment_form():
    title       = "MinnPost Pledge Payment"
    heading     = title
    description = title
    summary     = "Thank you for being a loyal supporter of MinnPost. Please fill out the fields below to fulfill your pledge payment for MinnPost. If you have any questions, please email us at members@minnpost.com."
    # interface settings
    show_amount_field       = True
    allow_additional_amount = False
    hide_amount_heading     = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Finish Your Pledge"
    return minimal_form("minimal", title, heading, description, summary, button, show_amount_field, allow_additional_amount, hide_amount_heading, hide_honor_or_memory, hide_display_name)


## this is a minnpost url. use this when sending a request to plaid
## if successful, this returns the access token and bank account token for stripe from plaid
@app.route("/get_plaid_access_token/", methods=["POST"])
def plaid_access_token():

    form = PlaidForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    #public_token = form_data["public_token"]
    #account_id = form_data["account_id"]
    public_token = request.json["public_token"]
    account_id   = request.json["account_id"]

    plaid_host = plaid.Environment.Sandbox

    if app.config["PLAID_ENVIRONMENT"] == 'sandbox':
        plaid_host = plaid.Environment.Sandbox

    if app.config["PLAID_ENVIRONMENT"] == 'development':
        plaid_host = plaid.Environment.Development

    if app.config["PLAID_ENVIRONMENT"] == 'production':
        plaid_host = plaid.Environment.Production

    configuration = plaid.Configuration(
        host=plaid_host,
        api_key={
            'clientId': app.config["PLAID_CLIENT_ID"],
            'secret': app.config["PLAID_SECRET"],
            'plaidVersion': app.config["PLAID_API_VERSION"]
        }
    )
    api_client = plaid.ApiClient(configuration)
    client = plaid_api.PlaidApi(api_client)

    exchange_request = ItemPublicTokenExchangeRequest(
        public_token=public_token
    )
    exchange_response = client.item_public_token_exchange(exchange_request)
    access_token = exchange_response["access_token"]

    try:
        stripe_request = ProcessorStripeBankAccountTokenCreateRequest(
            access_token=access_token,
            account_id=account_id,
        )
        response = client.processor_stripe_bank_account_token_create(stripe_request)
        stripe_token_response = response.to_dict()

    except plaid.errors.PlaidError as e:
        # return jsonify({'error': {'display_message': e.display_message, 'error_code': e.code, 'error_type': e.type } })
        # we need better logging here.
        error_message = getattr(e, "error_message", None)
        display_message = getattr(e, "display_message", None)
        app.logger.error(f"Plaid access token error: {error_message}")
        logging.error(e)

        if error_message != None:
            message = error_message
        if display_message != None:
            message = display_message

        if error_message == None and display_message == None:
            message = "We were unable to connect to your account. Please try again."
            if e.code and e.code == "PRODUCTS_NOT_SUPPORTED":
                message = "The given account is not currently supported for use by Plaid. We apologize for the inconvenience."
        stripe_token_response = {"error" : message}
    
    return jsonify(stripe_token_response)


# used to calculate the fees Stripe will charge based on the payment type/amount
# called by ajax
@app.route("/calculate-fees/", methods=["POST"])
def calculate_fees():

    form = DonateForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    amount = form_data["amount"]
    fees = ''

    if amount is None or amount == "":
        amount = 0
    
    # get fee amount to send to stripe
    if "stripe_payment_type" in form_data:
        payment_type = form_data["stripe_payment_type"]
    else:
        payment_type = 'card'
    
    fees = calculate_amount_fees(amount, payment_type)

    ret_data = {"fees": float(fees)}
    return jsonify(ret_data)


# used to calculate the member level. Used for Analytics, for example
# called by ajax
@app.route("/calculate-member-level/", methods=["POST"])
def calculate_member_level():

    form = DonateForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    amount = form_data["amount"]

    if amount is None or amount == "":
        amount = 0

    installment_period = form_data.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    if installment_period == "monthly":
        yearly = 12
    else:
        yearly = 1
    level = check_level(amount, installment_period, yearly)

    ret_data = {"level": level}
    return jsonify(ret_data)


@app.route("/thanks/", methods=["POST"])
def thanks():
    template    = "thanks.html"
    title       = "Thank you for supporting MinnPost"
    form        = DonateForm(request.form)
    form_action = "/finish/"
    step        = "thanks"

    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    amount = form_data["amount"]
    amount_formatted = format(amount, ",.2f")

    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]

    installment_period = form_data.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    if installment_period == "monthly":
        yearly = 12
    else:
        yearly = 1
    level = check_level(amount, installment_period, yearly)

    lock_key = form_data["lock_key"]

    return render_template(
        template,
        title=title,
        step=step, form_action=form_action,
        amount=amount_formatted,
        installment_period=installment_period,
        yearly=yearly,
        level=level,
        email=email,
        first_name=first_name,
        last_name=last_name,
        lock_key=lock_key,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
        last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
    )


@app.route("/finish/", methods=["POST"])
def finish():
    template    = "finish.html"
    title       = "Thank you for supporting MinnPost"
    step        = "finish"
    form        = FinishForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data
    path = form_data.get("path", "")
    folder = form_data.get("folder", "")
    amount = form_data["amount"]
    amount_formatted = format(amount, ",.2f")
    additional_donation = form_data.get("additional_donation", 0)
    if additional_donation and additional_donation != 0:
        additional_donation = format(additional_donation, ",.2f")
    installment_period = form_data.get("installment_period", "")

    if path == "":
        finish_donation.delay(form_data)
    lock_key = form_data["lock_key"]
    lock = Lock(key=lock_key)
    lock.release()
    return render_template(
        template,
        title=title,
        step=step,
        path=path, folder=folder, amount=amount_formatted, additional_donation=additional_donation, installment_period=installment_period,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
    )


@app.route("/error")
def error():
    message = "Something went wrong!"
    return render_template("error.html", message=message, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW)


@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template("error.html", message=message, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW), 404


@app.route("/.well-known/apple-developer-merchantid-domain-association")
def merchantid():
    """
    This is here to verify our domain so Stripe can support Apple Pay.
    """
    return send_from_directory(
        app.static_folder, "apple-developer-merchantid-domain-association"
    )


def sales_form(folder, title, heading, description, summary, campaign, member_benefit_minnpost_tshirt = "", button = "Purchase", amount=0, fair_market_value=0, shipping_cost = 0, allow_additional_amount = False, hide_honor_or_memory = True, hide_display_name = True, with_shipping = False, opportunity_subtype = "Sales: Merchandise"):
    
    template    = "sales.html"
    form        = SalesForm()
    path        = "sales"
    form_action = "/finish/"

    if request.method == "POST":
        return validate_form(SalesForm, template=template)

    # fields from URL

    # amount
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        amount_formatted = amount

    # installment period
    installment_period = "one-time"

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # user first name
    first_name = request.args.get("firstname", "")

    # user last name
    last_name = request.args.get("lastname", "")

    # user email
    email = request.args.get("email", "")

    # user address

    # street
    billing_street = request.args.get("billing_street", "")

    # city
    billing_city = request.args.get("billing_city", "")

    # state
    billing_state = request.args.get("billing_state", "")

    # zip
    billing_zip = request.args.get("billing_zip", "")

    # country
    billing_country = request.args.get("billing_country", "")

    additional_donation = request.args.get("additional_donation", 0)
    if additional_donation != 0:
        additional_donation = format_amount(request.args.get("additional_donation"))

    # default sf fields
    stage_name = "Pledged"
    now = datetime.now()
    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')
    close_date = today
    opportunity_type = "Sales"

    # interface settings
    show_amount_field       = True
    recognition_label       = "Display as (in public recognition materials)"
    anonymous_label         = "Remain anonymous"
    hide_amount_heading     = True
    email_before_billing    = True
    hide_minnpost_account   = True
    hide_pay_comments       = True
    pay_fees                = False

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # show apple pay
    show_payment_request = app.config["SHOW_PAYMENT_REQUEST"]

    # plaid token
    plaid_link_token = create_plaid_link_token()
    if plaid_link_token == {}:
        show_ach = False

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        path=path, folder=folder,
        amount=amount, fair_market_value=fair_market_value, shipping_cost=shipping_cost, additional_donation=additional_donation, installment_period=installment_period, description=description, close_date=close_date, stage_name=stage_name,
        opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        member_benefit_minnpost_tshirt = member_benefit_minnpost_tshirt,
        campaign=campaign, customer_id=customer_id,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, with_shipping=with_shipping, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label, anonymous_label=anonymous_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, show_payment_request=show_payment_request, button=button, plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], plaid_link_token=plaid_link_token,
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


def sponsorship_form(folder, title, heading, description, summary, campaign, button = "Purchase your Patron package", allow_additional_amount = True, hide_honor_or_memory = True, hide_display_name = False):
    
    template    = "sponsorship.html"
    form        = SponsorshipForm()
    path        = "patron"
    form_action = "/finish/"

    if request.method == "POST":
        return validate_form(SponsorshipForm, template=template)

    # fields from URL

    # amount
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        amount = 0
        amount_formatted = amount

    # installment period
    installment_period = "one-time"

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # invoice
    invoice = request.args.get("invoice", "")

    # organization
    client_organization = request.args.get("client_organization", "")

    # user first name
    first_name = request.args.get("firstname", "")

    # user last name
    last_name = request.args.get("lastname", "")

    # user email
    email = request.args.get("email", "")

    # user address

    # street
    billing_street = request.args.get("billing_street", "")

    # city
    billing_city = request.args.get("billing_city", "")

    # state
    billing_state = request.args.get("billing_state", "")

    # zip
    billing_zip = request.args.get("billing_zip", "")

    # country
    billing_country = request.args.get("billing_country", "")

    additional_donation = request.args.get("additional_donation", 0)
    if additional_donation != 0:
        additional_donation = format_amount(request.args.get("additional_donation"))

    # default sf fields
    stage_name = "Pledged"
    now = datetime.now()
    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')
    close_date = today
    opportunity_type = "Sponsorship"
    opportunity_subtype = "Sponsorship: Event (patron package)"

    # interface settings
    show_amount_field       = True
    recognition_label       = "Display as (in public recognition materials)"
    anonymous_label         = "Remain anonymous"
    hide_amount_heading     = True
    email_before_billing    = True
    hide_minnpost_account   = True
    hide_pay_comments       = False
    pay_fees                = False

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # show apple pay
    show_payment_request = app.config["SHOW_PAYMENT_REQUEST"]

    # plaid token
    plaid_link_token = create_plaid_link_token()
    if plaid_link_token == {}:
        show_ach = False

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        path=path, folder=folder,
        amount=amount, additional_donation=additional_donation, installment_period=installment_period, description=description, close_date=close_date, stage_name=stage_name,
        opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label, anonymous_label=anonymous_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, show_payment_request=show_payment_request, button=button, plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], plaid_link_token=plaid_link_token,
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


# prefill configurable minimal form
def minimal_form(path, title, heading, description, summary, button, show_amount_field = True, allow_additional_amount = False, hide_amount_heading = True, hide_honor_or_memory = True, hide_display_name = True, recognition_label = 'Preferred name(s) for recognition', email_before_billing = True, hide_minnpost_account = True, hide_pay_comments = True):

    template    = "minimal.html"
    form        = MinimalForm()
    form_action = "/finish/" # we might want to make this a parameter but probably not

    # salesforce donation object
    opportunity_id = request.args.get("opportunity", "")
    recurring_id = request.args.get("recurring", "")

    if request.method == "POST":
        return validate_form(MinimalForm, template=template)

    now = datetime.now()
    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')
    year = now.year

    # salesforce donation object loader
    opportunity = None
    recurring = None
    donation = None

    # donation and user info
    amount = 0
    amount_formatted = amount
    fair_market_value = 0
    fair_market_value_formatted = fair_market_value
    yearly = 1
    campaign = ""
    customer_id = ""
    mrpledge_id = ""
    first_name = ""
    last_name = ""
    email = ""
    billing_street = ""
    billing_city = ""
    billing_state = ""
    billing_zip = ""
    billing_country = ""
    referring_page = ""
    credited_as = ""
    installment_period = app.config["DEFAULT_FREQUENCY"]
    pay_fees = False
    show_installment_period = False

    # default donation fields
    stage_name = "Pledged"
    close_date = today
    opportunity_type = "Donation"
    opportunity_subtype = "Donation: Individual"

    if opportunity_id:
        try:
            opportunity = Opportunity.list(
                opportunity_id=opportunity_id
            )
            donation = opportunity[0]
        except:
            donation = None
        installment_period = "one-time"
        show_installment_period = False
    elif recurring_id:
        try:
            rdo = RDO.list(
                recurring_id=recurring_id
            )
            donation = rdo[0]
            installment_period = donation.installment_period.lower()
            show_installment_period = True
        except:
            donation = None

    if donation is not None:
        # set default values
        amount = donation.amount
        amount_formatted = amount
        if installment_period is not None and installment_period == "monthly":
            yearly = 12
        else:
            yearly = 1
        if donation.campaign is not None:
            campaign = donation.campaign
        if donation.stripe_customer_id is not None:
            customer_id = donation.stripe_customer_id
        if donation.donor_first_name is not None:
            first_name = donation.donor_first_name
        if donation.donor_last_name is not None:
            last_name = donation.donor_last_name
        if donation.donor_email is not None:
            email = donation.donor_email
        if donation.donor_address_one is not None:
            billing_street = donation.donor_address_one
        if donation.donor_city is not None:
            billing_city = donation.donor_city
        if donation.donor_state is not None:
            billing_state = donation.donor_state
        if donation.donor_zip is not None:
            billing_zip = donation.donor_zip
        if donation.donor_country is not None:
            billing_country = donation.donor_country
        if donation.referring_page is not None:
            referring_page = donation.referring_page
        if donation.credited_as is not None:
            credited_as = donation.credited_as

        pay_fees = donation.agreed_to_pay_fees

        if opportunity:
            if donation.fair_market_value is not None:
                fair_market_value = donation.fair_market_value
                fair_market_value_formatted = fair_market_value
            if donation.stage_name is not None:
                # because it could be failed or closed lost or whatever and we want it to try again
                stage_name = "Pledged"

            if donation.mrpledge_id is not None:
                mrpledge_id = donation.mrpledge_id

    # salesforce fields that can be overridden with these url parameters
    # if there's not an existing donation, we can prepopulate fields with these url parameters
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")

    
    # fair market value
    fair_market_value = 0
    fair_market_value_formatted = 0
    if request.args.get("fair_market_value"):
        fair_market_value = format_amount(request.args.get("fair_market_value", 0))
        fair_market_value_formatted = format(fair_market_value, ",.2f")

    # installment period
    if request.args.get("frequency"):
        installment_period = request.args.get("frequency", installment_period)
        if installment_period == "monthly":
            yearly = 12

    # salesforce campaign
    campaign = request.args.get("campaign", campaign)

    # stripe customer id
    customer_id = request.args.get("customer_id", customer_id)

    # mrpledge ID
    mrpledge_id = request.args.get("pledge", mrpledge_id)

    # referring page url
    referring_page = request.args.get("referring_page", referring_page)

    # user first name
    first_name = request.args.get("firstname", first_name)

    # user last name
    last_name = request.args.get("lastname", last_name)

    # user email
    email = request.args.get("email", email)

    # user address

    # street
    billing_street = request.args.get("billing_street", billing_street)

    # city
    billing_city = request.args.get("billing_city", billing_city)

    # state
    billing_state = request.args.get("billing_state", billing_state)

    # zip
    billing_zip = request.args.get("billing_zip", billing_zip)

    # country
    billing_country = request.args.get("billing_country", billing_country)

    # stage and close date
    stage_name = request.args.get("stage", stage_name)
    close_date = request.args.get("close_date", close_date)

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # show apple pay
    show_payment_request = app.config["SHOW_PAYMENT_REQUEST"]

    # plaid token
    plaid_link_token = create_plaid_link_token()
    if plaid_link_token == {}:
        show_ach = False

    # fees
    fees = calculate_amount_fees(amount, "card")

    additional_donation = request.args.get("additional_donation", 0)
    if additional_donation:
        additional_donation = format_amount(request.args.get("additional_donation"))

    # make a uuid for redis and lock it
    lock_key = str(uuid.uuid4())
    lock = Lock(key=lock_key)
    lock.acquire()

    update_default_source = True # make this configurable by form

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        amount=amount, amount_formatted=amount_formatted, fair_market_value=fair_market_value_formatted, additional_donation=additional_donation, show_installment_period=show_installment_period, yearly=yearly, installment_period=installment_period,
        first_name=first_name, last_name=last_name, email=email, credited_as=credited_as,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, mrpledge_id=mrpledge_id, customer_id=customer_id, referring_page=referring_page,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        description=description, opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        update_default_source=update_default_source, stage_name=stage_name, close_date=close_date, opportunity_id=opportunity_id, recurring_id=recurring_id,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, show_payment_request=show_payment_request, button=button, plaid_env=PLAID_ENVIRONMENT, last_updated=dir_last_updated('static'), google_analytics_id=GOOGLE_ANALYTICS_ID, google_analytics_tracking_code_type=GOOGLE_ANALYTICS_TRACKING_CODE_TYPE, google_tag_manager_id=GOOGLE_TAG_MANAGER_ID, google_tag_manager_auth=GOOGLE_TAG_MANAGER_AUTH, google_tag_manager_preview=GOOGLE_TAG_MANAGER_PREVIEW,
        minnpost_root=app.config["MINNPOST_ROOT"],
        lock_key=lock_key, path=path,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], plaid_link_token=plaid_link_token,
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


# TODO why do I have to set the name here?
@celery.task(name="app.customer_source_updated")
def customer_source_updated(event):

    card_details = dict()

    # TODO update this with Opportunity fields when npsp is merged

    # we update all of these fields if any of them have changed because
    # we don't have these fields already populated; after some time that won't be
    # important

    if any(
        [
            "last4" in event["data"]["previous_attributes"],
            "brand" in event["data"]["previous_attributes"],
            "exp_year" in event["data"]["previous_attributes"],
        ]
    ):
        year = event["data"]["object"]["exp_year"]
        month = event["data"]["object"]["exp_month"]
        day = calendar.monthrange(year, month)[1]
        expiration = f"{year}-{month:02d}-{day:02d}"
        card_details["Card_expiration_date__c"] = expiration
        card_details["Card_type__c"] = event["data"]["object"]["brand"]
        card_details["Card_acct_last_4__c"] = event["data"]["object"]["last4"]
    else:
        logging.info("Event not relevant; discarding.")
        return

    opps = Opportunity.list(
        stage_name="Pledged", stripe_customer_id=event["data"]["object"]["customer"]
    )

    if not opps:
        return

    response = Opportunity.update(opps, card_details)
    logging.info(response)
    logging.info("card details updated")


@celery.task(name="app.authorization_notification")
def authorization_notification(payload):

    amzn_id = payload["AuthorizationNotification"]["AuthorizationDetails"][
        "AmazonAuthorizationId"
    ]

    # trim everything after the last dash - seems like there should be a more
    # straightforward way to do this
    match = re.search("^(.*)[-]", amzn_id)
    amzn_id = match.group(1)
    logging.info(amzn_id)

    client = AmazonPayClient(
        mws_access_key=MWS_ACCESS_KEY,
        mws_secret_key=MWS_SECRET_KEY,
        merchant_id=AMAZON_MERCHANT_ID,
        region="na",
        currency_code="USD",
        sandbox=AMAZON_SANDBOX,
    )
    response = client.get_order_reference_details(amazon_order_reference_id=amzn_id)
    response = response.to_dict()

    logging.info(json.dumps(response, indent=4))

    details = response["GetOrderReferenceDetailsResponse"][
        "GetOrderReferenceDetailsResult"
    ]["OrderReferenceDetails"]

    amount = details["OrderTotal"]["Amount"]
    logging.info(amount)
    name = HumanName(details["Buyer"]["Name"])
    first_name = name.first
    last_name = name.last
    email = details["Buyer"]["Email"]
    zipcode = get_zip(details=details)
    stripe_description = details["SellerOrderAttributes"]["StoreName"]

    logging.info("----Getting contact....")
    contact = Contact.get_or_create(
        email=email, first_name=first_name, last_name=last_name, zipcode=zipcode
    )
    logging.info(contact)

    if contact.first_name == "Subscriber" and contact.last_name == "Subscriber":
        logging.info(f"Changing name of contact to {first_name} {last_name}")
        contact.first_name = first_name
        contact.last_name = last_name
        contact.save()

    if contact.first_name != first_name or contact.last_name != last_name:
        logging.info(
            f"Contact name doesn't match: {contact.first_name} {contact.last_name}"
        )

    if zipcode and not contact.created and contact.mailing_postal_code != zipcode:
        contact.mailing_postal_code = zipcode
        contact.save()

    logging.info("----Adding opportunity...")

    opportunity = Opportunity(contact=contact, stage_name="Closed Won")
    opportunity.amount = amount
    opportunity.stripe_description = stripe_description
    opportunity.lead_source = "Amazon Alexa"
    opportunity.amazon_order_id = amzn_id
    opportunity.campaign = AMAZON_CAMPAIGN_ID
    opportunity.name = (
        f"[Alexa] {contact.first_name} {contact.last_name} ({contact.email})"
    )
    opportunity.save()
    logging.info(opportunity)
    notify_slack(contact=contact, opportunity=opportunity)
    if contact.duplicate_found:
        send_multiple_account_warning(contact)


def get_zip(details=None):

    try:
        return details["Destination"]["PhysicalDestination"]["PostalCode"]
    except KeyError:
        logging.info("No destination found")
    try:
        return details["BillingAddress"]["PhysicalAddress"]["PostalCode"]
    except KeyError:
        logging.info("No billing address found")
    return ""


@app.route("/amazonhook", methods=["POST"])
def amazonhook():

    payload = IpnHandler(request.data, request.headers)
    if not payload.authenticate():
        return payload.error

    payload = json.loads(payload.to_json())
    app.logger.info(json.dumps(payload, indent=2))
    notification_type = list(payload.keys())[0]

    # TODO maybe check ["AuthorizationStatus"]["State"] and only process if it's "Closed"?

    if notification_type == "AuthorizationNotification":
        authorization_notification.delay(payload)
    else:
        app.logger.info("ignoring event")

    return "", 200


@app.route("/stripehook", methods=["POST"])
def stripehook():
    payload = request.data.decode("utf-8")
    signature = request.headers.get("Stripe-Signature", None)

    app.logger.info(payload)

    try:
        event = stripe.Webhook.construct_event(
            payload, signature, STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        app.logger.warning("Error while decoding event!")
        return "Bad payload", 400
    except stripe.error.SignatureVerificationError:
        app.logger.warning("Invalid signature!")
        return "Bad signature", 400

    app.logger.info(f"Received event: id={event.id}, type={event.type}")

    if event.type == "customer.source.updated":
        customer_source_updated.delay(event)

    # TODO change this to debug later
    app.logger.info(event)

    return "", 200


def add_opportunity(contact=None, form=None, customer=None, payment_method=None, bank_account=None, charge_source=None, quarantine=False):
    """
    This will add a single donation in Salesforce.
    """

    today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
    opportunity = Opportunity(contact=contact)

    logging.info("----Adding opportunity...")

    # posted form fields
    first_name = form.get("first_name", "")
    last_name = form.get("last_name", "")

    # default
    opportunity.amount = form.get("amount", 0)
    opportunity.additional_donation = form.get("additional_donation", 0)
    opportunity.stripe_description = "MinnPost Donation"
    opportunity.campaign = form.get("campaign", "")
    opportunity.lead_source = "Stripe"
    opportunity.quarantined = quarantine
    opportunity.type = form.get("opportunity_type", "Donation")
    opportunity.close_date = form.get("close_date", today)
    opportunity.stage_name = form.get("stage_name", "Pledged")

    opportunity.name = (
        f"{first_name} {last_name} {opportunity.type} {opportunity.close_date}"
    )
    
    # minnpost custom fields
    opportunity.agreed_to_pay_fees = form.get("pay_fees", False)
    opportunity.anonymous = form.get("anonymous", False)
    opportunity.client_organization = form.get("client_organization", None)
    opportunity.credited_as = form.get("display_as", None)
    opportunity.donor_first_name = first_name
    opportunity.donor_last_name = last_name
    opportunity.donor_email = form.get("email", "")
    opportunity.donor_address_one = form.get("billing_street", "")
    opportunity.donor_city = form.get("billing_city", "")
    opportunity.donor_state = form.get("billing_state", "")
    opportunity.donor_zip = form.get("billing_zip", "")
    opportunity.donor_country = form.get("billing_country", "")
    opportunity.email_notify = form.get("email_notify", "")
    opportunity.email_user_when_canceled = form.get("email_user_when_canceled", False)
    opportunity.fair_market_value = form.get("fair_market_value", 0)
    opportunity.include_amount_in_notification = form.get("include_amount_in_notification", False)
    opportunity.in_honor_or_memory = form.get("in_honor_or_memory", "")
    opportunity.in_honor_memory_of = form.get("in_honor_memory_of", "")
    opportunity.notify_someone = form.get("notify_someone", False)
    opportunity.member_benefit_request_swag = form.get("member_benefit_request_swag", "")
    opportunity.member_benefit_request_nyt = form.get("member_benefit_request_nyt", "No")
    opportunity.member_benefit_request_nyt_games = form.get("member_benefit_request_nyt_games", "No")
    opportunity.member_benefit_request_atlantic = form.get("member_benefit_request_atlantic", "No")
    opportunity.member_benefit_request_atlantic_id = form.get("member_benefit_request_atlantic_id", "")
    opportunity.invoice = form.get("invoice", "")
    opportunity.mrpledge_id = form.get("mrpledge_id", "")
    opportunity.payment_type = "Stripe"
    opportunity.referring_page = form.get("source", None)
    opportunity.shipping_name = form.get("shipping_name", "")
    opportunity.shipping_street = form.get("shipping_street", "")
    opportunity.shipping_city = form.get("shipping_city", "")
    opportunity.shipping_state = form.get("shipping_state", "")
    opportunity.shipping_zip = form.get("shipping_zip", "")
    opportunity.shipping_country = form.get("shipping_country", "")
    opportunity.stripe_customer_id = customer["id"]
    opportunity.stripe_payment_type = form.get("stripe_payment_type", "")
    opportunity.subtype = form.get("opportunity_subtype", "Donation: Individual")

    # if there is a shipping cost, add it to the amount and the fair market value
    gift_delivery_method = form.get("gift_delivery_method", "")
    shipping_cost = form.get("shipping_cost", 0)
    if gift_delivery_method == "shipping":
        opportunity.shipping_cost = shipping_cost
    else:
        opportunity.shipping_cost = 0

    # tshirt size, if tshirt was selected
    member_benefit_request_minnpost_tshirt = form.get("member_benefit_request_minnpost_tshirt", "")
    if member_benefit_request_minnpost_tshirt == "yes":
        opportunity.member_benefit_minnpost_tshirt_size = form.get("member_benefit_minnpost_tshirt_size", "")

    if opportunity.subtype == 'Sales: Advertising' and opportunity.fair_market_value == 0:
        opportunity.fair_market_value = opportunity.amount

    # if there is an honor/memory radio but no value, clear the radio out
    if opportunity.in_honor_memory_of == "":
        opportunity.in_honor_or_memory = ""

    # some forms have testimony fields
    reason_for_supporting = form.get("reason_for_supporting", "")
    if reason_for_supporting != "":
        opportunity.reason_for_supporting = reason_for_supporting
        opportunity.reason_for_supporting_shareable = form.get("reason_shareable", False)

    opportunity.lock_key = form.get("lock_key", "")

    if opportunity.campaign == "":
        opportunity.campaign = app.config["DEFAULT_CAMPAIGN_ONETIME"]

    opportunity.stripe_transaction_fee = calculate_amount_fees(opportunity.amount, opportunity.stripe_payment_type, opportunity.agreed_to_pay_fees)

    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":        
        apply_card_details(data=opportunity, customer=customer, payment_method=payment_method, charge_source=charge_source)
    elif form["stripe_payment_type"] == "bank_account" and charge_source is not None:
        opportunity.stripe_bank_account = charge_source["id"]
    
    opportunity.save()
    return opportunity


def update_opportunity(contact=None, form=None, customer=None, payment_method=None, bank_account=None, charge_source=None, quarantine=False):
    """
    This will update a single donation in Salesforce.
    """

    opportunity = Opportunity(contact=contact)

    opportunity_id = form.get("opportunity_id", "")
    if opportunity_id:
        try:
            opportunity_list = Opportunity.list(
                opportunity_id=opportunity_id
            )
            opportunity = opportunity_list[0]
            logging.info("----Updating opportunity...")
        except:
            opportunity = None
    else:
        raise Exception("opportunity_id must have a value")
    
    # fields that can be updated by a user should go here
    amount = form.get("amount", 0)
    fair_market_value = form.get("fair_market_value", 0)
    agreed_to_pay_fees = form.get("pay_fees", False)
    anonymous = form.get("anonymous", False)
    credited_as = form.get("display_as", "")
    donor_first_name = form.get("first_name", "")
    donor_last_name = form.get("last_name", "")
    donor_email = form.get("email", "")
    donor_address_one = form.get("billing_street", "")
    donor_city = form.get("billing_city", "")
    donor_state = form.get("billing_state", "")
    donor_zip = form.get("billing_zip", "")
    donor_country = form.get("billing_country", "")
    email_notify = form.get("email_notify", "")
    email_user_when_canceled = form.get("email_user_when_canceled", False)
    stripe_customer_id = customer["id"]
    stripe_payment_type = form.get("stripe_payment_type", "")
    lock_key = form.get("lock_key", "")

    # these need to be set in case they aren't already present
    close_date = form.get("close_date", "") # we may want to override the form value?
    opportunity.stage_name = form.get("stage_name", "Pledged")
    opportunity.stripe_description = "MinnPost Donation"
    opportunity.payment_type = "Stripe"
    opportunity.quarantined = quarantine

    if close_date != "":
        opportunity.close_date = close_date

    opportunity.name = (
        f"{donor_first_name} {donor_last_name} {opportunity.type} {opportunity.close_date}"
    )

    # the actual opportunity values
    if amount != 0:
        opportunity.amount = amount

    if fair_market_value != 0:
        opportunity.fair_market_value = fair_market_value

    # always change these checkbox values based on the user's input
    opportunity.agreed_to_pay_fees = agreed_to_pay_fees
    opportunity.anonymous = anonymous
    opportunity.email_user_when_canceled = email_user_when_canceled

    # always change these text values based on user's input
    opportunity.credited_as = credited_as

    if donor_email != "":
        opportunity.donor_email = donor_email
    
    if donor_first_name != "":
        opportunity.donor_first_name = donor_first_name

    if donor_last_name != "":
        opportunity.donor_last_name = donor_last_name

    if donor_address_one != "":
        opportunity.donor_address_one = donor_address_one

    if donor_city != "":
        opportunity.donor_city = donor_city

    if donor_state != "":
        opportunity.donor_state = donor_state

    if donor_zip != "":
        opportunity.donor_zip = donor_zip

    if donor_country != "":
        opportunity.donor_country = donor_country

    if email_notify != "":
        opportunity.email_notify = email_notify

    if stripe_customer_id != "":
        opportunity.stripe_customer_id = stripe_customer_id

    if stripe_payment_type != "":
        opportunity.stripe_payment_type = stripe_payment_type

    if opportunity.subtype == 'Sales: Advertising' and opportunity.fair_market_value == "":
        opportunity.fair_market_value = opportunity.amount

    if lock_key != "":
        opportunity.lock_key = lock_key

    opportunity.stripe_transaction_fee = calculate_amount_fees(opportunity.amount, opportunity.stripe_payment_type, opportunity.agreed_to_pay_fees)

    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":        
        apply_card_details(data=opportunity, customer=customer, payment_method=payment_method, charge_source=charge_source)
    elif form["stripe_payment_type"] == "bank_account" and charge_source is not None:
        opportunity.stripe_bank_account = charge_source["id"]
    
    opportunity.save()
    return opportunity


def add_recurring_donation(contact=None, form=None, customer=None, payment_method=None, bank_account=None, charge_source=None, quarantine=False):
    """
    This will add a recurring donation in Salesforce.
    """

    if form["installment_period"] is None:
        raise Exception("installment_period must have a value")

    rdo = RDO(contact=contact)
    logging.info("----Adding recurring donation...")

    # default
    rdo.amount = form.get("amount", 0)
    rdo.additional_donation = form.get("additional_donation", 0)
    rdo.campaign = form.get("campaign", "")
    rdo.stripe_description = "MinnPost Sustaining Membership"
    rdo.lead_source = "Stripe"
    rdo.quarantined = quarantine
    
    
    # minnpost custom fields
    rdo.agreed_to_pay_fees = form.get("pay_fees", False)
    rdo.anonymous = form.get("anonymous", False)
    rdo.credited_as = form.get("display_as", None)
    rdo.donor_first_name = form.get("first_name", "")
    rdo.donor_last_name = form.get("last_name", "")
    rdo.donor_email = form.get("email", "")
    rdo.donor_address_one = form.get("billing_street", "")
    rdo.donor_city = form.get("billing_city", "")
    rdo.donor_state = form.get("billing_state", "")
    rdo.donor_zip = form.get("billing_zip", "")
    rdo.donor_country = form.get("billing_country", "")
    rdo.email_notify = form.get("email_notify", "")
    rdo.email_user_when_canceled = form.get("email_user_when_canceled", False)
    rdo.include_amount_in_notification = form.get("include_amount_in_notification", False)
    rdo.in_honor_or_memory = form.get("in_honor_or_memory", "")
    rdo.in_honor_memory_of = form.get("in_honor_memory_of", "")
    rdo.notify_someone = form.get("notify_someone", False)
    #rdo.installments = None
    rdo.installment_period = form.get("installment_period", "")
    rdo.member_benefit_request_swag = form.get("member_benefit_request_swag", "")
    rdo.member_benefit_request_nyt = form.get("member_benefit_request_nyt", "No")
    rdo.member_benefit_request_nyt_games = form.get("member_benefit_request_nyt_games", "No")
    rdo.member_benefit_request_atlantic = form.get("member_benefit_request_atlantic", "No")
    rdo.member_benefit_request_atlantic_id = form.get("member_benefit_request_atlantic_id", "")
    rdo.open_ended_status = form.get("open_ended_status", "")
    rdo.payment_type = "Stripe"
    rdo.referring_page = form.get("source", None)
    rdo.shipping_name = form.get("shipping_name", "")
    rdo.shipping_street = form.get("shipping_street", "")
    rdo.shipping_city = form.get("shipping_city", "")
    rdo.shipping_state = form.get("shipping_state", "")
    rdo.shipping_zip = form.get("shipping_zip", "")
    rdo.shipping_country = form.get("shipping_country", "")
    rdo.stripe_customer_id = customer["id"]
    rdo.stripe_payment_type = form.get("stripe_payment_type", "")

    # if there is a shipping cost, add it to the amount and the fair market value
    gift_delivery_method = form.get("gift_delivery_method", "")
    shipping_cost = form.get("shipping_cost", 0)
    if gift_delivery_method == "shipping":
        rdo.shipping_cost = shipping_cost

    # tshirt size, if tshirt was selected
    member_benefit_request_minnpost_tshirt = form.get("member_benefit_request_minnpost_tshirt", "")
    if member_benefit_request_minnpost_tshirt == "yes":
        rdo.member_benefit_minnpost_tshirt_size = form.get("member_benefit_minnpost_tshirt_size", "")

    # if there is an honor/memory radio but no value, clear the radio out
    if rdo.in_honor_memory_of == "":
        rdo.in_honor_or_memory = ""

    # some forms have testimony fields
    reason_for_supporting = form.get("reason_for_supporting", "")
    if reason_for_supporting != "":
        rdo.reason_for_supporting = reason_for_supporting
        rdo.reason_for_supporting_shareable = form.get("reason_shareable", False)

    rdo.stripe_transaction_fee = calculate_amount_fees(rdo.amount, rdo.stripe_payment_type, rdo.agreed_to_pay_fees)

    rdo.lock_key = form.get("lock_key", "")

    if rdo.open_ended_status == "":
        rdo.open_ended_status = "Open"

    if rdo.campaign == "":
        rdo.campaign = app.config["DEFAULT_CAMPAIGN_RECURRING"]

    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":        
        apply_card_details(data=rdo, customer=customer, payment_method=payment_method, charge_source=charge_source)
    elif form["stripe_payment_type"] == "bank_account" and charge_source is not None:
        rdo.stripe_bank_account = charge_source["id"]
    rdo.save()

    return rdo


def update_recurring_donation(contact=None, form=None, customer=None, payment_method=None, bank_account=None, charge_source=None, quarantine=False):
    """
    This will update a recurring donation in Salesforce.
    """

    if form["installment_period"] is None:
        raise Exception("installment_period must have a value")

    rdo = RDO(contact=contact)

    recurring_id = form.get("recurring_id", "")
    if recurring_id:
        try:
            rdo_list = RDO.list(
                recurring_id=recurring_id
            )
            rdo = rdo_list[0]
            logging.info("----Updating recurring donation...")
        except:
            opportunity = None
    else:
        raise Exception("recurring_id must have a value")

    # fields that can be updated by a user should go here
    amount = form.get("amount", 0)
    agreed_to_pay_fees = form.get("pay_fees", False)
    anonymous = form.get("anonymous", False)
    credited_as = form.get("display_as", "")
    donor_first_name = form.get("first_name", "")
    donor_last_name = form.get("last_name", "")
    donor_email = form.get("email", "")
    donor_address_one = form.get("billing_street", "")
    donor_city = form.get("billing_city", "")
    donor_state = form.get("billing_state", "")
    donor_zip = form.get("billing_zip", "")
    donor_country = form.get("billing_country", "")
    email_notify = form.get("email_notify", "")
    email_user_when_canceled = form.get("email_user_when_canceled", False)
    installment_period = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    open_ended_status = form.get("open_ended_status", "")
    stripe_customer_id = customer["id"]
    stripe_payment_type = form.get("stripe_payment_type", "")
    lock_key = form.get("lock_key", "")

    if open_ended_status == "":
        open_ended_status = "Open"

    # the actual recurring donation values
    if amount != 0:
        rdo.amount = amount

    # always change these checkbox values based on the user's input
    rdo.agreed_to_pay_fees = agreed_to_pay_fees
    rdo.anonymous = anonymous
    rdo.email_user_when_canceled = email_user_when_canceled

    # always change these text values based on user's input
    rdo.credited_as = credited_as

    # these need to be set in case they aren't already present
    rdo.stripe_description = "MinnPost Sustaining Membership"
    rdo.payment_type = "Stripe"
    rdo.quarantined = quarantine

    if donor_email != "":
        rdo.donor_email = donor_email

    if donor_first_name != "":
        rdo.donor_first_name = donor_first_name

    if donor_last_name != "":
        rdo.donor_last_name = donor_last_name

    if donor_address_one != "":
        rdo.donor_address_one = donor_address_one
    
    if donor_city != "":
        rdo.donor_city = donor_city

    if donor_state != "":
        rdo.donor_state = donor_state

    if donor_zip != "":
        rdo.donor_zip = donor_zip

    if donor_country != "":
        rdo.donor_country = donor_country

    if email_notify != "":
        rdo.email_notify = email_notify

    if installment_period != "":
        rdo.installment_period = installment_period

    if open_ended_status != "":
        rdo.open_ended_status = open_ended_status

    if stripe_customer_id != "":
        rdo.stripe_customer_id = stripe_customer_id

    if stripe_payment_type != "":
        rdo.stripe_payment_type = stripe_payment_type

    if lock_key != "":
        rdo.lock_key = lock_key

    rdo.stripe_transaction_fee = calculate_amount_fees(rdo.amount, rdo.stripe_payment_type, rdo.agreed_to_pay_fees)

    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":        
        apply_card_details(data=rdo, customer=customer, payment_method=payment_method, charge_source=charge_source)
    elif form["stripe_payment_type"] == "bank_account" and charge_source is not None:
        rdo.stripe_bank_account = charge_source["id"]

    rdo.save()

    return rdo


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
