import os
import sys
from datetime import datetime

from flask import Flask, render_template, request, session, jsonify, json
from flask.ext.sqlalchemy import SQLAlchemy

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
from config import SHOW_UPSELL
from config import ALLOW_DONATION_NOTIFICATION
from config import OPBEAT_ORGANIZATION_ID
from config import OPBEAT_APP_ID
from config import OPBEAT_SECRET_TOKEN
from salesforce import add_customer_and_charge
#from salesforce import add_tw_customer_and_charge
from salesforce import update_donation_object
from app_celery import make_celery

import batch

from pprint import pprint

app = Flask(__name__)

if 'DYNO' in os.environ:
    sslify = SSLify(app) # only trigger SSLify if the app is running on Heroku
    opbeat = Opbeat(app) # only trigger opbeat if the app is running on Heroku

app.secret_key = FLASK_SECRET_KEY
app.default_campaign_onetime = DEFAULT_CAMPAIGN_ONETIME
app.default_campaign_recurring = DEFAULT_CAMPAIGN_RECURRING
app.show_upsell = SHOW_UPSELL
app.allow_donation_notification = ALLOW_DONATION_NOTIFICATION

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
        amount = float(request.args.get('amount'))
        if (amount).is_integer():
            amount_formatted = int(request.args.get('amount'))
        else:
            amount_formatted = format(amount, ',.2f')
    else:
        message = "The page you requested can't be found."
        return render_template('error.html', message=message)
    if request.args.get('campaign'):
        campaign = request.args.get('campaign')
    else:
        campaign = ''
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
        campaign = ''

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
        additional_donation = request.args.get('additional_donation')
    else:
        additional_donation = ''
    return render_template('minnroast-sponsorship.html', form=form, year=year, campaign=campaign, customer_id=customer_id,
        opp_type = opp_type, opp_subtype = opp_subtype,
        first_name = first_name,last_name = last_name, email=email,
        additional_donation = additional_donation,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
@app.route('/memberform/')
def member_form():
    form = DonateForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        message = "The page you requested can't be found."
        return render_template('error.html', message=message)
    installment_period = request.args.get('installmentPeriod')
    if installment_period is None:
        installment_period = 'None'
    installments = 'None'
    openended_status = 'Open'
    return render_template('member-form.html', form=form, amount=amount,
        installment_period=installment_period, installments=installments,
        openended_status=openended_status,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
@app.route('/donateform/')
def donate_renew_form():
    form = DonateForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        amount = 50
    openended_status = 'None'
    installments = 'None'
    installment_period = 'None'
    return render_template('donate-form.html', form=form, amount=amount,
        installment_period=installment_period, installments=installments,
        openended_status=openended_status,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
@app.route('/circleform/')
def circle_form():
    form = DonateForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        message = "The page you requested can't be found."
        return render_template('error.html', message=message)
    openended_status = 'None'
    installments = request.args.get('installments')
    installment_period = request.args.get('installmentPeriod')
    return render_template('circle-form.html', form=form, amount=amount,
        installment_period=installment_period, installments=installments,
        openended_status=openended_status,
        key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
@app.route('/internal-texasweekly/')
def internal_texasweekly_form():
    form = TexasWeeklyForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        amount = 349
    return render_template('internal_texasweekly_form.html', form=form,
            amount=amount, key=app.config['STRIPE_KEYS']['publishable_key'])


# this is a texas url
@app.route('/submit-tw/', methods=['POST'])
def submit_tw():
    form = TexasWeeklyForm(request.form)

    email_is_valid = validate_email(request.form['stripeEmail'])

    if email_is_valid:
        customer = stripe.Customer.create(
            email=request.form['stripeEmail'],
            card=request.form['stripeToken']
        )
    else:
        message = "There was an issue saving your email address."
        return render_template('error.html', message=message)

    if form.validate():
        print("----Adding TW subscription...")
        add_tw_customer_and_charge.delay(form=request.form,
                customer=customer)
        return render_template('charge.html')
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)

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

    email_is_valid = validate_email(request.form['stripeEmail'])

    if email_is_valid:
        customer = stripe.Customer.create(
                email=request.form['stripeEmail'],
                card=request.form['stripeToken']
        )
    else:
        message = "There was an issue saving your email address."
        return render_template('error.html', message=message)

    if form.validate():
        add_customer_and_charge.delay(form=request.form, customer=customer)
        if not result['errors']:
            print(result['id'])
        else:
            print('result has errors')
            print(result)

        return render_template('charge.html', amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


## this is a minnpost url. when submitting a charge, start with ajax, then submit to the /thanks or whatever other url
@app.route('/charge_ajax/', methods=['POST'])
def charge_ajax():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    #next_page_template = 'thanks.html'

    amount = float(request.form['amount'])
    customer_id = request.form['customer_id']

    if (amount).is_integer():
        amount_formatted = int(request.form['amount'])
    else:
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

    if email_is_valid and customer_id is '': # this is a new customer
        try:
            customer = stripe.Customer.create(
                    email=email,
                    card=request.form['stripeToken']
            )
        except stripe.error.CardError as e: # stripe returned an error on the credit card
            body = e.json_body
            return jsonify(body)
    elif customer_id is not None and customer_id != '': # this is an existing customer
        customer = stripe.Customer.retrieve(customer_id)
        customer.card=request.form['stripeToken']
        customer.email = email
        customer.save()
    else: # the email was invalid
        message = "There was an issue saving your email address."
        return render_template('error.html', message=message)

    if form.validate():
        # add a row to the heroku database so we can track it
        transaction = Transaction('NULL', 'NULL')
        db.session.add(transaction)
        db.session.commit()
        #print('add a transaction show me the id. then do sf method.')
        # print(transaction.id)
        flask_id = str(transaction.id)
        session['flask_id'] = flask_id
        if frequency == 'one-time':
            session['sf_type'] = 'Opportunity'
        else:
            session['sf_type'] = 'npe03__Recurring_Donation__c'

        extra_values = {}
        # if we specify opportunity type and/or subtype, put it in the session
        if 'opp_type' in request.form:
            session['opp_type'] = request.form['opp_type']

            if request.form['opp_type'] == 'Sponsorship':
                if amount == 500:
                    fair_market_value = 100
                elif amount == 1500:
                    fair_market_value = 300
                elif amount == 3000:
                    fair_market_value = 400
                elif amount == 5000:
                    fair_market_value = 500
                elif amount == 8000:
                    fair_market_value = 600
                else:
                    fair_market_value = ''

                extra_values['fair_market_value'] = fair_market_value

        if 'subtype' in request.form:
            session['opp_subtype'] = request.form['opp_subtype']

        if 'additional_donation' in request.form:
            if request.form['additional_donation'] != '':
                additional_donation = float(request.form['additional_donation'])
                extra_values['additional_donation'] = additional_donation
                session['additional_donation'] = format(additional_donation, ',.2f')
            else:
                session['additional_donation'] = ''

        # this adds the contact and the opportunity to salesforce
        add_customer_and_charge.delay(form=request.form, customer=customer, flask_id=flask_id, extra_values=extra_values)
        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session)
        #body = transaction.id
        #return jsonify(body)
    else:
        print('form did not validate: error below')
        print(form.errors)
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


# this is a minnpost url. it gets called after successful response from stripe
@app.route('/thanks/', methods=['POST'])
def thanks():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    amount = float(request.form['amount'])
    customer_id = request.form['customer_id']

    if (amount).is_integer():
        amount_formatted = int(request.form['amount'])
    else:
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
        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session)
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


# this is a texas url? or maybe a mp one we do not use?
@app.route('/finish/', methods=['POST'])
def finish():

    form = DonateForm(request.form)
    pprint('Request: {}'.format(request))


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
        #result = update_donation_object.delay(object_name=sf_type, sf_id=sf_id, form=request.form)
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('finish.html', session=session)
    else:
        message = "there was an issue saving your preferences, but your donation was successful"
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
        #result = update_donation_object.delay(object_name=sf_type, sf_id=sf_id, form=request.form)
        result = update_donation_object.delay(object_name=sf_type, flask_id=flask_id, form=request.form)
        return render_template('minnroast-sponsorship/finish.html', amount=amount_formatted, session=session)
    else:
        message = "there was an issue saving your preferences, but your donation was successful"
        return render_template('error.html', message=message)

    
# initialize
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)