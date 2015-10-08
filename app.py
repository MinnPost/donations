import os
import stripe
from flask import Flask, render_template, request
from salesforce import add_opportunity
from salesforce import add_recurring_donation
from salesforce import upsert
from config import stripe_keys

from pprint import pprint

from sassutils.wsgi import SassMiddleware

stripe.api_key = stripe_keys['secret_key']

app = Flask(__name__)

app.wsgi_app = SassMiddleware(app.wsgi_app, {
        'app': ('static/sass', 'static/css', 'static/css')
    })

@app.route('/form')
def checkout_form():
    amount = request.args.get('amount')
    return render_template('form.html', key=stripe_keys['publishable_key'])


@app.route('/error')
def error():
    message = "Something went wrong!"
    return render_template('error.html', message=message)


# create customer in Stripe
# get or create payer in Salesforce - add Stripe Customer Id
# create opportunity or recurring donation object

# Sample Request

@app.route('/charge', methods=['POST'])
def charge():

    pprint ('Request: {}'.format(request.form))

    customer = stripe.Customer.create(
        email=request.form['stripeEmail'],
        card=request.form['stripeToken']
    )
    #print ('Customer: {}'.format(customer))
    upsert(request=request, customer=customer)

    #charge = stripe.Charge.create(
    #   customer=customer.id,
    #   amount=int(request.form['Opportunity.Amount']) * 100,
    #   currency='usd',
    #   description='Change Me' # TODO
    #)
    # except stripe.error.CardError, e:
    # The card has been declined
    #print ('Charge: {}'.format(charge))

    if (request.form['frequency'] == 'one-time'):
        print("----One time payment...")
        add_opportunity(request=request, customer=customer,
                reason="I heart the Trib!") # TODO
    else:
        print("----Recurring payment...")
        add_recurring_donation(request=request, customer=customer,
                reason="I love the Trib!") #TODO

    return render_template('charge.html', amount=request.form['Opportunity.Amount'])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
