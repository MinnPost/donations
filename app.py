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
from flask import Flask, redirect, render_template, request, send_from_directory, jsonify
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
    app, key_func=get_ipaddr, default_limits=["200 per day", "25 per hour"]
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

make_celery(app)


"""
Redirects.
"""

# support.minnpost.com/minnroast-sponsorship
@app.route("/minnroast-sponsorship/")
def minnroast_sponsorship_form():
    redirect_to = url_for("minnroast_patron_form", **request.args)
    return redirect(redirect_to)

# support.minnpost.com/minnroast-pledge
@app.route("/minnroast-pledge/")
def minnroast_pledge_form():
    redirect_to = url_for("minnpost_pledge_form", **request.args)
    return redirect(redirect_to)

# support.minnpost.com/recurring-donation-update
@app.route("/recurring-donation-update/")
def minnpost_recurring_donation_update_form():
    redirect_to = url_for("minnpost_donation_update_form", **request.args)
    return redirect(redirect_to)

# support.minnpost.com/anniversary-sponsorship
@app.route("/anniversary-sponsorship/")
def anniversary_sponsorship_form():
    redirect_to = url_for("anniversary_patron_form", **request.args)
    return redirect(redirect_to)



def apply_card_details(rdo=None, customer=None):

    """
    Takes the expiration date, card brand and expiration from a Stripe object and copies
    it to an RDO. The RDO is NOT saved and must be done after calling this function.
    That's to save an API call since other RDO details will almost certainly need to be
    saved as well.
    """

    customer = stripe.Customer.retrieve(customer["id"])
    card = customer.sources.retrieve(customer.sources.data[0].id)
    year = card.exp_year
    month = card.exp_month
    day = calendar.monthrange(year, month)[1]

    rdo.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
    rdo.stripe_card_brand = card.brand
    rdo.stripe_card_last_4 = card.last4

    return rdo


@celery.task(name="app.add_donation")
def add_donation(form=None, customer=None, donation_type=None, charge_source=None):
    """
    Add a contact and their donation into SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """

    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')

    form = clean(form)
    frequency = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])

    logging.info("----Getting contact....")
    contact = get_or_add_contact(form=form)
    logging.info(contact)

    if contact.created is False:
        logging.info("Updating contact")
        contact = update_contact(form=form)

    if contact.duplicate_found:
        send_multiple_account_warning(contact)

    if form["in_honor_or_memory"] != None:
        honor_or_memory = form["in_honor_or_memory"]
        form["in_honor_or_memory"] = 'In ' + str(honor_or_memory) + ' of...'

    if frequency == "one-time":
        logging.info("----Creating one time payment...")
        opportunity = add_or_update_opportunity(contact=contact, form=form, customer=customer, charge_source=charge_source)
        charge(opportunity)
        lock = Lock(key=opportunity.lock_key)
        lock.append(key=opportunity.lock_key, value=opportunity.id)
        logging.info(opportunity)
        notify_slack(contact=contact, opportunity=opportunity)
        return True
    else:
        logging.info("----Creating recurring payment...")
        rdo = add_or_update_recurring_donation(contact=contact, form=form, customer=customer, charge_source=charge_source)

        # get opportunities
        opportunities = rdo.opportunities()
        today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
        opp = [
            opportunity
            for opportunity in opportunities
            if opportunity.close_date == today
        ][0]
        # charge the first one
        charge(opp)

        # do more rdo stuff
        lock = Lock(key=rdo.lock_key)
        lock.append(key=rdo.lock_key, value=rdo.id)
        logging.info(rdo)
        notify_slack(contact=contact, rdo=rdo)
        return True


# this isn't being used yet
@celery.task(name="app.update_donation")
def update_donation(form=None, customer=None, donation_type=None):
    """
    Update an existing donation in SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """

    form = clean(form)
    first_name = form["first_name"]
    last_name = form["last_name"]
    frequency = form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    email = form["email"]
    zipcode = form["billing_zip"]



    opportunity_id = form.get("opportunity_id", None)
    recurring_id = form.get("recurring_id", None)

    # if we don't have either, get out

    logging.info("----Getting contact....")
    contact = Contact.get_or_create(
        email=email, first_name=first_name, last_name=last_name, zipcode=zipcode
    )
    logging.info(contact)

    if contact.first_name == "Subscriber" and contact.last_name == "Subscriber":
        logging.info(f"Changing name of contact to {first_name} {last_name}")
        contact.first_name = first_name
        contact.last_name = last_name
        contact.mailing_postal_code = zipcode
        contact.save()

    if contact.first_name != first_name or contact.last_name != last_name:
        logging.info(
            f"Contact name doesn't match: {contact.first_name} {contact.last_name}"
        )

    if zipcode and not contact.created and contact.mailing_postal_code != zipcode:
        contact.mailing_postal_code = zipcode
        contact.save()

    if contact.duplicate_found:
        send_multiple_account_warning(contact)

    if form["in_honor_or_memory"] != None:
        honor_or_memory = form["in_honor_or_memory"]
        form["in_honor_or_memory"] = 'In ' + str(honor_or_memory) + ' of...'

    if frequency == "one-time":
        logging.info("----Updating one time payment...")
        opportunity = add_or_update_opportunity(contact=contact, form=form, customer=customer)
        charge(opportunity)
        logging.info(opportunity)
        notify_slack(contact=contact, opportunity=opportunity)
        return True
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
    groups_submitted = form["groups_submitted"]

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

    if customer_id is "": # this is a new customer
        app.logger.debug("----Creating new Stripe customer...")
        # if it is a new customer, assume they only have one payment method and it should be the default
        try:
            if form_data.get("stripeToken",""):
                customer = stripe.Customer.create(
                        email=email,
                        card=form_data["stripeToken"] 
                )
                #stripe_card = customer.default_source
                
            if form_data.get("bankToken",""):
                customer = stripe.Customer.create(
                    email=email,
                    source=form_data["bankToken"]
                )
                #stripe_bank_account = customer.default_source
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
        customer.email = email
        customer.save()
        # since this is an existing customer, add the current payment method to the list.
        # this does not change the default payment method.
        # todo: build a checkbox or something that lets users indicate that we should update their default method
        # maybe anytime someone changes a customer, it should change the default method.
        try:
            if update_default_source is not "":

                if form_data.get("stripeToken",""):
                    customer = stripe.Customer.modify(
                        customer_id,
                        card=form_data["stripeToken"] 
                    )
                if form_data.get("bankToken",""):
                    customer = stripe.Customer.modify(
                        customer_id,
                        source=form_data["bankToken"]
                    )

            else:
                if form_data.get("stripeToken",""):
                    charge_source = customer.sources.create(source=form_data.get("stripeToken",""))
                if form_data.get("bankToken",""):
                    charge_source = customer.sources.create(source=form_data.get("bankToken",""))
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

    return jsonify(success=True)


def validate_form(FormType, template, function=add_donation.delay):
    app.logger.info(pformat(request.form))

    form = FormType(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data
    form_errors = form.errors
    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]

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
        v = validate_email(email, allow_smtputf8=False) # validate and get info
        email = v["email"] # replace with normalized form
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
    form_data_action = "/give/"
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
        form_action=form_action, form_data_action=form_data_action,
        amount=amount_formatted, frequency=frequency, yearly=yearly, description=description,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id, referring_page=referring_page,
        swag=swag_form,
        atlantic_subscription=atlantic_subscription_form, atlantic_id=atlantic_id,
        nyt_subscription=nyt_subscription_form,
        decline_benefits=decline_benefits,
        with_shipping=with_shipping, hide_pay_comments=hide_pay_comments, show_ach=show_ach, button=button, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"], step_one_url=step_one_url,
        lock_key=lock_key,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
    )


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

    client = Client(client_id=app.config["PLAID_CLIENT_ID"], secret=app.config["PLAID_SECRET"], public_key=app.config["PLAID_PUBLIC_KEY"], environment=app.config["PLAID_ENVIRONMENT"])
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


# prefill donate page
@app.route("/donate/", methods=["GET", "POST"])
def donate_form():

    template    = "minimal.html"
    form        = MinimalForm()
    form_action = "/finish/"

    if request.method == "POST":
        return validate_form(MinimalForm, template, update_donation.delay)

    # default fields that can be overridden by url
    opportunity_id = None
    recurring_id = None
    opportunity = None
    recurring = None

    amount = 0
    amount_formatted = 0
    campaign = None
    customer_id = None
    first_name = None
    last_name = None
    email = None
    billing_street = None
    billing_city = None
    billing_state = None
    billing_zip = None
    billing_country = None

    # fields from URL
    if request.args.get("opportunity"):
        opportunity_id = request.args.get("opportunity")
        try:
            opportunity = Opportunity.list(
                opportunity_id=opportunity_id
            )
            donation = opportunity[0]
        except:
            donation = None
    elif request.args.get("recurring"):
        recurring_id = request.args.get("recurring")
        try:
            rdo = RDO.list(
                recurring_id=recurring_id
            )
            donation = rdo[0]
        except:
            donation = None

    logging.info(donation)

    if donation is not None:
        # set defaults that urls can override
        amount = format_amount(donation.amount)
        amount_formatted = format(amount, ",.2f")
        campaign = donation.campaign
        customer_id = donation.stripe_customer_id
        first_name = donation.donor_first_name
        last_name = donation.donor_last_name
        anonymous = donation.anonymous
        credited_as = donation.credited_as
        email = donation.donor_email
        billing_street = donation.donor_address_one
        billing_city = donation.donor_city
        billing_state = donation.donor_state
        billing_zip = donation.donor_zip
        billing_country = donation.donor_country
        opportunity_type = donation.type
        opportunity_subtype = donation.subtype

    # allow some fields to be overridden on the url
    if request.args.get("amount"):
        amount = format_amount(request.args.get("amount"))
        amount_formatted = format(amount, ",.2f")

    # salesforce campaign
    if campaign is not None:
        if request.args.get("campaign"):
            campaign = request.args.get("campaign")
    else:
        campaign = request.args.get("campaign", "")

    # stripe customer id
    if customer_id is not None:
        if request.args.get("customer_id"):
            customer_id = request.args.get("customer_id")
    else:
        customer_id = request.args.get("customer_id", "")

    # donor first name
    if first_name is not None:
        if request.args.get("first_name"):
            first_name = request.args.get("first_name")
    else:
        first_name = request.args.get("first_name", "")

    # donor last name
    if last_name is not None:
        if request.args.get("last_name"):
            last_name = request.args.get("last_name")
    else:
        last_name = request.args.get("last_name", "")

    # donor email
    if email is not None:
        if request.args.get("email"):
            email = request.args.get("email")
    else:
        email = request.args.get("email", "")

    # user address

    # street
    if billing_street is not None:
        if request.args.get("billing_street"):
            billing_street = request.args.get("billing_street")
    else:
        billing_street = request.args.get("billing_street", "")

    # city
    if billing_city is not None:
        if request.args.get("billing_city"):
            billing_city = request.args.get("billing_city")
    else:
        billing_city = request.args.get("billing_city", "")

    # state
    if billing_state is not None:
        if request.args.get("billing_city"):
            billing_state = request.args.get("billing_state")
    else:
        billing_state = request.args.get("billing_state", "")

    # zip
    if billing_zip is not None:
        if request.args.get("billing_zip"):
            billing_zip = request.args.get("billing_zip")
    else:
        billing_zip = request.args.get("billing_zip", "")

    # country
    if billing_country is not None:
        if request.args.get("billing_country"):
            billing_country = request.args.get("billing_country")
    else:
        billing_country = request.args.get("billing_country", "")

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
    today = datetime.now(tz=ZONE).strftime('%Y-%m-%d')

    # fields for minimal form

    stage = ""
    if donation.stage_name is not None:
        stage = "Pledged" # because it could be failed or closed lost or whatever

    close_date = ""
    if donation.close_date is not None:
        three_days_ago = (datetime.now(tz=ZONE) - timedelta(days=3)).strftime('%Y-%m-%d')
        if donation.close_date <= three_days_ago:
            close_date = today
        else: 
            close_date = donation.close_date

    show_amount_field = True
    hide_amount_heading = True
    title = "MinnPost | Donation"
    heading = "MinnPost Donation"
    summary = "Thank you for supporting MinnPost’s nonprofit newsroom. If you have any questions, please email Tanner Curl at <a href=\"mailto:tcurl@minnpost.com\">tcurl@minnpost.com</a>."
    with_shipping = False
    hide_minnpost_account = True
    hide_pay_comments = True
    hide_display = False
    hide_honor_or_memory = False
    button = "Make Your Donation"
    description = "MinnPost Donation"
    allow_additional = False
    additional_donation = 0
    if allow_additional is True:
        if request.args.get("additional_donation"):
            additional_donation = format_amount(request.args.get("additional_donation"))

    # make a uuid for redis and lock it
    lock_key = str(uuid.uuid4())
    lock = Lock(key=lock_key)
    lock.acquire()

    return render_template(
        template,
        form=form,
        form_action=form_action,
        amount=amount, amount_formatted=amount_formatted,
        first_name=first_name, last_name=last_name, email=email, anonymous=anonymous, credited_as=credited_as,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        show_ach=show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root=app.config["MINNPOST_ROOT"],
        lock_key=lock_key,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"], use_recaptcha=app.config["USE_RECAPTCHA"],
        hide_amount_heading=hide_amount_heading, title=title, heading=heading, summary=summary, allow_additional=allow_additional, button=button, show_amount_field=show_amount_field, with_shipping=with_shipping, hide_minnpost_account=hide_minnpost_account, hide_pay_comments=hide_pay_comments, hide_display=hide_display, hide_honor_or_memory=hide_honor_or_memory,
        opportunity_id=opportunity_id, opportunity_type=opportunity_type, opportunity_subtype=opportunity_subtype, recurring_id=recurring_id, description=description,
        stage=stage, close_date=close_date,
    )


@app.route("/finish/", methods=["GET", "POST"])
def finish():
    template    = "finish.html"
    title       = "Thank you for supporting MinnPost"
    form = FinishForm(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data

    finish_donation.delay(form_data)
    app.logger.info("clearing lock")
    lock_key = form_data["lock_key"]
    lock = Lock(key=lock_key)
    lock.release()
    return render_template(
        template,
        title=title,
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


def get_or_add_contact(form=None):
    """
    This will get or add a contact in Salesforce.
    """

    email = form.get("email", "")
    contact = Contact.get(email=email)
    if contact:
        logging.debug(f"Contact found: {contact}")
        return contact

    contact = Contact()
    contact.email = email
    contact.first_name = form.get("first_name", "")
    contact.last_name = form.get("last_name", "")
    contact.description = form.get("description", None)
    contact.stripe_customer_id = form.get("stripe_customer_id", "")
    contact.mailing_street = form.get("billing_street", "")
    contact.mailing_city = form.get("billing_city", "")
    contact.mailing_state = form.get("billing_state", "")
    contact.mailing_postal_code = form.get("billing_zip", "")
    contact.mailing_country = form.get("billing_country", "")

    contact.save()
    return contact


def update_contact(form=None):
    """
    This will update a contact in Salesforce.
    """

    email = form.get("email", "")
    contact = Contact.get(email=email)
    if not contact:
        logging.debug(f"Contact not found: {email}")
        return contact

    contact = Contact()
    contact.email = email
    contact.first_name = form.get("first_name", "")
    contact.last_name = form.get("last_name", "")
    contact.description = form.get("description", None)
    contact.stripe_customer_id = form.get("stripe_customer_id", "")
    contact.mailing_street = form.get("billing_street", "")
    contact.mailing_city = form.get("billing_city", "")
    contact.mailing_state = form.get("billing_state", "")
    contact.mailing_postal_code = form.get("billing_zip", "")
    contact.mailing_country = form.get("billing_country", "")

    contact.save()
    return contact


def add_or_update_opportunity(contact=None, form=None, customer=None, charge_source=None):
    """
    This will add or update a single donation in Salesforce.
    """

    today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
    opportunity = Opportunity(contact=contact)

    opportunity_id = form.get("opportunity_id", None)
    if opportunity_id is not None:
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

    # default
    opportunity.amount = form.get("amount", 0)
    opportunity.stripe_description = "MinnPost Membership"
    opportunity.campaign = form.get("campaign", "")
    opportunity.lead_source = "Stripe"
    opportunity.type = form.get("opportunity_type", "Donation")
    opportunity.close_date = form.get("close_date", today)
    opportunity.stage = form.get("stage", "Pledged")
    
    # minnpost custom fields
    opportunity.agreed_to_pay_fees = form.get("pay_fees", False)
    opportunity.anonymous = form.get("anonymous", False)
    opportunity.client_organization = form.get("client_organization", None)
    opportunity.credited_as = form.get("display_as", None)
    opportunity.donor_first_name = form.get("first_name", "")
    opportunity.donor_last_name = form.get("last_name", "")
    opportunity.donor_email = form.get("email", "")
    opportunity.donor_address_one = form.get("billing_street", "")
    opportunity.donor_city = form.get("billing_city", "")
    opportunity.donor_state = form.get("billing_state", "")
    opportunity.donor_zip = form.get("billing_zip", "")
    opportunity.donor_country = form.get("billing_country", "")
    opportunity.email_notify = form.get("email_notify", "")
    opportunity.email_cancel = form.get("email_cancel", False)
    opportunity.fair_market_value = form.get("fair_market_value", "")
    opportunity.include_amount_in_notification = form.get("include_amount_in_notification", False)
    opportunity.in_honor_or_memory = form.get("in_honor_or_memory", "")
    opportunity.in_honor_memory_of = form.get("in_honor_memory_of", "")
    opportunity.notify_someone = form.get("notify_someone", False)
    opportunity.member_benefit_request_swag = form.get("member_benefit_request_swag", "")
    opportunity.member_benefit_request_nyt = form.get("member_benefit_request_nyt", "No")
    opportunity.member_benefit_request_atlantic = form.get("member_benefit_request_atlantic", "No")
    opportunity.member_benefit_request_atlantic_id = form.get("member_benefit_request_atlantic_id", "")
    opportunity.minnpost_invoice = form.get("minnpost_invoice", "")
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

    opportunity.lock_key = form.get("lock_key", "")

    if opportunity.campaign == "":
        opportunity.campaign = app.config["DEFAULT_CAMPAIGN_ONETIME"]
    
    if form["stripe_payment_type"] == "card" or form["stripe_payment_type"] == "amex":
        # stripe card source handling
        if charge_source is None:
            customer = stripe.Customer.retrieve(customer["id"])
            card = customer.sources.retrieve(customer.sources.data[0].id)
            year = card.exp_year
            month = card.exp_month
            brand = card.brand
            last4 = card.last4
        else:
            card = charge_source
            year = card["exp_year"]
            month = card["exp_month"]
            brand = card["brand"]
            last4 = card["last4"]
        
        day = calendar.monthrange(year, month)[1]

        opportunity.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
        opportunity.card_type = brand
        opportunity.stripe_card_last_4 = last4

    opportunity.save()
    return opportunity


def add_or_update_recurring_donation(contact=None, form=None, customer=None, charge_source=None):
    """
    This will add or update a recurring donation in Salesforce.
    """

    if form["installment_period"] is None:
        raise Exception("installment_period must have a value")

    rdo = RDO(contact=contact)

    recurring_id = form.get("recurring_id", None)
    if recurring_id is not None:
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
    rdo.email_cancel = form.get("email_cancel", False)
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
    rdo.open_ended_status = "Open"
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

    rdo.lock_key = form.get("lock_key", "")

    if rdo.campaign == "":
        rdo.campaign = app.config["DEFAULT_CAMPAIGN_RECURRING"]

    if form["stripe_payment_type"] == "card":
        apply_card_details(rdo=rdo, customer=customer)

    rdo.save()

    return rdo


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
