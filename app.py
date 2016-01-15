import os
import sys

from flask import Flask, render_template, request, session, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
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

db = SQLAlchemy(app)

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String())
    sf_id = db.Column(db.String())

    def __init__(self, transaction_id, sf_id):
        self.transaction_id = transaction_id
        self.sf_id = sf_id

    def __repr__(self):
        return '<Transaction %r>'.format(self.id)


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


## this is a minnpost url. when submitting a charge, start with ajax, then submit to /thanks
@app.route('/charge_ajax/', methods=['POST'])
def charge_ajax():

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

        #result = add_customer_and_charge(form=request.form, customer=customer)
        #if not result['errors']:
            #print(result['id'])
            # store some id (currently the opportunity/recurring donation id)
            # so the script can update it with their newsletter and/or testimonial
        transaction = Transaction('NULL', 'NULL')
        db.session.add(transaction)
        db.session.commit()
        #session['sf_id'] = result['id']
        #session['flask_id'] = transaction.id

        # this adds the contact and the opportunity to salesforce
        add_customer_and_charge.delay(form=request.form, customer=customer, flask_id=str(transaction.id))

        ## we need to get notified of result here somehow and then update the db
        #transaction = Transaction.query.get(flask_id)
        #transaction = db.session.query(Transaction).get(flask_id)
        #transaction.sf_id = response['id']
        #db.session.commit()


        #if frequency == 'one-time':
        #    session['sf_type'] = 'Opportunity'
        #else:
        #    session['sf_type'] = 'npe03__Recurring_Donation__c'
        #else:
        #    session['errors'] = result['errors']
        #return 'foo'
        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, email=email, first_name=first_name, last_name=last_name, session=session)
        #body = transaction.id
        #return jsonify(body)
    else:
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


## this is a minnpost url. after celery does things to the opportunity, it will call this url to tell us what happened locally
@app.route('/transaction_result/', methods=['POST'])
def transaction_result():
    print('do something here with result')
    result = request.get_json()
    ## we need to get notified of result here somehow and then update the db
    transaction = Transaction.query.get(result['flask_id'])
    #transaction = db.session.query(Transaction).get(flask_id)
    transaction.sf_id = result['sf_id']
    db.session.commit()
    body = transaction
    return jsonify(body)
    #print(result)
    #return result['flask_id']
    #print('start parsing')
    #print(request.data)
    #datadict = json.loads(data)
    #print(datadict)
    #print('stop parsing')
    #content = json.dumps(request.json)
    #if request.form:
    #    content = 'test'
    #    return content
    #if not request.json:
    #    return render_template('error.html', message='there is an error here')
    #else:
        #print(request.json)
    #    return request.json
    #print(jsonify(request.data))
    #content = request.json()
    #print(request.json())
    #if request.headers['content-type'] == 'application/json':
        # Ensure data is a valid JSON
        #try:
            #user_submission = json.loads(request.data)
    #print('show data')
    #content = request.json()
    #content = request.json()
    #print('data up there')
    #body = request.data
    #return 'test'
            #print(user_submission)
            #return 'success'
        #except:
            #return 'error1'
    # User submitted an unsupported Content-Type
    #else:
        #return 'error2'

    #print('this is the endpoint')
    #print('this is the json')
    #input_json = request.get_json(force=True)
    #print(input_json)
    #print('try to update the database')
    ## we need to get notified of result here somehow and then update the db
    #transaction = Transaction.query.get(input_json.flask_id)
    #transaction = db.session.query(Transaction).get(flask_id)
    #transaction.sf_id = input_json.sf_id
    #db.session.commit()


# this is a minnpost url
@app.route('/finish/', methods=['POST'])
def finish():

    form = DonateForm(request.form)
    pprint('Request: {}'.format(request))


# this is a minnpost url
@app.route('/confirm/', methods=['POST'])
def confirm():

    form = ConfirmForm(request.form)
    #pprint('Request: {}'.format(request))

    sf_id = session['sf_id']
    sf_type = session['sf_type']

    if sf_id:

        result = update_donation_object.delay(object_name=sf_type, sf_id=sf_id, form=request.form)
        return render_template('finish.html', session=session)
    else:
        message = "there was an issue saving your preferences, but your donation was successful"
        return render_template('error.html', message=message)

    
# initialize
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)