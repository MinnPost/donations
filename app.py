"""
This file is the entrypoint for this Flask application. Can be executed with 'flask
run', 'python app.py' or via a WSGI server like gunicorn or uwsgi.

"""
import calendar
import simplejson as json
import locale
import logging
import os
import re
import uuid
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
    PLAID_PUBLIC_KEY,
    PLAID_ENVIRONMENT,
    ENABLE_PORTAL,
    ADVERTISING_CAMPAIGN_ID,
    ANNIVERSARY_PARTY_CAMPAIGN_ID,
    COMBINED_EMAIL_FIELD,
    DEFAULT_CAMPAIGN_ONETIME,
    DEFAULT_CAMPAIGN_RECURRING,
    MINNROAST_CAMPAIGN_ID,
    SALESFORCE_CONTACT_ADVERTISING_EMAIL,
    ENABLE_SENTRY,
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    REPORT_URI,
    STRIPE_WEBHOOK_SECRET,
)
from datetime import datetime, timedelta
from pprint import pformat

from pytz import timezone

import celery
import stripe
from plaid import Client
from plaid.errors import APIError, ItemError
from app_celery import make_celery
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_ipaddr # https://help.heroku.com/784545
from flask import Flask, jsonify, redirect, render_template, request, send_from_directory
from forms import (
    format_amount,
    format_swag,
    format_swag_subscription,
    is_human,
    PlaidForm,
    DonateForm,
    MinimalForm,
    SponsorshipForm,
    AdvertisingForm,
    CancelForm,
    FinishForm,
)
from npsp import RDO, Contact, Opportunity, Affiliation, Account
from amazon_pay.ipn_handler import IpnHandler
from amazon_pay.client import AmazonPayClient
from nameparser import HumanName
from util import (
    clean,
    notify_slack,
    send_multiple_account_warning,
    dir_last_updated,
)
from email_validator import validate_email, EmailNotValidError
from charges import charge, calculate_amount_fees, check_level, ChargeException

ZONE = timezone(TIMEZONE)

if ENABLE_SENTRY:
    import sentry_sdk
    from sentry_sdk.integrations.flask import FlaskIntegration
    from sentry_sdk.integrations.celery import CeleryIntegration

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

limiter = Limiter(
    app, key_func=get_ipaddr, default_limits=["200 per day", "250 per hour"]
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
stripe.api_version = "2020-08-27"

make_celery(app)


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
    return redirect("/anniversary-patron/?%s" % query_string, code=302)

# support.minnpost.com/minnpost-advertising
@app.route("/minnpost-advertising/")
def minnpost_advertising_form():
    query_string = request.query_string.decode("utf-8")
    return redirect("/advertising-payment/?%s" % query_string, code=302)


def apply_card_details(rdo=None, customer=None, charge_source=None):

    """
    Takes the expiration date, card brand and expiration from a Stripe object and copies
    it to an RDO. The RDO is NOT saved and must be done after calling this function.
    That's to save an API call since other RDO details will almost certainly need to be
    saved as well.
    """

    if charge_source is None:
        customer = stripe.Customer.retrieve(customer["id"])
        card_id = customer.sources.data[0].id
        card = customer.sources.retrieve(card_id)
        year = card.exp_year
        month = card.exp_month
        brand = card.brand
        last4 = card.last4
    else:
        card = charge_source
        card_id = card["id"]
        year = card["exp_year"]
        month = card["exp_month"]
        brand = card["brand"]
        last4 = card["last4"]

    day = calendar.monthrange(year, month)[1]
    rdo.stripe_card = card_id
    rdo.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
    rdo.stripe_card_brand = brand
    rdo.stripe_card_last_4 = last4

    return rdo


@celery.task(name="app.add_donation")
def add_donation(form=None, customer=None, donation_type=None, charge_source=None):
    """
    Add a contact and their donation into SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """

    form               = clean(form)
    first_name         = form.get("first_name", "")
    last_name          = form.get("last_name", "")
    frequency          = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
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

    if frequency == "one-time":
        logging.info("----Creating or updating one time payment...")
        opportunity = add_or_update_opportunity(contact=contact, form=form, customer=customer, charge_source=charge_source)
        try:
            charge(opportunity)
            lock = Lock(key=opportunity.lock_key)
            lock.append(key=opportunity.lock_key, value=opportunity.id)
            logging.info(opportunity)
            notify_slack(contact=contact, opportunity=opportunity)
        except ChargeException as e:
            e.send_slack_notification()
        return True
    else:
        logging.info("----Creating or updating recurring payment...")
        rdo = add_or_update_recurring_donation(contact=contact, form=form, customer=customer, charge_source=charge_source)

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
            try:
                charge(opp)
                lock = Lock(key=rdo.lock_key)
                lock.append(key=rdo.lock_key, value=rdo.id)
                logging.info(rdo)
                notify_slack(contact=contact, rdo=rdo)
            except ChargeException as e:
                e.send_slack_notification()
            return True


# this is used to update or cancel donations
@celery.task(name="app.update_donation")
def update_donation(form=None, customer=None, donation_type=None):
    """
    Update an existing donation in SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """
    form               = clean(form)
    first_name         = form.get("first_name", "")
    last_name          = form.get("last_name", "")
    frequency          = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    email              = form.get("email", "")
    street             = form.get("billing_street", "")
    city               = form.get("billing_city", "")
    state              = form.get("billing_state", "")
    country            = form.get("billing_country", "")
    zipcode            = form.get("billing_zip", "")
    stripe_customer_id = form.get("stripe_customer_id", "")

    opportunity_id = form.get("opportunity_id", "")
    recurring_id = form.get("recurring_id", "")

    # if we don't have either, get out

    logging.info("----Getting contact....")
    contact = Contact.get_or_create(
        email=email, first_name=first_name, last_name=last_name, stripe_customer_id=stripe_customer_id,
        street=street, city=city, state=state, zipcode=zipcode, country=country
    )
    logging.info(contact)

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

    if frequency == "one-time":
        logging.info("----Updating one time payment...")
        opportunity = add_or_update_opportunity(contact=contact, form=form, customer=customer)
        logging.info(opportunity)
        notify_slack(contact=contact, opportunity=opportunity)
        return True
        # if we want to charge it, we are going to have to do something here
    else:
        logging.info("----Updating recurring payment...")
        rdo = add_or_update_recurring_donation(contact=contact, form=form, customer=customer)
        logging.info(rdo)
        notify_slack(contact=contact, rdo=rdo)
        return True


# retry it for up to one hour, then stop
@celery.task(name="app.finish_donation", bind=True, max_retries=30)
def finish_donation(self, form=None):
    """
    Update the post-submit donation info in SF if supplied
    """

    # we don't run clean() on this form because the messages field is a list

    frequency = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    lock_key = form.get("lock_key", "")
    post_submit_details = dict()

    # update the post submit fields

    # testimonial
    reason_for_supporting = form.get("reason_for_supporting", "")
    reason_for_supporting_shareable = form.get("reason_shareable", False)

    # newsletters
    groups_submitted = form.get("groups_submitted", None)

    if reason_for_supporting == "" and groups_submitted is None:
        return

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

    if frequency == "one-time":
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

        response = RDO.update(rdo, post_submit_details)


def do_charge_or_show_errors(form_data, template, function, donation_type):
    app.logger.debug("----Creating or updating Stripe customer...")

    amount = form_data["amount"]
    amount_formatted = format(amount, ",.2f")
    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]
    frequency = form_data.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    customer_id = form_data.get("customer_id", "")
    update_default_source = form_data.get("update_default_source", "")

    charge_source = None

    if form_data.get("stripeToken", ""):
        source_token = form_data["stripeToken"]
    elif form_data.get("bankToken",""):
        source_token = form_data["bankToken"]

    if customer_id is "": # this is a new customer
        app.logger.debug("----Creating new Stripe customer...")
        # if it is a new customer, assume they only have one payment method and it should be the default
        try:
            customer = stripe.Customer.create(
                email=email,
                source=source_token
            )
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
    elif customer_id is not None and customer_id != '': # this is an existing customer
        app.logger.info(f"----Updating existing Stripe customer: ID {customer_id}")
        customer = stripe.Customer.retrieve(customer_id)
        # since this is an existing customer, add the current payment method to the list.
        # this changes or does not change the default source based on the field value
        # currently it is always a hidden field; we might consider adding it as a choice for users.
        try:
            if update_default_source is not "":
                app.logger.info(f"----Update default source for customer: ID {customer_id}. token is {source_token}")
                customer = stripe.Customer.modify(
                    customer_id,
                    email=email,
                    source=source_token
                )
            else:
                charge_source = customer.sources.create(source=source_token)
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
                # use the account they already have, since it is identical
                sources = customer.sources
                for source in sources:
                    if source.object == 'bank_account':
                        #stripe_bank_account = source.id
                        app.logger.debug("----Reuse the bank account already on the Stripe customer...")
            else:
                app.logger.error(f"Stripe InvalidRequestError: {message}")
                return jsonify(errors=body)

    app.logger.info(f"Customer id: {customer.id} Customer email: {email} Customer name: {first_name} {last_name} Charge amount: {amount_formatted} Charge frequency: {frequency}")
    function(customer=customer, form=clean(form_data), donation_type=donation_type, charge_source=charge_source)

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
    elif FormType is AdvertisingForm:
        donation_type = "Sales"
    elif FormType is SponsorshipForm:
        donation_type = "Sponsorship"
    else:
        raise Exception("Unrecognized form type")

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
        app.logger.error(f"Form validation errors: {form_errors}")
        for field in form.errors:
            body.append({"field": field, "message": form.errors[field]})
        return jsonify(errors=body)

    if app.config["USE_RECAPTCHA"] == True:
        captcha_response = form_data["g-recaptcha-response"]
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

    # amount is the bare minimum to work
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        amount = ""
        amount_formatted = ""

    # frequency
    frequency = request.args.get("frequency", app.config["DEFAULT_FREQUENCY"])
    if frequency == "monthly":
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
        amount=amount_formatted, frequency=frequency, yearly=yearly,
        first_name=first_name, last_name=last_name, email=email,
        campaign=campaign, customer_id=customer_id, referring_page=referring_page,
        plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/give/", methods=["GET", "POST"])
def give_form():
    template    = "give.html"
    title       = "Payment information | MinnPost"
    description = "MinnPost Membership"
    form        = DonateForm()
    form_action = "/thanks/"

    if request.method == "POST":
        return validate_form(DonateForm, template=template)

    # fields from URL

    # amount is the bare minimum to work
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")
    else:
        message = "The page you requested can't be found."
        return render_template("error.html", message=message)

    # frequency
    frequency = request.args.get("frequency", app.config["DEFAULT_FREQUENCY"])
    if frequency == "monthly":
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

    # decline all benefits
    if request.args.get("decline_benefits"):
        decline_benefits = request.args.get("decline_benefits")
        if decline_benefits == "true":
            swag = ""
            atlantic_subscription = ""
            atlantic_id = ""
            nyt_subscription = ""
    else:
        decline_benefits = ""
    
    # url for declining
    if decline_benefits != "":
        decline_benefits_url = "&amp;decline_benefits=" + decline_benefits

    # fees
    fees = calculate_amount_fees(amount, "card")

    step_one_url = f'{app.config["MINNPOST_ROOT"]}/support/?amount={amount_formatted}&amp;frequency={frequency}&amp;campaign={campaign}&amp;customer_id={customer_id}&amp;swag={swag}&amp;atlantic_subscription={atlantic_subscription}{atlantic_id_url}&amp;nyt_subscription={nyt_subscription}{decline_benefits}'

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

    button = "Place this Donation"

    # make a uuid for redis and lock it
    lock_key = str(uuid.uuid4())
    lock = Lock(key=lock_key)
    lock.acquire()

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        amount=amount_formatted, frequency=frequency, yearly=yearly, description=description,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id, referring_page=referring_page,
        swag=swag_form,
        atlantic_subscription=atlantic_subscription_form, atlantic_id=atlantic_id,
        nyt_subscription=nyt_subscription_form,
        decline_benefits=decline_benefits,
        with_shipping=with_shipping, hide_pay_comments=hide_pay_comments, show_amount_field=show_amount_field, show_ach=show_ach, button=button, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"], step_one_url=step_one_url,
        lock_key=lock_key,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
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
    return minimal_form("donation-update", title, heading, description, summary, button, show_amount_field, allow_additional_amount, hide_amount_heading, hide_honor_or_memory, hide_display_name)


@app.route("/donation-cancel/", methods=["GET", "POST"])
def donation_cancel_form():

    template    = "cancel.html"
    form        = CancelForm()
    form_action = "/donation-cancel/"
    function    = update_donation.delay
    heading     = "Cancel Donation"
    path         = "donation-cancel"

    # salesforce donation object
    opportunity_id = request.args.get("opportunity", "")
    recurring_id = request.args.get("recurring", "")

    # default donation fields
    stage_name = "Closed Lost"
    open_ended_status = "Closed"
    
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
                path=path,
                minnpost_root=app.config["MINNPOST_ROOT"],
                stripe=app.config["STRIPE_KEYS"]["publishable_key"], last_updated=dir_last_updated('static'),
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
        frequency = "one-time"
        close_date = donation.close_date
        close_date_formatted = datetime.strptime(close_date, '%Y-%m-%d').strftime('%B %-d, %Y')
    elif recurring_id:
        try:
            rdo = RDO.list(
                recurring_id=recurring_id
            )
            donation = rdo[0]
            frequency = donation.installment_period.lower()
        except:
            donation = None

    if donation is not None:
        # set default values
        amount = donation.amount
        amount_formatted = amount
        if recurring_id:
            summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} {frequency.lower()} donation, click the button."
        else:
            if close_date is not None:
                summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} donation scheduled for {close_date_formatted}, click the button."
            else:
                summary = f"Thanks for your support of MinnPost. To confirm cancellation of your ${amount} donation, click the button."

    first_name  = donation.donor_first_name
    last_name   = donation.donor_last_name
    email       = donation.donor_email
    customer_id = donation.stripe_customer_id

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
        path=path, amount=amount_formatted, frequency=frequency,
        first_name=first_name, last_name=last_name, email=email, customer_id=customer_id,
        stage_name=stage_name, open_ended_status=open_ended_status, close_date=close_date, opportunity_id=opportunity_id, recurring_id=recurring_id,
        heading=heading, summary=summary, button=button,
        last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/donate/", methods=["GET", "POST"])
def donate_form():
    title       = "MinnPost Donation"
    heading     = title
    description = title
    summary     = "Thank you for supporting MinnPost’s nonprofit newsroom. If you have any questions, please email Tanner Curl at <a href=\"mailto:tcurl@minnpost.com\">tcurl@minnpost.com</a>."
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

    # frequency
    frequency = "one-time"

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

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        path=path, amount=amount_formatted, frequency=frequency, description=description, close_date=close_date, stage_name=stage_name,
        opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        invoice=invoice, client_organization=client_organization,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        show_invoice=show_invoice, show_organization=show_organization,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, button=button, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


@app.route("/anniversary-patron/" , methods=["GET", "POST"])
def anniversary_patron_form():
    title       = "MinnPost Anniversary Patron"
    heading     = ""
    description = title
    summary     = "Support MinnPost as a Patron at our 13th Anniversary Celebration: Justice, Democracy & the Supreme Court — a conversation with Linda Greenhouse, Pulitzer Prize-winning journalist from the New York Times — on Wednesday, October 14."
    folder      = "anniversary"

    # salesforce campaign
    campaign = request.args.get("campaign", ANNIVERSARY_PARTY_CAMPAIGN_ID)

    # interface settings
    allow_additional_amount = True
    hide_honor_or_memory    = True
    hide_display_name       = False
    button                  = "Purchase your Patron package"
    
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
    summary     = "Thank you for being a loyal supporter of MinnPost. Please fill out the fields below to fulfill your pledge payment for MinnPost. If you have any questions, please email Tanner Curl at tcurl@minnpost.com."
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
@app.route("/plaid_token/", methods=["POST"])
def plaid_token():

    form = PlaidForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    public_token = form_data["public_token"]
    account_id = form_data["account_id"]

    client = Client(client_id=app.config["PLAID_CLIENT_ID"], secret=app.config["PLAID_SECRET"], environment=app.config["PLAID_ENVIRONMENT"])
    exchange_token_response = client.Item.public_token.exchange(public_token)
    access_token = exchange_token_response["access_token"]

    stripe_response = client.Processor.stripeBankAccountTokenCreate(access_token, account_id)

    if "stripe_bank_account_token" in stripe_response:
        response = stripe_response
    else:
        response = {"error" : "We were unable to connect to your account. Please try again."}
    
    return jsonify(response)


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
    
    # get fee amount to send to stripe
    if "stripe_payment_type" in form_data:
        payment_type = form_data["stripe_payment_type"]
    else:
        payment_type = 'card'
    
    fees = calculate_amount_fees(amount, payment_type)

    ret_data = {"fees": fees}
    return jsonify(ret_data)


@app.route("/create-payment-intent/", methods=['POST'])
def create_payment_intent():
    #data = json.loads(request.data)

    form = DonateForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    amount   = form_data["amount"]
    currency = form_data.get("currency", "usd")

    # Create a PaymentIntent with the order amount and currency
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency=currency
    )

    try:
        # Send publishable key and PaymentIntent details to client
        return jsonify({'publishableKey': app.config["STRIPE_KEYS"]["publishable_key"], 'clientSecret': intent.client_secret})
    except Exception as e:
        return jsonify(error=str(e)), 403


@app.route("/thanks/", methods=["POST"])
def thanks():
    template    = "thanks.html"
    title       = "Thank you for supporting MinnPost"
    form        = DonateForm(request.form)
    form_action = "/finish/"

    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    amount = form_data["amount"]
    amount_formatted = format(amount, ",.2f")

    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]

    frequency = form_data.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    if frequency == "monthly":
        yearly = 12
    else:
        yearly = 1
    level = check_level(amount, frequency, yearly)

    lock_key = form_data["lock_key"]

    return render_template(
        template,
        title=title,
        form_action=form_action,
        amount=amount_formatted,
        frequency=frequency,
        yearly=yearly,
        level=level,
        email=email,
        first_name=first_name,
        last_name=last_name,
        lock_key=lock_key,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
        last_updated=dir_last_updated('static'),
    )


@app.route("/finish/", methods=["GET", "POST"])
def finish():
    template    = "finish.html"
    title       = "Thank you for supporting MinnPost"
    form = FinishForm(request.form)
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

    finish_donation.delay(form_data)
    lock_key = form_data["lock_key"]
    lock = Lock(key=lock_key)
    lock.release()
    return render_template(
        template,
        title=title,
        path=path, folder=folder, amount=amount_formatted, additional_donation=additional_donation,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"], last_updated=dir_last_updated('static'),
    )


@app.route("/error")
def error():
    message = "Something went wrong!"
    return render_template("error.html", message=message)


@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template("error.html", message=message), 404


@app.route("/.well-known/apple-developer-merchantid-domain-association")
def merchantid():
    """
    This is here to verify our domain so Stripe can support Apple Pay.
    """
    return send_from_directory(
        app.static_folder, "apple-developer-merchantid-domain-association"
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

    # frequency
    frequency = "one-time"

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

    return render_template(
        template,
        title=title,
        form=form,
        form_action=form_action,
        path=path, folder=folder,
        amount=amount, additional_donation=additional_donation, frequency=frequency, description=description, close_date=close_date, stage_name=stage_name,
        opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label, anonymous_label=anonymous_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, button=button, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
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

    if opportunity_id or recurring_id:
        function = update_donation.delay
    else:
        function = add_donation.delay

    if request.method == "POST":
        return validate_form(MinimalForm, template=template, function=function)

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
            if donation.stage_name is not None:
                # because it could be failed or closed lost or whatever and we want it to try again
                stage_name = "Pledged"
            if donation.close_date is not None:
                three_days_ago = (datetime.now(tz=ZONE) - timedelta(days=3)).strftime('%Y-%m-%d')
                # 
                if donation.close_date <= three_days_ago:
                    close_date = today
                else: 
                    close_date = donation.close_date

            if donation.mrpledge_id is not None:
                mrpledge_id = donation.mrpledge_id

    # salesforce fields that can be overridden with these url parameters
    # if there's not an existing donation, we can prepopulate fields with these url parameters
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")

    # frequency
    if request.args.get("frequency"):
        frequency = request.args.get("frequency", app.config["DEFAULT_FREQUENCY"])
        if frequency == "monthly":
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
        amount=amount_formatted, additional_donation=additional_donation, yearly=yearly, installment_period=installment_period,
        first_name=first_name, last_name=last_name, email=email, credited_as=credited_as,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, mrpledge_id=mrpledge_id, customer_id=customer_id, referring_page=referring_page,
        hide_amount_heading=hide_amount_heading, heading=heading, summary=summary, allow_additional_amount=allow_additional_amount, show_amount_field=show_amount_field,
        hide_display_name=hide_display_name, hide_honor_or_memory=hide_honor_or_memory, recognition_label=recognition_label,
        email_before_billing=email_before_billing, hide_minnpost_account=hide_minnpost_account, pay_fees=pay_fees,
        description=description, opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype,
        update_default_source=update_default_source, stage_name=stage_name, close_date=close_date, opportunity_id=opportunity_id, recurring_id=recurring_id,
        hide_pay_comments=hide_pay_comments, show_ach=show_ach, button=button, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        lock_key=lock_key, path=path,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
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


def add_or_update_opportunity(contact=None, form=None, customer=None, charge_source=None):
    """
    This will add or update a single donation in Salesforce.
    """

    today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
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
        logging.info("----Adding opportunity...")

    # posted form fields
    first_name = form.get("first_name", "")
    last_name = form.get("last_name", "")

    # default
    opportunity.amount = form.get("amount", 0)
    opportunity.additional_donation = form.get("additional_donation", 0)
    opportunity.stripe_description = "MinnPost Membership"
    opportunity.campaign = form.get("campaign", "")
    opportunity.lead_source = "Stripe"
    opportunity.type = form.get("opportunity_type", "Donation")
    opportunity.close_date = form.get("close_date", today)
    opportunity.stage_name = form.get("stage_name", "Pledged")

    opportunity.name = (
        f"{first_name} {last_name} {opportunity.type} {today}"
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

    if opportunity.subtype == 'Sales: Advertising' and opportunity.fair_market_value == "":
        opportunity.fair_market_value = opportunity.amount

    # some forms have testimony fields
    reason_for_supporting = form.get("reason_for_supporting", "")
    if reason_for_supporting != "":
        opportunity.reason_for_supporting = reason_for_supporting
        opportunity.reason_for_supporting_shareable = form.get("reason_shareable", False)

    opportunity.lock_key = form.get("lock_key", "")

    if opportunity.campaign == "":
        opportunity.campaign = app.config["DEFAULT_CAMPAIGN_ONETIME"]
    
    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":
        # stripe card source handling
        if charge_source is None:
            customer = stripe.Customer.retrieve(customer["id"])
            card_id = customer.sources.data[0].id
            card = customer.sources.retrieve(card_id)
            year = card.exp_year
            month = card.exp_month
            brand = card.brand
            last4 = card.last4
        else:
            card = charge_source
            card_id = card["id"]
            year = card["exp_year"]
            month = card["exp_month"]
            brand = card["brand"]
            last4 = card["last4"]
        
        day = calendar.monthrange(year, month)[1]
        opportunity.stripe_card = card_id
        opportunity.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
        opportunity.card_type = brand
        opportunity.stripe_card_last_4 = last4

    opportunity.stripe_transaction_fee = calculate_amount_fees(opportunity.amount, opportunity.stripe_payment_type, opportunity.agreed_to_pay_fees)

    opportunity.save()
    return opportunity


def add_or_update_recurring_donation(contact=None, form=None, customer=None, charge_source=None):
    """
    This will add or update a recurring donation in Salesforce.
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
        logging.info("----Adding recurring donation...")

    # default
    rdo.amount = form.get("amount", 0)
    rdo.additional_donation = form.get("additional_donation", 0)
    rdo.campaign = form.get("campaign", "")
    rdo.stripe_description = "MinnPost Sustaining Membership"
    rdo.lead_source = "Stripe"
    
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

    if form["stripe_payment_type"] == "card":
        apply_card_details(rdo=rdo, customer=customer, charge_source=charge_source)

    rdo.save()

    return rdo


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
