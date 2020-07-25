import os
import sys
import re
import requests
from datetime import datetime, timedelta
from pytz import timezone

from num2words import num2words

from flask import Flask, redirect, render_template, request, session, url_for, jsonify, json, send_from_directory, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_ipaddr # https://help.heroku.com/784545
from werkzeug.contrib.fixers import ProxyFix

from core import db
from models import Transaction

from forms import MinnPostForm, ConfirmForm
#from raven.contrib.flask import Sentry
#from sassutils.wsgi import SassMiddleware # mp put this into grunt instead
import stripe
from validate_email import validate_email
from helpers import checkLevel, amount_to_charge, calculate_amount_fees, get_frequency_label, dir_last_updated, is_known_spam_email, is_known_spam_ip

from flask_sslify import SSLify

from plaid import Client
from plaid.errors import APIError, ItemError

from config import TIMEZONE
from config import IP_BAN_LIST
from config import MINNPOST_ROOT
from config import FLASK_SECRET_KEY
from config import DEFAULT_CAMPAIGN_ONETIME
from config import DEFAULT_CAMPAIGN_RECURRING
from config import MINNROAST_CAMPAIGN_ID
from config import ANNIVERSARY_PARTY_CAMPAIGN_ID
from config import MINNROAST_OPPORTUNITY_SUBTYPE
from config import ANNIVERSARY_PARTY_OPPORTUNITY_SUBTYPE
from config import SHOW_UPSELL
from config import ALLOW_DONATION_NOTIFICATION

from config import ADVERTISING_CAMPAIGN_ID
from config import TOP_SWAG_MINIMUM_LEVEL
from config import SEPARATE_SWAG_MINIMUM_LEVEL
from config import MAIN_SWAG_MINIMUM_LEVEL
from config import MAXIMUM_CHOOSE_MULTIPLE_LEVEL_INT
from config import PLAID_CLIENT_ID
from config import PLAID_SECRET
from config import PLAID_PUBLIC_KEY
from config import PLAID_ENVIRONMENT
from config import SHOW_ACH
from config import SHOW_THANKYOU_LISTS
from config import USE_RECAPTCHA
from config import DEFAULT_FREQUENCY
from salesforce import add_customer_and_charge
from salesforce import update_account
from salesforce import get_opportunity
from salesforce import get_recurring
from salesforce import get_campaign
from salesforce import get_report
from salesforce import change_donation_status
from salesforce import update_donation_object
from app_celery import make_celery

import batch

from pprint import pprint

app = Flask(__name__)
#app.wsgi_app = ProxyFix(app.wsgi_app, num_proxies=1)
limiter = Limiter(
    app,
    key_func=get_ipaddr,
    default_limits=["200 per day", "25 per hour"]
)

if 'DYNO' in os.environ:
    sslify = SSLify(app) # only trigger SSLify if the app is running on Heroku

app.minnpost_root = MINNPOST_ROOT
app.secret_key = FLASK_SECRET_KEY
if USE_RECAPTCHA == "True":
    app.use_recaptcha = True
else:
    app.use_recaptcha = False
app.default_campaign_onetime = DEFAULT_CAMPAIGN_ONETIME
app.default_campaign_recurring = DEFAULT_CAMPAIGN_RECURRING
app.minnroast_campaign_id = MINNROAST_CAMPAIGN_ID
app.anniversary_party_campaign_id = ANNIVERSARY_PARTY_CAMPAIGN_ID
app.minnroast_opportunity_subtype = MINNROAST_OPPORTUNITY_SUBTYPE
app.anniversary_party_opportunity_subtype = ANNIVERSARY_PARTY_OPPORTUNITY_SUBTYPE
app.show_upsell = SHOW_UPSELL
app.allow_donation_notification = ALLOW_DONATION_NOTIFICATION
app.top_swag_minimum_level = TOP_SWAG_MINIMUM_LEVEL
app.separate_swag_minimum_level = SEPARATE_SWAG_MINIMUM_LEVEL
app.main_swag_minimum_level = MAIN_SWAG_MINIMUM_LEVEL
app.maximum_choose_multiple_level_int = MAXIMUM_CHOOSE_MULTIPLE_LEVEL_INT
app.show_thankyou_lists = SHOW_THANKYOU_LISTS

#app.wsgi_app = SassMiddleware(app.wsgi_app, {
#        'app': ('static/sass', 'static/css', 'static/css')
#        })

app.config.from_pyfile('config.py')
app.config.update(
        CELERY_ACCEPT_CONTENT=['pickle', 'json'],
        CELERY_ALWAYS_EAGER=False,
        CELERY_IMPORTS=('app', 'salesforce', 'batch'),
        )

app.site_key = recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"]
app.secret_key = recaptcha=app.config["RECAPTCHA_KEYS"]["secret_key"]
stripe.api_key = app.config['STRIPE_KEYS']['secret_key']

celery = make_celery(app)

db.init_app(app)

zone = timezone(TIMEZONE)

# Set up to send logging to stdout and Heroku forwards to Papertrail
LOGGING = {
    'handlers': {
        'console':{
            'level':'INFO',
            'class':'logging.StreamHandler',
            'strm': sys.stdout
        },
    }
}    

#if app.config['ENABLE_SENTRY']:
#    sentry = Sentry(app, dsn=app.config['SENTRY_DSN'])

ip_ban_list = IP_BAN_LIST

@app.before_request
def block_method():
    ip = request.environ.get('REMOTE_ADDR')
    if ip in ip_ban_list:
        print('error: block from ban list. IP is {}'.format(ip))
        abort(403)
    #if is_known_spam_ip(ip):
    #    print('error: IP {} found in stopforumspam database. Recaptcha was shown.'.format(ip))
    #    app.use_recaptcha = True

@app.route('/')
def minnpost_support():
    form = MinnPostForm()

    if request.args.get('amount'):
        amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
        if (amount).is_integer():
            amount_formatted = int(amount)
        else:
            amount_formatted = format(amount, ',.2f')
    else:
        amount = ''
        amount_formatted = ''

    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = ''

    frequency = request.args.get('frequency')
    if frequency is None:
        frequency = DEFAULT_FREQUENCY
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    frequency_label = get_frequency_label(frequency)

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''

    if amount != '':
        level = checkLevel(amount, frequency, yearly)
    else:
        level = 0

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    else:
        first_name = ''
    
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    else:
        last_name = ''
    
    if request.args.get('email'):
        email = request.args.get('email')
    else:
        email = ''

    return render_template(
        'minnpost-default.html',
        form=form, amount=amount_formatted, campaign=campaign, customer_id=customer_id,
        frequency=frequency, frequency_label=frequency_label,
        yearly=yearly,
        level=level,
        first_name = first_name,last_name = last_name, email=email,
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
        last_updated=dir_last_updated('static')
    )

# used at support.minnpost.com/give
@app.route('/give/')
def minnpost_form():

    form = MinnPostForm()

    if request.args.get('amount'):
        amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
        if (amount).is_integer():
            amount_formatted = int(amount)
        else:
            amount_formatted = format(amount, ',.2f')
    else:
        message = "The page you requested can't be found."
        return render_template('error.html', message=message)
    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = ''
    if request.args.get('show_ach'):
        show_ach = request.args.get('show_ach')
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = SHOW_ACH
    frequency = request.args.get('frequency')    
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    frequency_label = get_frequency_label(frequency)
    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''
    installments = 'None'
    openended_status = 'Open'
    level = checkLevel(amount, frequency, yearly)
    maximum_choose_multiple_int = int(app.maximum_choose_multiple_level_int['{}'.format(level.get('levelint', 0))])
    maximum_choose_multiple_level_text = num2words(int(app.maximum_choose_multiple_level_int['{}'.format(level.get('levelint', 0))]))

    if request.args.get('swag'):
        swag = request.args.get('swag')
    else:
        swag = ''

    if request.args.get('atlantic_subscription'):
        atlantic_subscription = request.args.get('atlantic_subscription')
        if atlantic_subscription != 'true':
            atlantic_subscription = ''
    else:
        atlantic_subscription = ''

    if request.args.get('atlantic_id'):
        atlantic_id = request.args.get('atlantic_id')
    else:
        atlantic_id = ''

    if request.args.get('nyt_subscription'):
        nyt_subscription = request.args.get('nyt_subscription')
    else:
        nyt_subscription = ''

    if request.args.get('decline_benefits'):
        decline_benefits = request.args.get('decline_benefits')
        if decline_benefits == 'true':
            swag = ''
            atlantic_subscription = ''
            atlantic_id = ''
            nyt_subscription = ''
    else:
        decline_benefits = ''

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    else:
        email = ''

    if request.args.get('billing_street'):
        billing_street = request.args.get('billing_street')
    else:
        billing_street = ''

    if request.args.get('billing_city'):
        billing_city = request.args.get('billing_city')
    else:
        billing_city = ''

    if request.args.get('billing_state'):
        billing_state = request.args.get('billing_state')
    else:
        billing_state = ''

    if request.args.get('billing_zip'):
        billing_zip = request.args.get('billing_zip')
    else:
        billing_zip = ''

    if request.args.get('billing_country'):
        billing_country = request.args.get('billing_country')
    else:
        billing_country = ''

    fees = calculate_amount_fees(amount, 'visa')

    atlantic_id_url = ''
    if atlantic_id != '':
        atlantic_id_url = '&amp;' + atlantic_id
    
    step_one_url = f'{app.minnpost_root}/support/?amount={amount_formatted}&amp;frequency={frequency}&amp;campaign={campaign}&amp;customer_id={customer_id}&amp;swag={swag}&amp;atlantic_subscription={atlantic_subscription}{atlantic_id_url}&amp;nyt_subscription={nyt_subscription}&amp;decline_benefits={decline_benefits}'

    return render_template(
        'minnpost-form.html',
        form=form, amount=amount_formatted, campaign=campaign, customer_id=customer_id,
        frequency=frequency, installments=installments, frequency_label=frequency_label,
        openended_status=openended_status,
        yearly=yearly,
        level=level,
        swag=swag, atlantic_subscription=atlantic_subscription, atlantic_id=atlantic_id, nyt_subscription=nyt_subscription, decline_benefits=decline_benefits,
        first_name = first_name,last_name = last_name, email=email,
        billing_street = billing_street, billing_city = billing_city, billing_state=billing_state, billing_zip=billing_zip, billing_country=billing_country,
        fees = fees,
        show_upsell = app.show_upsell, allow_donation_notification = app.allow_donation_notification,
        top_swag_minimum_level = app.top_swag_minimum_level,
        separate_swag_minimum_level = app.separate_swag_minimum_level,
        main_swag_minimum_level = app.main_swag_minimum_level,
        show_thankyou_lists = app.show_thankyou_lists, maximum_choose_multiple_int = maximum_choose_multiple_int, maximum_choose_multiple_level_text = maximum_choose_multiple_level_text,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, last_updated=dir_last_updated('static'),
        minnpost_root = app.minnpost_root, step_one_url = step_one_url,
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )


# get the current state of a campaign by loading the report
# called by ajax
@app.route('/campaign-report/')
@cross_origin()
def campaign_report():

    if request.args.get('report_id'):
        report_id = request.args.get('report_id')
    else:
        report_id = ''

    if request.args.get('campaign_id'):
        campaign_id = request.args.get('campaign_id')
    else:
        campaign_id = ''

    if request.args.get('goal'):
        goal = request.args.get('goal')
    else:
        goal = 0
        if campaign_id != '':
            campaign_result = get_campaign(campaign_id)
            if 'campaign' in campaign_result:
                campaign = campaign_result['campaign']
                if campaign != []:
                    goal = campaign['ExpectedRevenue']

    if request.args.get('clear_cache'):
        clear_cache = request.args.get('clear_cache')
        if clear_cache == 'false':
            clear_cache = False
        else:
            clear_cache = True
    else:
        clear_cache = False

    if report_id != '':
        report_result = get_report(report_id, True, clear_cache)

        if report_result['report']['attributes']['status'] == 'Success':
            report = report_result['report']
            if 'factMap' in report:
                for key,value in report['factMap'].items():
                    if value['aggregates']:
                        success = True
                        value_opportunities = value['aggregates'][1]['value']
                        break
                    else:
                        success = False
                        value_opportunities = 0
            else:
                success = False
                value_opportunities = 0
        else:
            success = False
            value_opportunities = 0
    else:
        success = False
        value_opportunities = 0

    percent_complete = '{percent:.2%}'.format(percent=value_opportunities/goal).rstrip('%')

    if value_opportunities != 0:
        value_opportunities = float(value_opportunities)

    if goal != 0:
        goal = float(goal)

    if goal == 0 or value_opportunities == 0:
        percent_complete = '0.0'

    ret_data = {'success': success, 'value_opportunities': value_opportunities, 'goal': goal, 'percent_complete': percent_complete }
    return jsonify(ret_data)


# used at support.minnpost.com/minnpost-advertising
@app.route('/minnpost-advertising/')
def minnpost_advertising_form():

    form = MinnPostForm()

    now = datetime.now()
    year = now.year

    if request.args.get('amount'):
        amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
        if (amount).is_integer():
            amount_formatted = int(amount)
        else:
            amount_formatted = format(amount, ',.2f')
    else:
        amount = ''
        amount_formatted = ''

    if request.args.get('invoice'):
        invoice = request.args.get('invoice')
    else:
        invoice = ''

    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = ADVERTISING_CAMPAIGN_ID

    show_ach = True

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''

    if request.args.get('opp_type'):
        opp_type = request.args.get('opp_type')
    else:
        opp_type = 'Sales'

    if request.args.get('opp_subtype'):
        opp_subtype = request.args.get('opp_subtype')
    else:
        opp_subtype = 'Sales: Advertising'

    if request.args.get('organization'):
        organization = request.args.get('organization')
    else:
        organization = ''

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    else:
        email = ''

    return render_template(
        'minnpost-advertising.html',
        form=form, amount=amount_formatted, invoice=invoice, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        organization=organization, first_name = first_name,last_name = last_name, email=email,
        show_ach=show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )

# used at support.minnpost.com/minnroast-sponsorship
@app.route('/minnroast-sponsorship/')
def minnroast_sponsorship_form():
    full_url = url_for('minnroast_patron_form', **request.args)
    return redirect(full_url)


# used at support.minnpost.com/minnroast-patron/
@app.route('/minnroast-patron/')
def minnroast_patron_form():

    form = MinnPostForm()

    redirect_url = 'minnroast-patron-thanks'

    now = datetime.now()
    year = now.year

    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = MINNROAST_CAMPAIGN_ID

    show_ach = True

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''

    if request.args.get('opp_type'):
        opp_type = request.args.get('opp_type')
    else:
        opp_type = 'Sponsorship'

    if request.args.get('opp_subtype'):
        opp_subtype = request.args.get('opp_subtype')
    else:
        opp_subtype = MINNROAST_OPPORTUNITY_SUBTYPE

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    else:
        email = ''
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''
    return render_template(
        'minnroast-patron.html',
        form=form, year=year, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )

# used at support.minnpost.com/minnroast-pledge
@app.route('/minnroast-pledge/')
def minnroast_pledge_form():
    full_url = url_for('minnpost_pledge_payment', **request.args)
    return redirect(full_url)


# used at support.minnpost.com/pledge-payment
@app.route('/pledge-payment/')
def minnpost_pledge_payment():

    form = MinnPostForm()

    confirm_url = '/pledge-confirm/'
    redirect_url = 'pledge-thanks'

    now = datetime.now()
    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    year = now.year

    if request.args.get('opportunity'):
        opp_id = request.args.get('opportunity')
        recurring_id = ''
        recurring = []
        try:
            result = get_opportunity(opp_id)
            opportunity = result['opportunity']

            amount = float(opportunity['Amount'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = opportunity['CampaignId']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    elif request.args.get('recurring'):
        recurring_id = request.args.get('recurring')
        opp_id = ''
        opportunity = []
        try:
            result = get_recurring(recurring_id)
            recurring = result['recurring']
            amount = float(recurring['npe03__Amount__c'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = recurring['npe03__Recurring_Donation_Campaign__c']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    else:
        opp_id = ''
        recurring_id = ''
        opportunity = []
        recurring = []

        if request.args.get('amount'):
            amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
        else:
            amount_formatted = ''

        if request.args.get('campaign'):
            campaign = request.args.get('campaign')
        else:
            campaign = ''

    if request.args.get('show_ach'):
        show_ach = request.args.get('show_ach')
        if show_ach == 'false':
            show_ach = False
        else:
            show_ach = True
    else:
        show_ach = True

    stage = ''
    if 'StageName' in opportunity and opportunity['StageName'] is not None:
        stage = 'Pledged'

    close_date = ''
    if 'CloseDate' in opportunity and opportunity['CloseDate'] is not None:
        three_days_ago = (datetime.now(tz=zone) - timedelta(days=3)).strftime('%Y-%m-%d')
        if opportunity['CloseDate'] <= three_days_ago:
            close_date = today
        else:
            close_date = opportunity['CloseDate']

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
    elif 'Stripe_Customer_Id__c' in recurring and recurring['Stripe_Customer_Id__c'] is not None:
        customer_id = recurring['Stripe_Customer_Id__c']
    else:
        customer_id = ''

    if request.args.get('pledge'):
        pledge = request.args.get('pledge')
    elif 'MRpledge_com_ID__c' in opportunity and opportunity['MRpledge_com_ID__c'] is not None:
        pledge = opportunity['MRpledge_com_ID__c']
    else:
        pledge = ''

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    elif 'Donor_first_name__c' in opportunity and opportunity['Donor_first_name__c'] is not None:
        first_name = opportunity['Donor_first_name__c']
    elif 'Donor_first_name__c' in recurring and recurring['Donor_first_name__c'] is not None:
        first_name = recurring['Donor_first_name__c']
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    elif 'Donor_last_name__c' in opportunity and opportunity['Donor_last_name__c'] is not None:
        last_name = opportunity['Donor_last_name__c']
    elif 'Donor_last_name__c' in recurring and recurring['Donor_last_name__c'] is not None:
        last_name = recurring['Donor_last_name__c']
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    elif 'Donor_e_mail__c' in opportunity and opportunity['Donor_e_mail__c'] is not None:
        email = opportunity['Donor_e_mail__c']
    elif 'Donor_e_mail__c' in recurring and recurring['Donor_e_mail__c'] is not None:
        email = recurring['Donor_e_mail__c']
    else:
        email = ''
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''

    show_amount_field = True
    title = 'MinnPost | Pledge Payment'
    #if amount_formatted != '':
    #    heading = '${} Donation for Election Coverage'.format(amount_formatted)
    #else:
        #heading = 'Recurring Donation Update'
    heading = 'MinnPost Pledge Payment'
    summary = 'Thank you for being a loyal supporter of MinnPost. Please fill out the fields below to fulfill your pledge payment for MinnPost. If you have any questions, please email Tanner Curl at <a href="mailto:tcurl@minnpost.com">tcurl@minnpost.com</a>.'
    hide_comments = True
    hide_display = True
    button = 'Update your Donation'

    description = 'MinnPost Pledge Payment'
    allow_additional = False

    return render_template(
        'minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, pledge=pledge, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, campaign=campaign, customer_id=customer_id, hide_comments=hide_comments, hide_display=hide_display,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        stage=stage, close_date=close_date,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )


# used at support.minnpost.com/pledge-payment
@app.route('/donate/')
def minnpost_prefill_donate():

    form = MinnPostForm()

    confirm_url = '/donate-confirm/'
    redirect_url = 'donate-thanks'

    now = datetime.now()
    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    year = now.year

    if request.args.get('opportunity'):
        opp_id = request.args.get('opportunity')
        recurring_id = ''
        recurring = []
        try:
            result = get_opportunity(opp_id)
            opportunity = result['opportunity']

            amount = float(opportunity['Amount'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = opportunity['CampaignId']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    elif request.args.get('recurring'):
        recurring_id = request.args.get('recurring')
        opp_id = ''
        opportunity = []
        try:
            result = get_recurring(recurring_id)
            recurring = result['recurring']
            amount = float(recurring['npe03__Amount__c'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = recurring['npe03__Recurring_Donation_Campaign__c']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    else:
        opp_id = ''
        recurring_id = ''
        opportunity = []
        recurring = []

        if request.args.get('amount'):
            amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
        else:
            amount_formatted = ''

        if request.args.get('campaign'):
            campaign = request.args.get('campaign')
        else:
            campaign = ''

    if request.args.get('show_ach'):
        show_ach = request.args.get('show_ach')
        if show_ach == 'false':
            show_ach = False
        else:
            show_ach = True
    else:
        show_ach = True

    stage = ''
    if 'StageName' in opportunity and opportunity['StageName'] is not None:
        stage = 'Pledged'

    close_date = ''
    if 'CloseDate' in opportunity and opportunity['CloseDate'] is not None:
        three_days_ago = (datetime.now(tz=zone) - timedelta(days=3)).strftime('%Y-%m-%d')
        if opportunity['CloseDate'] <= three_days_ago:
            close_date = today
        else:
            close_date = opportunity['CloseDate']

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
    elif 'Stripe_Customer_Id__c' in recurring and recurring['Stripe_Customer_Id__c'] is not None:
        customer_id = recurring['Stripe_Customer_Id__c']
    else:
        customer_id = ''

    if request.args.get('pledge'):
        pledge = request.args.get('pledge')
    elif 'MRpledge_com_ID__c' in opportunity and opportunity['MRpledge_com_ID__c'] is not None:
        pledge = opportunity['MRpledge_com_ID__c']
    else:
        pledge = ''

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    elif 'Donor_first_name__c' in opportunity and opportunity['Donor_first_name__c'] is not None:
        first_name = opportunity['Donor_first_name__c']
    elif 'Donor_first_name__c' in recurring and recurring['Donor_first_name__c'] is not None:
        first_name = recurring['Donor_first_name__c']
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    elif 'Donor_last_name__c' in opportunity and opportunity['Donor_last_name__c'] is not None:
        last_name = opportunity['Donor_last_name__c']
    elif 'Donor_last_name__c' in recurring and recurring['Donor_last_name__c'] is not None:
        last_name = recurring['Donor_last_name__c']
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    elif 'Donor_e_mail__c' in opportunity and opportunity['Donor_e_mail__c'] is not None:
        email = opportunity['Donor_e_mail__c']
    elif 'Donor_e_mail__c' in recurring and recurring['Donor_e_mail__c'] is not None:
        email = recurring['Donor_e_mail__c']
    else:
        email = ''
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''

    if request.args.get('billing_street'):
        billing_street = request.args.get('billing_street')
    elif 'Donor_address_line_1__c' in opportunity and opportunity['Donor_address_line_1__c'] is not None:
        billing_street = opportunity['Donor_address_line_1__c']
    elif 'Donor_address_line_1__c' in recurring and recurring['Donor_address_line_1__c'] is not None:
        billing_street = recurring['Donor_address_line_1__c']
    else:
        billing_street = ''
    if request.args.get('billing_city'):
        billing_city = request.args.get('billing_city')
    elif 'Donor_city__c' in opportunity and opportunity['Donor_city__c'] is not None:
        billing_city = opportunity['Donor_city__c']
    elif 'Donor_city__c' in recurring and recurring['Donor_city__c'] is not None:
        billing_city = recurring['Donor_city__c']
    else:
        billing_city = ''
    if request.args.get('billing_state'):
        billing_state = request.args.get('billing_state')
    elif 'Donor_state__c' in opportunity and opportunity['Donor_state__c'] is not None:
        billing_state = opportunity['Donor_state__c']
    elif 'Donor_state__c' in recurring and recurring['Donor_state__c'] is not None:
        billing_state = recurring['Donor_state__c']
    else:
        billing_state = ''
    if request.args.get('billing_zip'):
        billing_zip = request.args.get('billing_zip')
    elif 'Donor_ZIP__c' in opportunity and opportunity['Donor_ZIP__c'] is not None:
        billing_zip = opportunity['Donor_ZIP__c']
    elif 'Donor_ZIP__c' in recurring and recurring['Donor_ZIP__c'] is not None:
        billing_zip = recurring['Donor_ZIP__c']
    else:
        billing_zip = ''
    if request.args.get('billing_country'):
        billing_country = request.args.get('billing_country')
    elif 'Donor_country__c' in opportunity and opportunity['Donor_country__c'] is not None:
        billing_country = opportunity['Donor_country__c']
    elif 'Donor_country__c' in recurring and recurring['Donor_country__c'] is not None:
        billing_country = recurring['Donor_country__c']
    else:
        billing_country = ''

    show_amount_field = True
    title = 'MinnPost | Donation'
    #if amount_formatted != '':
    #    heading = '${} Donation for Election Coverage'.format(amount_formatted)
    #else:
        #heading = 'Recurring Donation Update'
    heading = 'MinnPost Donation'
    summary = 'Thank you for supporting MinnPost’s nonprofit newsroom. If you have any questions, please email Tanner Curl at <a href="mailto:tcurl@minnpost.com">tcurl@minnpost.com</a>.'
    hide_comments = True
    hide_display = True
    button = 'Make Your Donation'

    description = 'MinnPost Donation'
    allow_additional = False

    return render_template(
        'minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, pledge=pledge, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, campaign=campaign, customer_id=customer_id, hide_comments=hide_comments, hide_display=hide_display,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        billing_street = billing_street, billing_city = billing_city, billing_state=billing_state, billing_zip=billing_zip, billing_country=billing_country,
        additional_donation = additional_donation,
        stage=stage, close_date=close_date,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )


# used at support.minnpost.com/recurring-donation-update
@app.route('/recurring-donation-update/')
def minnpost_recurring_donation_update_form():
    full_url = url_for('minnpost_donation_update_form', **request.args)
    return redirect(full_url)


# used at support.minnpost.com/donation-update
@app.route('/donation-update/')
def minnpost_donation_update_form():

    form = MinnPostForm()

    confirm_url = '/donation-update-confirm/'
    redirect_url = 'donation-update-thanks'

    now = datetime.now()
    today = datetime.now(tz=zone).strftime('%Y-%m-%d')
    year = now.year

    if request.args.get('opportunity'):
        opp_id = request.args.get('opportunity')
        recurring_id = ''
        frequency = ''
        frequency_label = ''
        recurring = []
        show_frequency_field = False
        try:
            result = get_opportunity(opp_id)
            opportunity = result['opportunity']

            amount = float(opportunity['Amount'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = opportunity['CampaignId']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    elif request.args.get('recurring'):
        recurring_id = request.args.get('recurring')
        opp_id = ''
        opportunity = []
        show_frequency_field = True
        try:
            result = get_recurring(recurring_id)
            recurring = result['recurring']
            amount = float(recurring['npe03__Amount__c'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')

            if request.args.get('frequency'):
                frequency = request.args.get('frequency')
            else:
                frequency = recurring['npe03__Installment_Period__c'].lower()
            frequency_label = get_frequency_label(frequency)
            campaign = recurring['npe03__Recurring_Donation_Campaign__c']

        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    else:
        opp_id = ''
        recurring_id = ''
        opportunity = []
        recurring = []

        if request.args.get('amount'):
            amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
        else:
            amount_formatted = ''

        if request.args.get('campaign'):
            campaign = request.args.get('campaign')
        else:
            campaign = ''

    if request.args.get('amount'):
        amount = float(re.sub('[^\d\.]','',request.args.get('amount')))
        if (amount).is_integer():
            amount_formatted = int(amount)
        else:
            amount_formatted = format(amount, ',.2f')

    if request.args.get('show_ach'):
        show_ach = request.args.get('show_ach')
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = SHOW_ACH

    stage = ''
    if 'StageName' in opportunity and opportunity['StageName'] is not None:
        if 'Failed' == opportunity['StageName']:
            stage = 'Pledged'

    close_date = ''
    if 'CloseDate' in opportunity and opportunity['CloseDate'] is not None:
        three_days_ago = (datetime.now(tz=zone) - timedelta(days=3)).strftime('%Y-%m-%d')
        if opportunity['CloseDate'] <= three_days_ago:
            close_date = today
        else:
            close_date = opportunity['CloseDate']

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
    elif 'Stripe_Customer_Id__c' in recurring and recurring['Stripe_Customer_Id__c'] is not None:
        customer_id = recurring['Stripe_Customer_Id__c']
    else:
        customer_id = ''

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    elif 'Donor_first_name__c' in opportunity and opportunity['Donor_first_name__c'] is not None:
        first_name = opportunity['Donor_first_name__c']
    elif 'Donor_first_name__c' in recurring and recurring['Donor_first_name__c'] is not None:
        first_name = recurring['Donor_first_name__c']
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    elif 'Donor_last_name__c' in opportunity and opportunity['Donor_last_name__c'] is not None:
        last_name = opportunity['Donor_last_name__c']
    elif 'Donor_last_name__c' in recurring and recurring['Donor_last_name__c'] is not None:
        last_name = recurring['Donor_last_name__c']
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    elif 'Donor_e_mail__c' in opportunity and opportunity['Donor_e_mail__c'] is not None:
        email = opportunity['Donor_e_mail__c']
    elif 'Donor_e_mail__c' in recurring and recurring['Donor_e_mail__c'] is not None:
        email = recurring['Donor_e_mail__c']
    else:
        email = ''

    if request.args.get('billing_street'):
        billing_street = request.args.get('billing_street')
    elif 'Donor_address_line_1__c' in opportunity and opportunity['Donor_address_line_1__c'] is not None:
        billing_street = opportunity['Donor_address_line_1__c']
    elif 'Donor_address_line_1__c' in recurring and recurring['Donor_address_line_1__c'] is not None:
        billing_street = recurring['Donor_address_line_1__c']
    else:
        billing_street = ''
    if request.args.get('billing_city'):
        billing_city = request.args.get('billing_city')
    elif 'Donor_city__c' in opportunity and opportunity['Donor_city__c'] is not None:
        billing_city = opportunity['Donor_city__c']
    elif 'Donor_city__c' in recurring and recurring['Donor_city__c'] is not None:
        billing_city = recurring['Donor_city__c']
    else:
        billing_city = ''
    if request.args.get('billing_state'):
        billing_state = request.args.get('billing_state')
    elif 'Donor_state__c' in opportunity and opportunity['Donor_state__c'] is not None:
        billing_state = opportunity['Donor_state__c']
    elif 'Donor_state__c' in recurring and recurring['Donor_state__c'] is not None:
        billing_state = recurring['Donor_state__c']
    else:
        billing_state = ''
    if request.args.get('billing_zip'):
        billing_zip = request.args.get('billing_zip')
    elif 'Donor_ZIP__c' in opportunity and opportunity['Donor_ZIP__c'] is not None:
        billing_zip = opportunity['Donor_ZIP__c']
    elif 'Donor_ZIP__c' in recurring and recurring['Donor_ZIP__c'] is not None:
        billing_zip = recurring['Donor_ZIP__c']
    else:
        billing_zip = ''
    if request.args.get('billing_country'):
        billing_country = request.args.get('billing_country')
    elif 'Donor_country__c' in opportunity and opportunity['Donor_country__c'] is not None:
        billing_country = opportunity['Donor_country__c']
    elif 'Donor_country__c' in recurring and recurring['Donor_country__c'] is not None:
        billing_country = recurring['Donor_country__c']
    else:
        billing_country = ''

    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''

    if 'Stripe_Agreed_to_pay_fees__c' in opportunity and opportunity['Stripe_Agreed_to_pay_fees__c'] is not None:
        pay_fees = opportunity['Stripe_Agreed_to_pay_fees__c']
    elif 'Stripe_Agreed_to_pay_fees__c' in recurring and recurring['Stripe_Agreed_to_pay_fees__c'] is not None:
        pay_fees = recurring['Stripe_Agreed_to_pay_fees__c']
    else:
        pay_fees = False

    show_amount_field = True
    title = 'MinnPost | Donation Update'
    #if amount_formatted != '':
    #    heading = '${} Donation for Election Coverage'.format(amount_formatted)
    #else:
        #heading = 'Recurring Donation Update'
    heading = 'Update your donation'
    summary = 'Thank you for your support of MinnPost. Please fill out the fields to update your donation.'
    hide_comments = True
    hide_display = True
    button = 'Update your Donation'

    description = 'Donation Update'
    allow_additional = False

    update_default_source = True

    return render_template(
        'minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, frequency=frequency, frequency_label=frequency_label, show_frequency_field=show_frequency_field, campaign=campaign, customer_id=customer_id, hide_comments=hide_comments, hide_display=hide_display,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        billing_street = billing_street, billing_city = billing_city, billing_state=billing_state, billing_zip=billing_zip, billing_country=billing_country,
        additional_donation = additional_donation,
        pay_fees = pay_fees, update_default_source = update_default_source,
        stage=stage, close_date=close_date,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )


# used at support.minnpost.com/donation-cancel
@app.route('/donation-cancel/')
def minnpost_donation_cancel_form():

    form = MinnPostForm()

    confirm_url = '/donation-cancel-confirm/'
    redirect_url = 'donation-cancel-thanks'

    now = datetime.now()
    year = now.year

    if request.args.get('opportunity'):
        sf_type = 'opportunity'
        opp_id = request.args.get('opportunity')
        sf_id = opp_id
        recurring_id = ''
        frequency = ''
        frequency_label = ''
        recurring = []
        try:
            result = get_opportunity(opp_id)
            opportunity = result['opportunity']
            amount = float(opportunity['Amount'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = opportunity['CampaignId']
            close_date = opportunity['CloseDate']
            
            close_date = datetime.strptime(close_date, '%Y-%m-%d').strftime('%B %-d, %Y')

            title = 'MinnPost | Cancel Donation'
            description = 'Donation Cancellation'
            heading = 'Cancel Donation'
            summary = 'Thanks for your support of MinnPost. To confirm cancellation of your ${} donation scheduled for {}, click the button.'.format(amount_formatted, close_date)
        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []
    elif request.args.get('recurring'):
        sf_type = 'recurring_donation'
        recurring_id = request.args.get('recurring')
        sf_id = recurring_id
        opp_id = ''
        opportunity = []
        try:
            result = get_recurring(recurring_id)
            recurring = result['recurring']
            amount = float(recurring['npe03__Amount__c'])
            if (amount).is_integer():
                amount_formatted = int(amount)
            else:
                amount_formatted = format(amount, ',.2f')
            campaign = recurring['npe03__Recurring_Donation_Campaign__c']
            if request.args.get('frequency'):
                frequency = request.args.get('frequency')
            else:
                frequency = recurring['npe03__Installment_Period__c'].lower()
            frequency_label = get_frequency_label(frequency)
            title = 'MinnPost | Cancel Recurring Donation'
            heading = 'Cancel Recurring Donation'
            description = 'Recurring Donation Cancellation'
            summary = 'Thanks for your support of MinnPost. To confirm cancellation of your ${} {} donation, click the button.'.format(amount_formatted, frequency)
        except:
            opp_id = ''
            recurring_id = ''
            opportunity = []
            recurring = []

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    elif 'Donor_first_name__c' in opportunity and opportunity['Donor_first_name__c'] is not None:
        first_name = opportunity['Donor_first_name__c']
    elif 'Donor_first_name__c' in recurring and recurring['Donor_first_name__c'] is not None:
        first_name = recurring['Donor_first_name__c']
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    elif 'Donor_last_name__c' in opportunity and opportunity['Donor_last_name__c'] is not None:
        last_name = opportunity['Donor_last_name__c']
    elif 'Donor_last_name__c' in recurring and recurring['Donor_last_name__c'] is not None:
        last_name = recurring['Donor_last_name__c']
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    elif 'Donor_e_mail__c' in opportunity and opportunity['Donor_e_mail__c'] is not None:
        email = opportunity['Donor_e_mail__c']
    elif 'Donor_e_mail__c' in recurring and recurring['Donor_e_mail__c'] is not None:
        email = recurring['Donor_e_mail__c']
    else:
        email = ''

    show_amount_field = True
    hide_comments = True
    hide_display = True
    button = 'Confirm your cancellation'

    return render_template(
        'minnpost-cancel.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, campaign=campaign, hide_comments=hide_comments, hide_display=hide_display,
        sf_type=sf_type, sf_id=sf_id,
        first_name = first_name,last_name = last_name, email=email,
        minnpost_root = app.minnpost_root,
        key = app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )

# used at support.minnpost.com/anniversary-sponsorship
@app.route('/anniversary-sponsorship/')
def anniversary_sponsorship_form():
    full_url = url_for('anniversary_patron_form', **request.args)
    return redirect(full_url)


# used at support.minnpost.com/anniversary-patron
@app.route('/anniversary-patron/')
def anniversary_patron_form():

    form = MinnPostForm()

    redirect_url = 'anniversary-patron-thanks'

    now = datetime.now()
    year = now.year

    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = ANNIVERSARY_PARTY_CAMPAIGN_ID

    show_ach = True

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''

    if request.args.get('opp_type'):
        opp_type = request.args.get('opp_type')
    else:
        opp_type = 'Sponsorship'

    if request.args.get('opp_subtype'):
        opp_subtype = request.args.get('opp_subtype')
    else:
        opp_subtype = ANNIVERSARY_PARTY_OPPORTUNITY_SUBTYPE

    if request.args.get('firstname'):
        first_name = request.args.get('firstname')
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    else:
        email = ''
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''
    return render_template(
        'anniversary-patron.html',
        form=form, year=year, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY, minnpost_root = app.minnpost_root, last_updated=dir_last_updated('static'),
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )

# generalized error with a specific template
@app.route('/error/')
def error():
    message = "Something went wrong!"
    return render_template(
        'error.html',
        message=message,
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )

# generalized error with a specific template
@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template(
        'error.html',
        message=message,
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
    )


def is_human(captcha_response):
    """ Validating recaptcha response from google server.
        Returns True captcha test passed for the submitted form 
        else returns False.
    """
    secret = app.config["RECAPTCHA_KEYS"]["secret_key"]
    payload = {'response':captcha_response, 'secret':secret}
    response = requests.post("https://www.google.com/recaptcha/api/siteverify", payload)
    response_text = json.loads(response.text)
    return response_text['success']


## this is a minnpost url. use this when sending a request to plaid
## if successful, this returns the access token and bank account token for stripe from plaid
@app.route('/plaid_token/', methods=['POST'])
def plaid_token():

    form = MinnPostForm(request.form)

    public_token = request.form['public_token']
    account_id = request.form['account_id']

    client = Client(client_id=PLAID_CLIENT_ID, secret=PLAID_SECRET, public_key=PLAID_PUBLIC_KEY, environment=PLAID_ENVIRONMENT)
    exchange_token_response = client.Item.public_token.exchange(public_token)
    access_token = exchange_token_response['access_token']

    stripe_response = client.Processor.stripeBankAccountTokenCreate(access_token, account_id)

    if 'stripe_bank_account_token' in stripe_response:
        response = stripe_response
    else:
        response = {'error' : 'We were unable to connect to your account. Please try again.'}
    
    return jsonify(response)


# used to calculate transaction fees
# called by ajax
@app.route('/calculate-fees/', methods=['POST'])
def calculate_fees():

    amount = float(request.form['amount'])
    fees = ''
    
    # get fee amount to send to stripe; user does not see this
    if 'payment_type' in request.form:
        payment_type = request.form['payment_type']
        fees = calculate_amount_fees(amount, payment_type)

    ret_data = {"fees": fees}
    return jsonify(ret_data)


## this is a minnpost url. when submitting a charge, start with ajax, then submit to the /thanks or whatever other url
@app.route('/charge_ajax/', methods=['POST'])
def charge_ajax():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    #next_page_template = 'thanks.html'

    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')
    customer_id = request.form['customer_id']
    if 'opp_id' in form:
        opp_id = request.form['opp_id']

    if 'update_default_source' in request.form:
        update_default_source = True
    else:
        update_default_source = False

    frequency = request.form['recurring']
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    level = checkLevel(amount, frequency, yearly)
    frequency_label = get_frequency_label(frequency)

    payment_type = ''
    if 'pay_fees' in request.form:
        pay_fees = request.form['pay_fees']
        if pay_fees == '1':
            # get fee amount to send to stripe; user does not see this
            if 'payment_type' in request.form:
                payment_type = request.form['payment_type']
                session['payment_type'] = payment_type

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email_is_valid = validate_email(email)
    email_is_spam = is_known_spam_email(email)

    stripe_card = ''
    stripe_bank_account = ''

    is_human = True

    if app.use_recaptcha == True:
        is_human = False
        captcha_response = request.form['g-recaptcha-response']
        if is_human(captcha_response):
            is_human = True

    if is_human is True and email_is_valid and email_is_spam is False and customer_id is '': # this is a new customer
    # if it is a new customer, assume they only have one payment method and it should be the default
        try:
            if 'stripeToken' in request.form:
                customer = stripe.Customer.create(
                    email=email,
                    card=request.form['stripeToken'] 
                )
                stripe_card = customer.default_source
            elif 'bankToken' in request.form:
                customer = stripe.Customer.create(
                    email=email,
                    source=request.form['bankToken']
                )
                stripe_bank_account = customer.default_source
            print('Create Stripe customer {} {} {} and charge amount {} with frequency {}'.format(email, first_name, last_name, amount_formatted, frequency))
        except stripe.error.CardError as e:
            # stripe returned an error on the credit card
            body = e.json_body
            print('Stripe returned a credit card error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            body = e.json_body
            print('Stripe returned a rate limit error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.InvalidRequestError as e:
            # Invalid parameters were supplied to Stripe's API
            body = e.json_body
            print('Stripe returned an invalid request error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            body = e.json_body
            print('Stripe returned an authentication error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            body = e.json_body
            print('There was a network error communicating with Stripe before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.StripeError as e:
            # Generic stripe error
            body = e.json_body
            print('There was a generic Stripe error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except Exception as e:
            body = e.json_body
            print('Stripe returned an unknown error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
    elif is_human is True and email_is_valid and email_is_spam is False and customer_id is not None and customer_id != '': # this is an existing customer
        customer = stripe.Customer.retrieve(customer_id)
        customer.email = email
        customer.save()
        # since this is an existing customer, add the current payment method to the list.
        # this does not change the default payment method.
        # todo: build a checkbox or something that lets users indicate that we should update their default method
        # maybe anytime someone changes a customer, it should change the default method.
        try:
            if update_default_source is True:
                if 'stripeToken' in request.form:
                    customer = stripe.Customer.modify(
                        customer_id,
                        card=request.form['stripeToken'] 
                    )
                    stripe_card = customer.default_source
                elif 'bankToken' in request.form:
                    customer = stripe.Customer.modify(
                        customer_id,
                        source=request.form['bankToken']
                    )
                    stripe_bank_account = customer.default_source
            else:
                if 'stripeToken' in request.form:
                    card = customer.sources.create(source=request.form['stripeToken'])
                    stripe_card = card.id
                elif 'bankToken' in request.form:
                    bank_account = customer.sources.create(source=request.form['bankToken'])
                    stripe_bank_account = bank_account.id
        except stripe.error.InvalidRequestError as e: # stripe returned a bank account error
            body = e.json_body
            error = body['error']
            if error['message'] == 'A bank account with that routing number and account number already exists for this customer.':
                # use the account they already have, since it is identical
                sources = customer.sources
                for source in sources:
                    if source.object == 'bank_account':
                        stripe_bank_account = source.id
                        #print('reuse the bank account already on the Stripe customer')
            else:
                print('Stripe returned an invalid request error before updating customer. It is {}'.format(error))
                return jsonify(errors=body)
        except stripe.error.CardError as e: # stripe returned an error on the credit card
            body = e.json_body
            print('Stripe returned a credit card error before updating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            body = e.json_body
            print('Stripe returned a rate limit error before creating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            body = e.json_body
            print('Stripe returned an authentication error before updating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            body = e.json_body
            print('There was a network error communicating with Stripe before updating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except stripe.error.StripeError as e:
            # Generic stripe error
            body = e.json_body
            print('There was a generic Stripe error before updating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except Exception as e:
            body = e.json_body
            print('Stripe returned an unknown error before updating customer: {} {} {} {} {}'.format(email, request.remote_addr, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        print('Existing customer: {} {} {} {}'.format(email, first_name, last_name, customer_id))
    elif email_is_spam is True: # email was a spammer
        print('Error: email found in spam database. {} {} {}; showed error'.format(email, first_name, last_name))        
        body = []
        message = 'Please ensure you have a valid email address. {} has been flagged as a possible spam email address.'.format(email)
        body.append({'field': 'email', 'message': message})
        return jsonify(errors=body)
    elif is_human is False:
        print('Error: recaptcha failed. {} {} {}; showed error'.format(email, first_name, last_name))        
        body = []
        message = 'Our system was unable to verify that you are a human. Please email members@minnpost.com for assistance.'
        body.append({'field': 'recaptcha', 'message': message})
        return jsonify(errors=body)
    else: # the email was invalid
        print('Error saving update for customer {} {} {}; showed error'.format(email, first_name, last_name))        
        body = []
        if email != '':
            message = 'Please enter a valid email address; {} is not valid.'.format(email)
        else:
            message = 'Your email address is required'
        body.append({'field': 'email', 'message': message})
        return jsonify(errors=body)
    if form.validate():
        # add a row to the heroku database so we can track it
        transaction = Transaction('NULL', 'NULL')
        db.session.add(transaction)
        db.session.commit()
        print('add a transaction show me the id. then do sf method.')
        print(transaction.id)
        flask_id = str(transaction.id)
        session['flask_id'] = flask_id
        print('session flask id is {}'.format(session['flask_id']))
        if frequency == 'one-time':
            session['sf_type'] = 'Opportunity'
        else:
            session['sf_type'] = 'npe03__Recurring_Donation__c'

        extra_values = {}

        # if we have a new source, add it to extra values
        if stripe_card != '':
            extra_values['stripe_card'] = stripe_card
        elif stripe_bank_account != '':
            extra_values['stripe_bank_account'] = stripe_bank_account

        # if we need to set the payment type before charging, add it to extra values
        if payment_type != '':
            extra_values['payment_type'] = payment_type

        # if we specify opportunity type and/or subtype, put it in the session
        if 'opp_type' in request.form:
            session['opp_type'] = request.form['opp_type']

            if request.form['opp_type'] == 'Sponsorship':
                if amount == 175:
                    fair_market_value = 50
                elif amount == 300:
                    fair_market_value = 100
                elif amount == 350:
                    fair_market_value = 100
                elif amount == 500:
                    fair_market_value = 100
                elif amount == 600:
                    fair_market_value = 200
                elif amount == 1200:
                    fair_market_value = 300
                elif amount == 1500:
                    fair_market_value = 300
                elif amount == 2400:
                    fair_market_value = 400
                elif amount == 3000:
                    fair_market_value = 400
                elif amount == 5000:
                    fair_market_value = 500
                elif amount == 8000:
                    fair_market_value = 600
                else:
                    fair_market_value = ''

                extra_values['fair_market_value'] = fair_market_value

            elif request.form['opp_type'] == 'Sales':
                if 'quantity' in request.form:              
                    quantity = int(request.form['quantity'])
                    #attendees = []
                    opportunity_attendees = ''
                    if quantity > 1:
                        for x in range(quantity):
                            attendee_id = x + 1
                            opportunity_attendees += request.form['attendee_name_' + str(attendee_id)] + ': ' + request.form['attendee_email_' + str(attendee_id)] + ';'

                            #attendee = {'name' : request.form['attendee_name_' + str(attendee_id)], 'email' : request.form['attendee_email_' + str(attendee_id)]}
                            #attendees.append(attendee)
                    elif quantity == 1:
                        opportunity_attendees += request.form['attendee_name_1'] + ': ' + request.form['attendee_email_1'] + ';'
                        #attendee = {'name' : request.form['attendee_name_1'], 'email' : request.form['attendee_email_1']}
                        #attendees.append(attendee)
                    #extra_values['attendees'] = attendees
                    extra_values['attendees'] = opportunity_attendees

        if 'opp_subtype' in request.form:
            opp_subtype = request.form['opp_subtype']
            session['opp_subtype'] = opp_subtype
            if opp_subtype == 'Sales: Advertising':
                fair_market_value = amount
                extra_values['invoice'] = request.form['invoice']
                extra_values['organization'] = request.form['organization']
            extra_values['fair_market_value'] = fair_market_value

        if 'additional_donation' in request.form:
            if request.form['additional_donation'] != '':
                additional_donation = float(request.form['additional_donation'])
                extra_values['additional_donation'] = additional_donation
                session['additional_donation'] = format(additional_donation, ',.2f')
            else:
                session['additional_donation'] = ''
        else:
            session['additional_donation'] = ''

        if 'quantity' in request.form:
            quantity = int(request.form['quantity'])
            extra_values['quantity'] = quantity
            session['quantity'] = quantity
        else:
            session['quantity'] = ''

        # this adds the contact and the opportunity to salesforce
        add_customer_and_charge.delay(form=request.form, customer=customer, flask_id=flask_id, extra_values=extra_values)
        print('Done with contact and opportunity {} {} {} for amount {} and frequency {}'.format(email, first_name, last_name, amount_formatted, frequency))
        # the payment type here won't work because it doesn't get sent to the method, but to the template       
        return render_template(
            'thanks.html',
            amount=amount_formatted, frequency=frequency, frequency_label=frequency_label, yearly=yearly, level=level,
            email=email, first_name=first_name, last_name=last_name,
            session=session, minnpost_root = app.minnpost_root,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
        )

        #body = transaction.id
        #return jsonify(body)
    else:
        print('donate form did not validate: error below')
        print(form.errors)

        body = []
        for field in form.errors:
            body.append({'field': field, 'message': form.errors[field]})
        return jsonify(errors=body)

        print('Form validation errors: {}'.format(form.errors))
        print('Did not validate form of customer {} {} {}'.format(email, first_name, last_name))
        #return render_template('error.html', message=message)
        body = {'error' : 'full', 'message' : 'We were unable to process your donation. Please try again.'}
        return jsonify(errors=body)


# this is a minnpost url. it gets called after successful response from stripe
@app.route('/thanks/', methods=['POST'])
def thanks():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')
    customer_id = request.form['customer_id']

    frequency = request.form['recurring']
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    level = checkLevel(amount, frequency, yearly)
    frequency_label = get_frequency_label(frequency)

    if 'pay_fees' in request.form:
        pay_fees = request.form['pay_fees']
        if pay_fees == '1':
            # get fee amount so the user can see it
            entry = {'Amount': amount, 'Stripe_Agreed_to_pay_fees__c': pay_fees, 'payment_type': session['payment_type'] }
            amount_plus_fees = amount_to_charge(entry)
            amount_formatted = format(amount_plus_fees / 100, ',.2f')

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email_is_valid = validate_email(email)
    email_is_spam = is_known_spam_email(email)

    captcha_response = request.form['g-recaptcha-response']
    if is_human(captcha_response):
        email_is_spam = False
    else:
        email_is_spam = True

    if email_is_spam is True:
        print('error: block from ban list. email is {}'.format(email))
        #app.use_recaptcha = True

    if form.validate():
        print('Done with stripe processing {} {} {} for amount {} and frequency {}'.format(email, first_name, last_name, amount_formatted, frequency))
        print('try to update account now')
        update_account.delay(form=request.form, account = {'levelint' : level.get('levelint', 0), 'level' : 'MinnPost {}'.format(level.get('level', '--None--').title())})
        return render_template(
            'thanks.html',
            amount=amount_formatted, frequency=frequency, frequency_label=frequency_label, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session, minnpost_root = app.minnpost_root, key = app.config['STRIPE_KEYS']['publishable_key'], last_updated=dir_last_updated('static')
        )
    else:
        print('ajax result donate form did not validate: error below')
        print(form.errors)
        message = "There was an issue saving your donation information."
        print('Error with stripe processing {} {} {}'.format(email, first_name, last_name))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
        )


# this is a minnpost url
@app.route('/confirm/', methods=['POST'])
def confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))

    flask_id = request.form['flask_id']
    sf_type = request.form['sf_type']
    #sf_id = session['sf_id']
    #sf_type = session['sf_type']

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'finish.html',
            session=session,
            key = app.config['STRIPE_KEYS']['publishable_key']
        )
    else:
        print('post-donate form did not validate: error below')
        print(form.errors)
        message = "there was an issue saving your preferences, but your donation was successful"
        print('Error with post-donation preferences {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )

# this is a minnpost url
@app.route('/minnpost-advertising-confirm/', methods=['POST'])
def minnpost_advertising_confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnpost-advertising/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-advertising form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-advertising form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )

# this is a minnpost url
@app.route('/minnroast-patron-confirm/', methods=['POST'])
def minnroast_patron_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnroast-patron/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-sponsorship form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-sponsorship form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )


# this is a minnpost url
@app.route('/pledge-confirm/', methods=['POST'])
def minnpost_pledge_confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnpost-minimal-form/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-update form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )


# this is a minnpost url
@app.route('/donate-confirm/', methods=['POST'])
def minnpost_donate_confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnpost-minimal-form/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-donate form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-update form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )


# this is a minnpost url
@app.route('/donation-update-confirm/', methods=['POST'])
def minnpost_donation_update_confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnpost-minimal-form/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-update form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )

# this is a minnpost url
@app.route('/donation-cancel-confirm/', methods=['POST'])
def minnpost_donation_cancel_confirm():
    sf_type = request.form['sf_type']
    sf_id = request.form['sf_id']
    # here we don't need any session info because all we do is tell them it worked
    result = change_donation_status.delay(object_name=sf_type, sf_id=sf_id, form=request.form)
    return render_template(
        'minnpost-cancel/finish.html',
        key=app.config['STRIPE_KEYS']['publishable_key'],
        recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
        use_recaptcha=app.use_recaptcha,
        last_updated=dir_last_updated('static')
    )


# this is a minnpost url
@app.route('/minnroast-pledge-confirm/', methods=['POST'])
def minnroast_pledge_confirm():

    form = ConfirmForm(request.form)

    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'minnpost-minimal-form/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-pledge form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )

# this is a minnpost url
@app.route('/anniversary-patron-confirm/', methods=['POST'])
def anniversary_patron_confirm():

    form = ConfirmForm(request.form)

    amount = float(request.form['amount'])
    if (amount).is_integer():
        amount_formatted = int(amount)
    else:
        amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template(
            'anniversary-patron/finish.html',
            amount=amount_formatted, session=session,
            key = app.config['STRIPE_KEYS']['publishable_key'],
            last_updated=dir_last_updated('static')
        )
    else:
        print('post-sponsorship form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-sponsorship form {} {}'.format(sf_type, flask_id))
        return render_template(
            'error.html',
            message=message,
            key=app.config['STRIPE_KEYS']['publishable_key'],
            recaptcha=app.config["RECAPTCHA_KEYS"]["site_key"],
            use_recaptcha=app.use_recaptcha,
            last_updated=dir_last_updated('static')
        )


# this is for apple pay verification through stripe
@app.route('/.well-known/apple-developer-merchantid-domain-association')
def apple_developer_domain_verification():
    return send_from_directory(app.static_folder, 'apple-developer-merchantid-domain-association');
    
# initialize
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)