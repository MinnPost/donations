import os
import sys

from flask import Flask, render_template, request, session
from forms import DonateForm, MinnPostForm, ConfirmForm, TexasWeeklyForm
from raven.contrib.flask import Sentry
from sassutils.wsgi import SassMiddleware
import stripe
from validate_email import validate_email
from helpers import checkLevel

from config import FLASK_SECRET_KEY
from config import DEFAULT_CAMPAIGN
from salesforce import add_customer_and_charge
from salesforce import add_tw_customer_and_charge
from salesforce import update_donation_object
from app_celery import make_celery

import batch

from pprint import pprint

app = Flask(__name__)

app.secret_key = FLASK_SECRET_KEY
app.default_campaign = DEFAULT_CAMPAIGN

app.wsgi_app = SassMiddleware(app.wsgi_app, {
        'app': ('static/sass', 'static/css', 'static/css')
        })

app.config.from_pyfile('config.py')
app.config.update(
        CELERY_ACCEPT_CONTENT=['pickle', 'json'],
        CELERY_ALWAYS_EAGER=False,
        CELERY_IMPORTS=('app', 'salesforce', 'batch'),
        )
stripe.api_key = app.config['STRIPE_KEYS']['secret_key']

celery = make_celery(app)

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
        campaign = app.default_campaign
    frequency = request.args.get('frequency')
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
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
    return render_template('minnpost-form.html', form=form, amount=amount_formatted, campaign=campaign,
        frequency=frequency, installments=installments,
        openended_status=openended_status,
        yearly=yearly,
        level=level,
        first_name = first_name,last_name = last_name, email=email,
        key=app.config['STRIPE_KEYS']['publishable_key'])



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


@app.route('/internal-texasweekly/')
def internal_texasweekly_form():
    form = TexasWeeklyForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        amount = 349
    return render_template('internal_texasweekly_form.html', form=form,
            amount=amount, key=app.config['STRIPE_KEYS']['publishable_key'])


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


@app.route('/error/')
def error():
    message = "Something went wrong!"
    return render_template('error.html', message=message)


@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template('error.html', message=message)


@app.route('/charge/', methods=['POST'])
def charge():

    form = DonateForm(request.form)
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
        #result = add_customer_and_charge.delay(form=request.form, customer=customer)
        #if not result['errors']:
        #    print(result['id'])
        #else:
        #    print('result has errors')
        #    print(result)

        return render_template('charge.html', amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


@app.route('/thanks/', methods=['POST'])
def thanks():

    form = MinnPostForm(request.form)
    #pprint('Request: {}'.format(request))

    amount = float(request.form['amount'])

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

    email_is_valid = validate_email(request.form['email'])

    if email_is_valid:
        customer = stripe.Customer.create(
                email=request.form['email'],
                card=request.form['stripeToken']
        )
    else:
        message = "There was an issue saving your email address."
        return render_template('error.html', message=message)

    if form.validate():
        result = add_customer_and_charge(form=request.form, customer=customer)

        if not result['errors']:
            #print(result['id'])
            session['sf_id'] = result['id']
            if frequency == 'one-time':
                session['sf_type'] = 'Opportunity'
            else:
                session['sf_type'] = 'npe03__Recurring_Donation__c'
        else:
            session['errors'] = result['errors']

        return render_template('thanks.html', amount=amount_formatted, frequency=frequency, yearly=yearly, level=level, session=session)
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)



@app.route('/finish/', methods=['POST'])
def finish():

    form = DonateForm(request.form)
    pprint('Request: {}'.format(request))



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

    

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)