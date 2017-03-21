import os
import sys
import re
from datetime import datetime

from flask import Flask, render_template, request, session, jsonify, json, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

from core import db
from models import Transaction

#from forms import DonateForm, MinnPostForm, ConfirmForm, TexasWeeklyForm
from forms import MinnPostForm, ConfirmForm
#from raven.contrib.flask import Sentry
from opbeat.contrib.flask import Opbeat
#from sassutils.wsgi import SassMiddleware # mp put this into grunt instead
import stripe
from validate_email import validate_email
from helpers import checkLevel, amount_to_charge

from flask_sslify import SSLify

from config import FLASK_SECRET_KEY
from config import DEFAULT_CAMPAIGN_ONETIME
from config import DEFAULT_CAMPAIGN_RECURRING
from config import MINNROAST_CAMPAIGN_ID
from config import ANNIVERSARY_PARTY_CAMPAIGN_ID
from config import SHOW_UPSELL
from config import ALLOW_DONATION_NOTIFICATION
from config import OPBEAT_ORGANIZATION_ID
from config import OPBEAT_APP_ID
from config import OPBEAT_SECRET_TOKEN

from config import EVENT_1_USE_PROMO_CODE
from config import EVENT_1_SINGLE_UNIT_PRICE
from config import EVENT_1_DISCOUNT_SINGLE_UNIT_PRICE
from config import EVENT_1_SINGLE_UNIT_FAIR_MARKET_VALUE
from config import EVENT_1_PROMO_CODE
from config import EVENT_1_CAMPAIGN_ID

from config import EVENT_2_USE_PROMO_CODE
from config import EVENT_2_SINGLE_UNIT_PRICE
from config import EVENT_2_DISCOUNT_SINGLE_UNIT_PRICE
from config import EVENT_2_SINGLE_UNIT_FAIR_MARKET_VALUE
from config import EVENT_2_PROMO_CODE
from config import EVENT_2_CAMPAIGN_ID

from config import ADVERTISING_CAMPAIGN_ID
from config import TOP_SWAG_MINIMUM_LEVEL
from config import SEPARATE_SWAG_MINIMUM_LEVEL
from config import MAIN_SWAG_MINIMUM_LEVEL
from config import PLAID_PUBLIC_KEY
from config import PLAID_ENVIRONMENT
from config import SHOW_ACH
from salesforce import add_customer_and_charge
from salesforce import get_opportunity
from salesforce import get_recurring
from salesforce import get_campaign
from salesforce import get_report
#from salesforce import add_tw_customer_and_charge
from salesforce import update_donation_object
from app_celery import make_celery

from plaid import get_bank_token

import batch

from pprint import pprint

app = Flask(__name__)

if 'DYNO' in os.environ:
    sslify = SSLify(app) # only trigger SSLify if the app is running on Heroku
    opbeat = Opbeat(app) # only trigger opbeat if the app is running on Heroku

app.secret_key = FLASK_SECRET_KEY
app.default_campaign_onetime = DEFAULT_CAMPAIGN_ONETIME
app.default_campaign_recurring = DEFAULT_CAMPAIGN_RECURRING
app.minnroast_campaign_id = MINNROAST_CAMPAIGN_ID
app.anniversary_party_campaign_id = ANNIVERSARY_PARTY_CAMPAIGN_ID
app.show_upsell = SHOW_UPSELL
app.allow_donation_notification = ALLOW_DONATION_NOTIFICATION
app.top_swag_minimum_level = TOP_SWAG_MINIMUM_LEVEL
app.separate_swag_minimum_level = SEPARATE_SWAG_MINIMUM_LEVEL
app.main_swag_minimum_level = MAIN_SWAG_MINIMUM_LEVEL

#app.wsgi_app = SassMiddleware(app.wsgi_app, {
#        'app': ('static/sass', 'static/css', 'static/css')
#        })

app.config.from_pyfile('config.py')
app.config.update(
        CELERY_ACCEPT_CONTENT=['pickle', 'json'],
        CELERY_ALWAYS_EAGER=False,
        CELERY_IMPORTS=('app', 'salesforce', 'batch'),
        )
stripe.api_key = app.config['STRIPE_KEYS']['secret_key']

celery = make_celery(app)

db.init_app(app)

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
    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''
    installments = 'None'
    openended_status = 'Open'
    level = checkLevel(amount, frequency, yearly)
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
    return render_template('minnpost-form.html', form=form, amount=amount_formatted, campaign=campaign, customer_id=customer_id,
        frequency=frequency, installments=installments,
        openended_status=openended_status,
        yearly=yearly,
        level=level,
        first_name = first_name,last_name = last_name, email=email,
        show_upsell = app.show_upsell, allow_donation_notification = app.allow_donation_notification,
        top_swag_minimum_level = app.top_swag_minimum_level,
        separate_swag_minimum_level = app.separate_swag_minimum_level,
        main_swag_minimum_level = app.main_swag_minimum_level,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# used at support.minnpost.com/event-register
@app.route('/event-register/')
def minnpost_event_form():
    form = MinnPostForm()

    if request.args.get('event'):
        event = request.args.get('event')
    else:
        event = '1'

    if event == '1':
        event_promo_code = EVENT_1_PROMO_CODE
        campaign_id = EVENT_1_CAMPAIGN_ID
        use_promo_code = EVENT_1_USE_PROMO_CODE
    elif event == '2':
        event_promo_code = EVENT_2_PROMO_CODE
        campaign_id = EVENT_2_CAMPAIGN_ID
        use_promo_code = EVENT_2_USE_PROMO_CODE    

    if request.args.get('campaign'):
        campaign_id = request.args.get('campaign')

    result = get_campaign(campaign_id)
    campaign = result['campaign']

    if request.args.get('show_ach'):
        show_ach = request.args.get('show_ach')
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = SHOW_ACH

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    else:
        customer_id = ''

    if request.args.get('promo_code'):
        promo_code = request.args.get('promo_code')
    else:
        promo_code = ''

    if request.args.get('opp_type'):
        opp_type = request.args.get('opp_type')
    else:
        opp_type = 'Sales'

    if request.args.get('opp_subtype'):
        opp_subtype = request.args.get('opp_subtype')
    else:
        opp_subtype = 'Sales: Tickets'

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
    if request.args.get('quantity'):
        quantity = int(request.args.get('quantity'))
    else:
        quantity = 1
    # possible we should create sf contacts for each attendee who is submitted

    if event == '1':
        single_unit_price = EVENT_1_SINGLE_UNIT_PRICE
        single_unit_fair_market_value = EVENT_1_SINGLE_UNIT_FAIR_MARKET_VALUE
        discount_single_unit_price = EVENT_1_DISCOUNT_SINGLE_UNIT_PRICE
    elif event == '2':
        single_unit_price = EVENT_2_SINGLE_UNIT_PRICE
        single_unit_fair_market_value = EVENT_2_SINGLE_UNIT_FAIR_MARKET_VALUE
        discount_single_unit_price = EVENT_2_DISCOUNT_SINGLE_UNIT_PRICE
    
    #print('total fair market value is {}'.format(quantity * single_unit_fair_market_value))
    if promo_code == event_promo_code:
        single_unit_price = discount_single_unit_price
    starting_amount = format(quantity * single_unit_price)

    return render_template('minnpost-events/form.html', form=form, event=event, use_promo_code=use_promo_code, campaign_id=campaign_id, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        promo_code=promo_code, event_promo_code=event_promo_code, additional_donation = additional_donation,
        quantity=quantity, single_unit_price = single_unit_price, starting_amount = starting_amount,
        show_ach=show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])

# used to validate event promo codes to assign users discount
# called by ajax
@app.route('/event-check-promo/', methods=['POST'])
def event_check_promo():

    if request.form['event']:
        event = request.form['event']
    else:
        event = '1'

    if event == '1':
        promo_code = EVENT_1_PROMO_CODE
        discount_single_unit_price = EVENT_1_DISCOUNT_SINGLE_UNIT_PRICE
        nodiscount_single_unit_price = EVENT_1_SINGLE_UNIT_PRICE
    elif event == '2':
        promo_code = EVENT_2_PROMO_CODE
        discount_single_unit_price = EVENT_2_DISCOUNT_SINGLE_UNIT_PRICE
        nodiscount_single_unit_price = EVENT_2_SINGLE_UNIT_PRICE
    
    sent_promo_code = request.form['promo_code']
    if sent_promo_code == promo_code:
        success = True
        single_unit_price = discount_single_unit_price
    else:
        success = False
        single_unit_price = nodiscount_single_unit_price
    ret_data = {"success": success, "single_unit_price": single_unit_price}
    return jsonify(ret_data)


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

    if value_opportunities != 0:
        value_opportunities = float(value_opportunities)

    if goal != 0:
        goal = float(goal)

    ret_data = {'success': success, 'value_opportunities': value_opportunities, 'goal': goal, 'percent_complete': '{percent:.2%}'.format(percent=value_opportunities/goal).rstrip('%') }
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

    return render_template('minnpost-advertising.html', form=form, amount=amount_formatted, invoice=invoice, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        organization=organization, first_name = first_name,last_name = last_name, email=email,
        show_ach=show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])

# used at support.minnpost.com/minnroast-sponsorship
@app.route('/minnroast-sponsorship/')
def minnroast_sponsorship_form():
    form = MinnPostForm()

    redirect_url = 'minnroast-sponsorship-thanks'

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
        opp_subtype = 'Sponsorship: Event (individual)'

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
    return render_template('minnroast-sponsorship.html', form=form, year=year, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# used at support.minnpost.com/pledge-payment
@app.route('/pledge-payment/')
def minnpost_pledge_payment():
    form = MinnPostForm()

    confirm_url = '/pledge-confirm/'
    redirect_url = 'pledge-thanks'

    now = datetime.now()
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

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
    elif 'Stripe_Customer_ID__c' in recurring and recurring['Stripe_Customer_ID__c'] is not None:
        customer_id = recurring['Stripe_Customer_ID__c']
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
    summary = 'Thank you for being a loyal supporter of MinnPost. Please fill out the fields below to fulfill your pledge payment for MinnPost. If you have any questions, please email Claire Radomski at <a href="mailto:cradomski@minnpost.com">cradomski@minnpost.com</a>.'
    hide_comments = True
    hide_display = True
    button = 'Update your Donation'

    description = 'Recurring Donation Update'
    allow_additional = False

    return render_template('minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, campaign=campaign, customer_id=customer_id, hide_comments=hide_comments, hide_display=hide_display,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# used at support.minnpost.com/recurring-donation-update
@app.route('/recurring-donation-update/')
def minnpost_recurring_donation_update_form():
    form = MinnPostForm()

    confirm_url = '/recurring-donation-update-confirm/'
    redirect_url = 'recurring-donation-update-thanks'

    now = datetime.now()
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

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
    elif 'Stripe_Customer_ID__c' in recurring and recurring['Stripe_Customer_ID__c'] is not None:
        customer_id = recurring['Stripe_Customer_ID__c']
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
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''

    show_amount_field = True
    title = 'MinnPost | Recurring Donation Update'
    #if amount_formatted != '':
    #    heading = '${} Donation for Election Coverage'.format(amount_formatted)
    #else:
        #heading = 'Recurring Donation Update'
    heading = 'Recurring Donation Update'
    summary = 'Thank you for being a loyal supporter of MinnPost. Please fill out the fields below to update your payment information for your recurring donation. We appreciate your cooperation as we update our system!'
    hide_comments = True
    hide_display = True
    button = 'Update your Donation'

    description = 'Recurring Donation Update'
    allow_additional = False

    return render_template('minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, recurring_id=recurring_id, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, show_amount_field=show_amount_field, campaign=campaign, customer_id=customer_id, hide_comments=hide_comments, hide_display=hide_display,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# used at support.minnpost.com/minnroast-pledge
@app.route('/minnroast-pledge/')
def minnroast_pledge_form():
    form = MinnPostForm()

    confirm_url = '/minnroast-pledge-confirm/'
    redirect_url = 'minnroast-pledge-thanks'

    now = datetime.now()
    year = now.year

    if request.args.get('opportunity'):
        opp_id = request.args.get('opportunity')
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
            opportunity = []
    else:
        opp_id = ''
        opportunity = []

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
        if show_ach == 'true':
            show_ach = True
        else:
            show_ach = False
    else:
        show_ach = SHOW_ACH

    if request.args.get('customer_id'):
        customer_id = request.args.get('customer_id')
    elif 'Stripe_Customer_ID__c' in opportunity and opportunity['Stripe_Customer_ID__c'] is not None:
        customer_id = opportunity['Stripe_Customer_ID__c']
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
    else:
        first_name = ''
    if request.args.get('lastname'):
        last_name = request.args.get('lastname')
    elif 'Donor_last_name__c' in opportunity and opportunity['Donor_last_name__c'] is not None:
        last_name = opportunity['Donor_last_name__c']
    else:
        last_name = ''
    if request.args.get('email'):
        email = request.args.get('email')
    elif 'Donor_e_mail__c' in opportunity and opportunity['Donor_e_mail__c'] is not None:
        email = opportunity['Donor_e_mail__c']
    else:
        email = ''
    if request.args.get('additional_donation'):
        additional_donation = float(request.args.get('additional_donation'))
    else:
        additional_donation = ''

    title = 'MinnPost | MinnRoast Pledge'
    if amount_formatted != '':
        heading = '${} Donation for Election Coverage'.format(amount_formatted)
    else:
        heading = 'Donation for Election Coverage'
    summary = 'Thank you for supporting our election coverage at MinnRoast. Please enter your information below to fulfill your pledge. If you have any questions, contact Claire Radomski at <a href="mailto:cradomski@minnpost.com">cradomski@minnpost.com</a>.'

    button = 'Place this Donation'

    description = 'MinnRoast Pledge'
    allow_additional = False

    return render_template('minnpost-minimal-form.html',
        title=title, confirm_url=confirm_url, redirect_url=redirect_url, opp_id=opp_id, pledge=pledge, heading=heading,
        description=description, summary=summary, allow_additional=allow_additional, button=button,
        form=form, amount=amount_formatted, campaign=campaign, customer_id=customer_id,
        #opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])

# used at support.minnpost.com/anniversary-party-sponsorship
@app.route('/anniversary-party-sponsorship/')
def anniversary_party_sponsorship_form():
    form = MinnPostForm()

    redirect_url = 'anniversary-party-sponsorship-thanks'

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
        opp_subtype = 'Sponsorship: Event (individual)'

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
    return render_template('anniversary-party-sponsorship.html', form=form, year=year, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        show_ach = show_ach, plaid_env=PLAID_ENVIRONMENT, plaid_public_key=PLAID_PUBLIC_KEY,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
#@app.route('/memberform/')
#def member_form():
#    form = DonateForm()
#    if request.args.get('amount'):
#        amount = request.args.get('amount')
#    else:
#        message = "The page you requested can't be found."
#        return render_template('error.html', message=message)
#    installment_period = request.args.get('installmentPeriod')
#    if installment_period is None:
#        installment_period = 'None'
#    installments = 'None'
#    openended_status = 'Open'
#    return render_template('member-form.html', form=form, amount=amount,
#        installment_period=installment_period, installments=installments,
#        openended_status=openended_status,
#        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
#@app.route('/donateform/')
#def donate_renew_form():
#    form = DonateForm()
#    if request.args.get('amount'):
#        amount = request.args.get('amount')
#    else:
#        amount = 50
#    openended_status = 'None'
#    installments = 'None'
#    installment_period = 'None'
#    return render_template('donate-form.html', form=form, amount=amount,
#        installment_period=installment_period, installments=installments,
#        openended_status=openended_status,
#        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
#@app.route('/circleform/')
#def circle_form():
#    form = DonateForm()
#    if request.args.get('amount'):
#        amount = request.args.get('amount')
#    else:
#        message = "The page you requested can't be found."
#        return render_template('error.html', message=message)
#    openended_status = 'None'
#    installments = request.args.get('installments')
#    installment_period = request.args.get('installmentPeriod')
#    return render_template('circle-form.html', form=form, amount=amount,
#        installment_period=installment_period, installments=installments,
#        openended_status=openended_status,
#        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
#@app.route('/internal-texasweekly/')
#def internal_texasweekly_form():
#    form = TexasWeeklyForm()
#    if request.args.get('amount'):
#        amount = request.args.get('amount')
#    else:
#        amount = 349
#    return render_template('internal_texasweekly_form.html', form=form,
#            amount=amount, key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
#@app.route('/submit-tw/', methods=['POST'])
#def submit_tw():
#    form = TexasWeeklyForm(request.form)

#    email_is_valid = validate_email(request.form['stripeEmail'])

#    if email_is_valid:
#        customer = stripe.Customer.create(
#            email=request.form['stripeEmail'],
#            card=request.form['stripeToken']
#        )
#    else:
#        message = "There was an issue saving your email address."
#        return render_template('error.html', message=message)

#    if form.validate():
#        print("----Adding TW subscription...")
#        add_tw_customer_and_charge.delay(form=request.form,
#                customer=customer)
#        return render_template('charge.html')
#    else:
#        message = "There was an issue saving your donation information."
#        return render_template('error.html', message=message)

# generalized error with a specific template
@app.route('/error/')
def error():
    message = "Something went wrong!"
    return render_template('error.html', message=message)

# generalized error with a specific template
@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template('error.html', message=message)

# this is a texas url
@app.route('/charge/', methods=['POST'])
def charge():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    customer_email = request.form['stripeEmail']
    customer_first = request.form['first_name']
    customer_last = request.form['last_name']

    email_is_valid = validate_email(customer_email)

    if email_is_valid:
        customer = stripe.Customer.create(
                email=request.form['stripeEmail'],
                card=request.form['stripeToken']
        )
        print('Create Stripe customer {} {} {}'.format(customer_email,
            customer_first, customer_last))
    else:
        message = "There was an issue saving your email address."
        print('Error saving customer {} {} {}; showed error'.format(customer_email,
            customer_first, customer_last))
        return render_template('error.html', message=message)

    if form.validate():
        add_customer_and_charge.delay(form=request.form, customer=customer)
        if not result['errors']:
            #print(result['id'])
            print('customer added')
        else:
            print('result has errors')
            print(result)

        return render_template('charge.html', amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


## this is a minnpost url. use this when sending a request to plaid
## if successful, this returns the access token and bank account token for stripe from plaid
@app.route('/plaid_token/', methods=['POST'])
def plaid_token():

    form = MinnPostForm(request.form)
    public_token = request.form['public_token']
    account_id = request.form['account_id']

    result = get_bank_token(public_token, account_id)

    if 'stripe_bank_account_token' in result:
        response = result
    else:
        response = {'error' : 'We were unable to connect to your account. Please try again.'}
    
    return jsonify(response)


## this is a minnpost url. when submitting a charge, start with ajax, then submit to the /thanks or whatever other url
@app.route('/charge_ajax/', methods=['POST'])
def charge_ajax():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    #next_page_template = 'thanks.html'

    amount = float(request.form['amount'])
    customer_id = request.form['customer_id']
    if 'opp_id' in form:
        opp_id = request.form['opp_id']

    #if (amount).is_integer():
    #    amount_formatted = float(request.form['amount'])
    #else:
    amount_formatted = format(amount, ',.2f')

    frequency = request.form['recurring']
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    level = checkLevel(amount, frequency, yearly)
    if 'pay_fees' in request.form:
        pay_fees = request.form['pay_fees']
        if pay_fees == '1':
            # get fee amount so the user can see it
            entry = {'Amount': amount, 'Stripe_Agreed_to_pay_fees__c': pay_fees}
            amount_plus_fees = amount_to_charge(entry)
            amount_formatted = format(amount_plus_fees / 100, ',.2f')

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email_is_valid = validate_email(email)

    stripe_card = ''
    stripe_bank_account = ''

    if email_is_valid and customer_id is '': # this is a new customer
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
        except stripe.error.CardError as e: # stripe returned an error on the credit card
            body = e.json_body
            print('Stripe returned an error before creating customer: {} {} {} {}'.format(email, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except Exception as e:
            body = e.json_body
            print('Stripe returned an error before creating customer: {} {} {} {}'.format(email, first_name, last_name, e.json_body))
            return jsonify(errors=body)
    elif customer_id is not None and customer_id != '': # this is an existing customer
        customer = stripe.Customer.retrieve(customer_id)
        customer.email = email
        customer.save()
        # since this is an existing customer, add the current payment method to the list.
        # this does not change the default payment method.
        # todo: build a checkbox or something that lets users indicate that we should update their default method
        try:
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
                print('Stripe error is {}'.format(error))
                return jsonify(errors=body)
        except stripe.error.CardError as e: # stripe returned an error on the credit card
            body = e.json_body
            print('Stripe returned an error before updating customer: {} {} {} {}'.format(email, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        except Exception as e:
            body = e.json_body
            print('Stripe returned an error before updating customer: {} {} {} {}'.format(email, first_name, last_name, e.json_body))
            return jsonify(errors=body)
        print('Existing customer: {} {} {} {}'.format(email, first_name, last_name, customer_id))
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
        #print('add a transaction show me the id. then do sf method.')
        # print(transaction.id)
        flask_id = str(transaction.id)
        session['flask_id'] = flask_id
        #print('session flask id is {}'.format(session['flask_id']))
        if frequency == 'one-time':
            session['sf_type'] = 'Opportunity'
        else:
            session['sf_type'] = 'npe03__Recurring_Donation__c'

        extra_values = {}

        # if we have a new source for an existing customer, add it to extra valeus
        if stripe_card != '':
            extra_values['stripe_card'] = stripe_card
        elif stripe_bank_account != '':
            extra_values['stripe_bank_account'] = stripe_bank_account

        # if we specify opportunity type and/or subtype, put it in the session
        if 'opp_type' in request.form:
            session['opp_type'] = request.form['opp_type']

            if request.form['opp_type'] == 'Sponsorship':
                if amount == 300:
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
            if opp_subtype == 'Sales: Tickets':

                if request.form['event']:
                    event = request.form['event']
                    if event == '1':
                        single_unit_fair_market_value = float(EVENT_1_SINGLE_UNIT_FAIR_MARKET_VALUE)
                    elif event == '2':
                        single_unit_fair_market_value = float(EVENT_2_SINGLE_UNIT_FAIR_MARKET_VALUE)
                    else:
                        single_unit_fair_market_value = float(EVENT_SINGLE_UNIT_FAIR_MARKET_VALUE)
                else:
                    event = '1'
                    single_unit_fair_market_value = float(EVENT_SINGLE_UNIT_FAIR_MARKET_VALUE)
                fair_market_value = quantity * single_unit_fair_market_value
            elif opp_subtype == 'Sales: Advertising':
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
        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session)
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
    customer_id = request.form['customer_id']

    #if (amount).is_integer():
    #    amount_formatted = float(request.form['amount'])
    #else:
    #    amount_formatted = format(amount, ',.2f')
    amount_formatted = format(amount, ',.2f')

    frequency = request.form['recurring']
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    level = checkLevel(amount, frequency, yearly)

    if 'pay_fees' in request.form:
        pay_fees = request.form['pay_fees']
        if pay_fees == '1':
            # get fee amount so the user can see it
            entry = {'Amount': amount, 'Stripe_Agreed_to_pay_fees__c': pay_fees}
            amount_plus_fees = amount_to_charge(entry)
            amount_formatted = format(amount_plus_fees / 100, ',.2f')

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email_is_valid = validate_email(email)

    if form.validate():
        print('Done with stripe processing {} {} {} for amount {} and frequency {}'.format(email, first_name, last_name, amount_formatted, frequency))
        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session)
    else:
        print('ajax result donate form did not validate: error below')
        print(form.errors)
        message = "There was an issue saving your donation information."
        print('Error with stripe processing {} {} {}'.format(email, first_name, last_name))
        return render_template('error.html', message=message)


# this is a texas url? or maybe a mp one we do not use?
#@app.route('/finish/', methods=['POST'])
#def finish():

#    form = DonateForm(request.form)
#    pprint('Request: {}'.format(request))


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
        return render_template('finish.html', session=session)
    else:
        print('post-donate form did not validate: error below')
        print(form.errors)
        message = "there was an issue saving your preferences, but your donation was successful"
        print('Error with post-donation preferences {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)

# this is a minnpost url
@app.route('/minnpost-advertising-confirm/', methods=['POST'])
def minnpost_advertising_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnpost-advertising/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-advertising form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-advertising form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)

# this is a minnpost url
@app.route('/minnroast-sponsorship-confirm/', methods=['POST'])
def minnroast_sponsorship_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnroast-sponsorship/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-sponsorship form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-sponsorship form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)


# this is a minnpost url
@app.route('/pledge-confirm/', methods=['POST'])
def minnpost_pledge_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnpost-minimal-form/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-update form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)

# this is a minnpost url
@app.route('/recurring-donation-update-confirm/', methods=['POST'])
def minnpost_recurring_donation_update_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnpost-minimal-form/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-update form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)


# this is a minnpost url
@app.route('/minnroast-pledge-confirm/', methods=['POST'])
def minnroast_pledge_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    #print('flask id is {} and now update'.format(flask_id))
    #print(request.form)

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnpost-minimal-form/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-pledge form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-pledge form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)

# this is a minnpost url
@app.route('/anniversary-party-sponsorship-confirm/', methods=['POST'])
def anniversary_party_sponsorship_confirm():

    form = ConfirmForm(request.form)
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('anniversary-party-sponsorship/finish.html', amount=amount_formatted, session=session)
    else:
        print('post-sponsorship form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-sponsorship form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)

# this is a minnpost url
@app.route('/minnpost-event-confirm/', methods=['POST'])
def minnroast_event_confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))
    amount = float(request.form['amount'])
    amount_formatted = format(amount, ',.2f')

    quantity = float(request.form['quantity'])

    if request.form['event']:
        event = request.form['event']
    else:
        event = '1'

    flask_id = session['flask_id']
    sf_type = session['sf_type']

    if flask_id:
        # we shouldn't need to run the update donation object here bc no newsletters or whatever
        #result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnpost-events/finish.html', amount=amount_formatted, session=session, event=event)
    else:
        print('post-event form did not validate: error below')
        print(form.errors)
        message = "there was an issue with this form"
        print('Error with post-event form {} {}'.format(sf_type, flask_id))
        return render_template('error.html', message=message)


# this is for apple pay verification through stripe
@app.route('/.well-known/apple-developer-merchantid-domain-association')
def apple_developer_domain_verification():
    return send_from_directory(app.static_folder, 'apple-developer-merchantid-domain-association');
    
# initialize
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)