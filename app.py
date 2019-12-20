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
from datetime import datetime
from pprint import pformat

from pytz import timezone

import celery
import stripe
from plaid import Client
from plaid.errors import APIError, ItemError
from app_celery import make_celery
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import Flask, redirect, render_template, request, send_from_directory, jsonify, session
from forms import (
    DonateForm,
)
from npsp import RDO, Contact, Opportunity, Affiliation, Account
from amazon_pay.ipn_handler import IpnHandler
from amazon_pay.client import AmazonPayClient
from nameparser import HumanName
from util import (
    clean,
    notify_slack,
    send_multiple_account_warning,
)
from validate_email import validate_email
from charges import charge, calculate_amount_fees, check_level

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
    "default-src": ["'self'", "*.texastribune.org"],
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
        "*.texastribune.org",
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
        "*.texastribune.org",
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
        "*.texastribune.org",
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

if 'DYNO' in os.environ:
    sslify = SSLify(app) # only trigger SSLify if the app is running on Heroku

Talisman(
    app,
    content_security_policy={},
    content_security_policy_report_only=True,
    content_security_policy_report_uri=REPORT_URI,
)

limiter = Limiter(
    app, key_func=get_remote_address, default_limits=["200 per day", "50 per hour"]
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

@app.route("/index.html")
def index_html_route():
    return redirect("/give/", code=302)



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
def add_donation(form=None, customer=None, donation_type=None):
    """
    Add a contact and their donation into SF. This is done in the background
    because there are a lot of API calls and there's no point in making the
    payer wait for them. It sends a notification about the donation to Slack (if configured).
    """

    form = clean(form)
    first_name = form["first_name"]
    last_name = form["last_name"]
    frequency = form["installment_period"]
    email = form["email"]
    zipcode = form["billing_zip"]

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

    if frequency == "one-time":
        logging.info("----Creating one time payment...")
        opportunity = add_opportunity(contact=contact, form=form, customer=customer)
        charge(opportunity)
        logging.info(opportunity)
        notify_slack(contact=contact, opportunity=opportunity)
        return True
    else:
        logging.info("----Creating recurring payment...")
        rdo = add_recurring_donation(contact=contact, form=form, customer=customer)

    # get opportunities
    opportunities = rdo.opportunities()
    today = datetime.now(tz=ZONE).strftime("%Y-%m-%d")
    opp = [
        opportunity
        for opportunity in opportunities
        if opportunity.close_date == today
    ][0]
    charge(opp)
    logging.info(rdo)
    notify_slack(contact=contact, rdo=rdo)
    return True


def do_charge_or_show_errors(template, function, donation_type):
    app.logger.debug("----Creating Stripe customer...")

    amount = float(re.sub("[^\d\.]", "", form_data["amount"]))
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    email = form_data["email"]
    first_name = form_data["first_name"]
    last_name = form_data["last_name"]

    frequency = request.form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    if frequency == "monthly":
        yearly = 12
    else:
        yearly = 1
    level = check_level(amount, frequency, yearly)

    try:
        if "stripeToken" in request.form:
            customer = stripe.Customer.create(
                    email=email,
                    card=request.form["stripeToken"] 
            )
            stripe_card = customer.default_source
        elif "bankToken" in request.form:
            customer = stripe.Customer.create(
                email=email,
                source=request.form["bankToken"]
            )
            stripe_bank_account = customer.default_source
        amount_formatted = format(amount, ",.2f")
    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get("error", {})
        message = err.get("message", "")
        # at this point, amount has been converted to a float
        # bring it back to a string for the rehydration of the form
        form_data["amount"] = str(form_data["amount"])
        del form_data["stripeToken"]

        return render_template(
            template,
            stripe=app.config["STRIPE_KEYS"]["publishable_key"],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            message=message,
            form_data=form_data,
        )
    except stripe.error.InvalidRequestError as e:
        body = e.json_body
        err = body.get("error", {})
        message = err.get("message", "")
        # at this point, amount has been converted to a float
        # bring it back to a string for the rehydration of the form
        form_data["amount"] = str(form_data["amount"])
        del form_data["stripeToken"]
        del form_data["bankToken"]

        return render_template(
            template,
            stripe=app.config["STRIPE_KEYS"]["publishable_key"],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            message=message,
            form_data=form_data,
        )
    app.logger.info(f"Customer id: {customer.id} Customer email: {email} Customer name: {first_name} {last_name} Charge amount: {amount_formatted} Charge frequency: {frequency}")
    function(customer=customer, form=clean(form_data), donation_type=donation_type)
    return render_template(
        "thanks.html",
        amount=amount_formatted, frequency=frequency, yearly=yearly, level=level,
        email=email, first_name=first_name, last_name=last_name,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"]
    )


def validate_form(FormType, bundles, template, function=add_donation.delay):
    app.logger.info(pformat(request.form))

    form = FormType(request.form)
    # use form.data instead of request.form from here on out
    # because it includes all filters applied by WTF Forms
    form_data = form.data
    form_errors = form.errors
    email = form_data["email"]

    if FormType is DonateForm:
        donation_type = "membership"
    else:
        raise Exception("Unrecognized form type")

    if not validate_email(email):
        message = "There was an issue saving your email address."
        return render_template(
            "error.html", message=message
        )
    if not form.validate():
        app.logger.error(f"Form validation errors: {form_errors}")
        message = "There was an issue saving your donation information."
        return render_template(
            "error.html", message=message
        )

    return do_charge_or_show_errors(
        template=template,
        function=function,
        donation_type=donation_type,
    )


@app.route("/robots.txt")
def robots_txt():
    root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(os.path.join(root_dir, "app"), "robots.txt")


@app.route("/give/", methods=["GET", "POST"])
def give_form():
    template    = "give.html"
    form        = DonateForm()
    form_action = "/thanks/"

    if request.method == "POST":
        return validate_form(DonateForm, template=template)

    # fields from URL

    # amount is the bare minimum to work
    if request.args.get("amount"):
        amount = float(re.sub("[^\d\.]", "", request.args.get("amount")))
        if (amount).is_integer():
            amount_formatted = int(amount)
        else:
            amount_formatted = format(amount, ',.2f')
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
    campaign = request.args.get("campaign", '')

    # stripe customer id
    customer_id = request.args.get("customer_id", "")

    # show ach fields
    if request.args.get("show_ach"):
        show_ach = request.args.get("show_ach")
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = app.config["SHOW_ACH"]

    # user first name
    first_name = request.args.get("firstname", '')

    # user last name
    last_name = request.args.get("lastname", '')

    # user email
    email = request.args.get("email", '')

    # user address

    # street
    billing_street = request.args.get("billing_street", '')

    # city
    billing_city = request.args.get("billing_city", '')

    # state
    billing_state = request.args.get("billing_state", '')

    # zip
    billing_zip = request.args.get("billing_zip", '')

    # country
    billing_country = request.args.get("billing_country", '')

    # thank you gifts

    # swag item
    swag = request.args.get("swag", "")

    # atlantic subscription
    if request.args.get("atlantic_subscription"):
        atlantic_subscription = request.args.get("atlantic_subscription")
        if atlantic_subscription != "true":
            atlantic_subscription = ""
    else:
        atlantic_subscription = ""

    # existing atlantic subscriber
    atlantic_id = request.args.get("atlantic_id", "")

    # url for atlantic
    atlantic_id_url = ""
    if atlantic_id != "":
        atlantic_id_url = "&amp;" + atlantic_id

    # new york times subscription
    nyt_subscription = request.args.get("nyt_subscription", "")

    # decline all benefits
    if request.args.get("decline_benefits"):
        decline_benefits = request.args.get("decline_benefits")
        if decline_benefits == 'true':
            swag = ''
            atlantic_subscription = ''
            atlantic_id = ''
            nyt_subscription = ''
    else:
        decline_benefits = ''

    # fees
    fees = calculate_amount_fees(amount, "visa")

    step_one_url = f'{app.config["MINNPOST_ROOT"]}/support/?amount={amount_formatted}&amp;frequency={frequency}&amp;campaign={campaign}&amp;customer_id={customer_id}&amp;swag={swag}&amp;atlantic_subscription={atlantic_subscription}{atlantic_id_url}&amp;nyt_subscription={nyt_subscription}&amp;decline_benefits={decline_benefits}'

    return render_template(
        template,
        form=form,
        form_action=form_action,
        amount=amount_formatted, frequency=frequency, yearly=yearly,
        first_name=first_name, last_name=last_name, email=email,
        billing_street=billing_street, billing_city=billing_city, billing_state=billing_state, billing_zip=billing_zip,
        campaign=campaign, customer_id=customer_id,
        show_ach=show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        minnpost_root=app.config["MINNPOST_ROOT"], step_one_url=step_one_url,
        stripe=app.config["STRIPE_KEYS"]["publishable_key"]
    )


## this is a minnpost url. use this when sending a request to plaid
## if successful, this returns the access token and bank account token for stripe from plaid
@app.route("/plaid_token/", methods=["POST"])
def plaid_token():

    form = DonateForm(request.form)
    public_token = request.form["public_token"]
    account_id = request.form["account_id"]

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

    amount = float(re.sub("[^\d\.]", "", request.form["amount"]))
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    fees = ''
    
    # get fee amount to send to stripe
    if "payment_type" in request.form:
        payment_type = request.form["payment_type"]
        fees = calculate_amount_fees(amount, payment_type)

    ret_data = {"fees": fees}
    return jsonify(ret_data)


@app.route("/thanks/", methods=["POST"])
def thanks():
    template    = "thanks.html"
    form        = DonateForm()
    form_action = "/thanks/"

    amount = float(re.sub("[^\d\.]", "", request.form["amount"]))
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    customer_id = request.form["customer_id"]

    email = request.form["email"]
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]

    frequency = request.form.get("installment_period", app.config["DEFAULT_FREQUENCY"])
    if frequency == "monthly":
        yearly = 12
    else:
        yearly = 1
    level = check_level(amount, frequency, yearly)

    #if form.validate():
    #    print('Done with stripe processing {} {} {} for amount {} and frequency {}'.format(email, first_name, last_name, amount_formatted, frequency))
    #    print('try to update account now')
    #    update_account.delay(form=request.form, account = {'levelint' : level.get('levelint', 0), 'level' : 'MinnPost {}'.format(level.get('level', '--None--').title())})
    return render_template(
        template,
        form_action=form_action,
        amount=amount_formatted,
        frequency=frequency,
        yearly=yearly,
        level=level,
        email=email,
        first_name=first_name,
        last_name=last_name,
        #session=session,
        minnpost_root=app.config["MINNPOST_ROOT"],
        stripe=app.config["STRIPE_KEYS"]["publishable_key"]
    )
    #else:
    #    print('ajax result donate form did not validate: error below')
    #    print(form.errors)
    #    message = "There was an issue saving your donation information."
    #    print('Error with stripe processing {} {} {}'.format(email, first_name, last_name))
    #    return render_template(
    #        'error.html',
    #        message=message,
    #        key=app.config['STRIPE_KEYS']['publishable_key']
    #    )


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

    response = Opportunity.update_card(opps, card_details)
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
    description = details["SellerOrderAttributes"]["StoreName"]

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
    opportunity.description = description
    opportunity.lead_source = "Amazon Alexa"
    opportunity.amazon_order_id = amzn_id
    opportunity.campaign_id = AMAZON_CAMPAIGN_ID
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


def add_opportunity(contact=None, form=None, customer=None):
    """
    This will add a single donation to Salesforce.
    """

    logging.info("----Adding opportunity...")

    opportunity = Opportunity(contact=contact)

    # posted form fields

    # default
    opportunity.amount = form.get("amount", 0)
    opportunity.campaign_id = form.get("campaign_id", DEFAULT_CAMPAIGN_ONETIME)
    opportunity.description = "MinnPost Membership"
    opportunity.lead_source = "Stripe"
    opportunity.type = form.get("opp_type", "Donation")
    
    # minnpost custom fields
    opportunity.agreed_to_pay_fees = form.get("pay_fees", False)
    opportunity.anonymous = form.get("anonymous", False)
    opportunity.client_organization = form.get("client_organization", None)
    opportunity.credited_as = form.get("display_as", None)
    opportunity.donor_first_name = form.get("first_name", "")
    opportunity.donor_last_name = form.get("last_name", "")
    opportunity.donor_email = form['email']
    opportunity.donor_address_one = form.get("billing_street", "")
    opportunity.donor_city = form.get("billing_city", "")
    opportunity.donor_state = form.get("billing_state", "")
    opportunity.donor_zip = form.get("billing_zip", "")
    opportunity.donor_country = form.get("billing_country", "")
    opportunity.email_notify = form.get("email_notify", "")
    opportunity.email_cancel = form.get("email_cancel", False)
    opportunity.fair_market_value = form.get("fair_market_value", "")
    opportunity.include_amount_in_notification = form.get("include_amount_in_notification", False)
    opportunity.in_honor_memory = form.get("in_honor_memory", False)
    opportunity.in_honor_memory_of = form.get("in_honor_memory_of", "")
    opportunity.notify_someone = form.get("notify_someone", False)
    opportunity.member_benefit_request_swag = form.get("member_benefit_request_swag", "")
    opportunity.member_benefit_request_nyt = form.get("member_benefit_request_nyt", "No")
    opportunity.member_benefit_request_atlantic = form.get("member_benefit_request_atlantic", "No")
    opportunity.member_benefit_request_atlantic_id = form.get("member_benefit_request_atlantic_id", "")
    opportunity.member_benefit_request_thank_you_list = form.get("member_benefit_request_thank_you_list", "")
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
    opportunity.subtype = form.get("opp_subtype", "Donation: Individual")

    # stripe customer handling
    customer = stripe.Customer.retrieve(customer["id"])
    card = customer.sources.retrieve(customer.sources.data[0].id)
    year = card.exp_year
    month = card.exp_month
    day = calendar.monthrange(year, month)[1]

    opportunity.stripe_card_expiration = f"{year}-{month:02d}-{day:02d}"
    opportunity.card_type = card.brand
    opportunity.stripe_card_last_4 = card.last4

    opportunity.save()
    return opportunity


def add_recurring_donation(contact=None, form=None, customer=None):
    """
    This will add a recurring donation to Salesforce.
    """

    if form["installment_period"] is None:
        raise Exception("installment_period must have a value")

    rdo = RDO(contact=contact)

    # default
    rdo.amount = form.get("amount", 0)
    rdo.campaign_id = form.get("campaign_id", DEFAULT_CAMPAIGN_ONETIME)
    rdo.description = "MinnPost Sustaining Membership"
    rdo.lead_source = "Stripe"
    
    # minnpost custom fields
    rdo.agreed_to_pay_fees = form.get("pay_fees", False)
    rdo.anonymous = form.get("anonymous", False)
    rdo.credited_as = form.get("display_as", None)
    rdo.donor_first_name = form.get("first_name", "")
    rdo.donor_last_name = form.get("last_name", "")
    rdo.donor_email = form['email']
    rdo.donor_address_one = form.get("billing_street", "")
    rdo.donor_city = form.get("billing_city", "")
    rdo.donor_state = form.get("billing_state", "")
    rdo.donor_zip = form.get("billing_zip", "")
    rdo.donor_country = form.get("billing_country", "")
    rdo.email_notify = form.get("email_notify", "")
    rdo.email_cancel = form.get("email_cancel", False)
    rdo.include_amount_in_notification = form.get("include_amount_in_notification", False)
    rdo.in_honor_memory = form.get("in_honor_memory", False)
    rdo.in_honor_memory_of = form.get("in_honor_memory_of", "")
    rdo.notify_someone = form.get("notify_someone", False)
    #rdo.installments = None
    rdo.installment_period = form["installment_period"]
    rdo.member_benefit_request_swag = form.get("member_benefit_request_swag", "")
    rdo.member_benefit_request_nyt = form.get("member_benefit_request_nyt", "No")
    rdo.member_benefit_request_atlantic = form.get("member_benefit_request_atlantic", "No")
    rdo.member_benefit_request_atlantic_id = form.get("member_benefit_request_atlantic_id", "")
    rdo.member_benefit_request_thank_you_list = form.get("member_benefit_request_thank_you_list", "")
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

    apply_card_details(rdo=rdo, customer=customer)
    rdo.save()

    return rdo


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
