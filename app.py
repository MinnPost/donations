import os
import sys

from flask import Flask, render_template, request
from forms import DonateForm, MinnPostForm, TexasWeeklyForm
from raven.contrib.flask import Sentry
from sassutils.wsgi import SassMiddleware
import stripe
from validate_email import validate_email

from config import FLASK_SECRET_KEY
from salesforce import add_customer_and_charge
from salesforce import add_tw_customer_and_charge
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


@app.route('/minnpostform/')
def minnpost_form():
    form = MinnPostForm()
    if request.args.get('amount'):
        amount = int(request.args.get('amount'))
    else:
        message = "The page you requested can't be found."
        return render_template('error.html', message=message)
    frequency = request.args.get('frequency')
    if frequency is None:
        frequency = 'one-time'
    if frequency == 'monthly':
        yearly = 12
    else:
        yearly = 1
    installments = 'None'
    openended_status = 'Open'
    level = checkLabel(amount, frequency, yearly)
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
    return render_template('minnpost-form.html', form=form, amount=amount,
        frequency=frequency, installments=installments,
        openended_status=openended_status,
        yearly=yearly,
        level=level,
        first_name = first_name,last_name = last_name, email=email,
        key=app.config['STRIPE_KEYS']['publishable_key'])


def checkLabel(amount, frequency, yearly, prior_year_amount=None, coming_year_amount=None, annual_recurring_amount=None):
    thisyear = amount * yearly
    level = ''
    levelnum = ''
    levelint = ''

    if prior_year_amount != None or coming_year_amount != None or annual_recurring_amount != None:
        if frequency is 'one-time':
            prior_year_amount = thisyear
        else:
            annual_recurring_amount += thisyear

        thisyear = max(prior_year_amount, coming_year_amount, annual_recurring_amount)

    if (thisyear > 0 and thisyear < 60):
        level = 'bronze'
        levelnum = 'one'
        levelint = 1
    elif (thisyear > 59 and thisyear < 120):
        level = 'silver'
        levelnum = 'two'
        levelint = 2
    elif (thisyear > 119 and thisyear < 240):
        level = 'gold'
        levelnum = 'three'
        levelint = 3
    elif (thisyear > 239):
        level = 'platinum'
        levelnum = 'four'
        levelint = 4

    leveldata = {'level': level, 'levelnum': levelnum, 'levelint': levelint}
    return leveldata



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
    pprint('Request: {}'.format(request))

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
        add_customer_and_charge.delay(form=request.form,
                customer=customer)

        return render_template('charge.html',
                amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


@app.route('/thanks/', methods=['POST'])
def thanks():

    form = MinnPostForm(request.form)
    pprint('Request: {}'.format(request))

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
        add_customer_and_charge.delay(form=request.form,
                customer=customer)

        return render_template('thanks.html',
                amount=request.form['amount'])
    else:
        message = "There was an issue saving your donation information."
        return render_template('error.html', message=message)


@app.route('/finish/', methods=['POST'])
def finish():

    form = DonateForm(request.form)
    pprint('Request: {}'.format(request))


@app.route('/confirm/', methods=['POST'])
def confirm():

    form = MinnPostForm(request.form)
    pprint('Request: {}'.format(request))

    

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)