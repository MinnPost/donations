import os
import sys

from flask import Flask, render_template, request
from forms import DonateForm, BlastForm, MemberForm
from raven.contrib.flask import Sentry
from sassutils.wsgi import SassMiddleware
import stripe
from validate_email import validate_email

from config import FLASK_SECRET_KEY
from salesforce import add_customer_and_charge
from salesforce import add_tw_customer_and_charge
from salesforce import add_blast_customer_and_charge
from app_celery import make_celery

import batch

from pprint import pprint

app = Flask(__name__)

app.secret_key = FLASK_SECRET_KEY

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

if app.config['ENABLE_SENTRY']:
    sentry = Sentry(app, dsn=app.config['SENTRY_DSN'])


@app.route('/memberform')
def member_form():
    form = MemberForm()
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


@app.route('/donateform')
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


@app.route('/circleform')
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


@app.route('/blastform')
def the_blast_form():
    form = BlastForm()
    if request.args.get('amount'):
        amount = request.args.get('amount')
    else:
        amount = 349
    installment_period = request.args.get('installmentPeriod')
    return render_template('blast-form.html', form=form,
        installment_period=installment_period,
        openended_status='Open', amount=amount,
        key=app.config['STRIPE_KEYS']['publishable_key'])


@app.route('/submit-blast', methods=['POST'])
def submit_blast():
    form = BlastForm(request.form)

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
        print("----Adding Blast subscription...")
        add_blast_customer_and_charge.delay(form=request.form,
                customer=customer)
        return render_template('charge.html')
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


@app.route('/error')
def error():
    message = "Something went wrong!"
    return render_template('error.html', message=message)


@app.errorhandler(404)
def page_not_found(error):
    message = "The page you requested can't be found."
    return render_template('error.html', message=message)


@app.route('/charge', methods=['POST'])
def charge():

    form = DonateForm(request.form)
    pprint('Request: {}'.format(request))

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
        print('Issue saving customer {} {} {}; showed error'.format(customer_email,
            customer_first, customer_last))
        return render_template('error.html', message=message)

    if form.validate():
        add_customer_and_charge.delay(form=request.form,
                customer=customer)
        print('Validated form of customer {} {} {}'.format(customer_email,
            customer_first, customer_last))
        return render_template('charge.html',
                amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        print('Form validation errors: {}'.format(form.errors))
        print('Did not validate form of customer {} {} {}'.format(customer_email,
            customer_first, customer_last))
        return render_template('error.html', message=message)


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
