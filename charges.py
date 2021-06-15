import calendar
import logging
from decimal import Decimal, ROUND_HALF_UP
from config import STRIPE_KEYS, PLAID_ENVIRONMENT, PLAID_CLIENT_ID, PLAID_SECRET
from npsp import User, Task
from util import send_slack_message

import stripe
import plaid

stripe.api_key = STRIPE_KEYS["secret_key"]
stripe.api_version = "2020-08-27"

TWOPLACES = Decimal(10) ** -2  # same as Decimal('0.01')


class ChargeException(Exception):
    def __init__(self, opportunity, message):
        super().__init__(message)
        self.opportunity = opportunity
        self.message = message

    def send_slack_notification(self):
        send_slack_message(
            {
                "channel": "#stripe",
                "text": f"Charge failed for {self.opportunity.name} [{self.message}]",
                "icon_emoji": ":x:",
            }
        )


class QuarantinedException(Exception):
    pass


def amount_to_charge(opportunity):
    """
    Determine the amount to charge. This depends on whether the payer agreed
    to pay fees or not. If they did then we add that to the amount charged.
    Stripe charges 2.2% + $0.30.

    Stripe wants the amount to charge in cents. So we multiply by 100 and
    return that.
    
    Fees are different for ACH, and also for Amex.

    """
    amount = Decimal(opportunity.amount)
    if opportunity.agreed_to_pay_fees:
        payment_type = opportunity.stripe_payment_type

        if opportunity.stripe_payment_type == 'American Express' or opportunity.stripe_payment_type == 'amex' or opportunity.card_type == 'American Express' or opportunity.card_type == 'Amex':
            payment_type = 'amex'
        elif opportunity.stripe_payment_type == 'ach' or opportunity.stripe_payment_type == 'bank_account' or opportunity.stripe_bank_account is not None:
            payment_type = 'bank_account'

        fees = calculate_amount_fees(amount, payment_type)
    else:
        fees = 0
    total = amount + fees
    return quantize(total)


def calculate_amount_fees(amount, payment_type, paying_fees=True):
    amount = Decimal(amount)
    processing_percent = 0.022
    fixed_fee = 0.3
    if payment_type == 'American Express' or payment_type == 'amex':
        processing_percent = 0.035
        fixed_fee = 0
    elif payment_type == 'bank_account':
        processing_percent = 0.008
        fixed_fee = 0

    if paying_fees == True:
        new_amount = (amount + Decimal(fixed_fee)) / (1 - Decimal(processing_percent))
        processing_fee = quantize(new_amount - amount)
    else:
        processing_fee = quantize((amount * Decimal(processing_percent)) + Decimal(fixed_fee))
    fees = round(processing_fee, 2)
    return fees


def check_level(amount, installment_period, yearly, prior_year_amount=None, coming_year_amount=None, annual_recurring_amount=None):
    thisyear = amount * yearly
    level = ''
    levelnum = ''
    levelint = ''
    nextlevel = ''
    nextlevelnum = ''
    nextlevelint = ''
    nextlevelmonthlystart = ''

    if prior_year_amount != None or coming_year_amount != None or annual_recurring_amount != None:
        if installment_period == 'one-time':
            prior_year_amount = thisyear
        else:
            annual_recurring_amount += thisyear

        thisyear = max(prior_year_amount, coming_year_amount, annual_recurring_amount)

    if (thisyear > 0 and thisyear < 60):
        level = 'bronze'
        levelnum = 'one'
        levelint = 1
        nextlevel = 'silver'
        nextlevelnum = 'two'
        nextlevelint = 2
        nextlevelmonthlystart = 5
    elif (thisyear > 59 and thisyear < 120):
        level = 'silver'
        levelnum = 'two'
        levelint = 2
        nextlevel = 'gold'
        nextlevelnum = 'three'
        nextlevelint = 3
        nextlevelmonthlystart = 10
    elif (thisyear > 119 and thisyear < 240):
        level = 'gold'
        levelnum = 'three'
        levelint = 3
        nextlevel = 'platinum'
        nextlevelnum = 'four'
        nextlevelint = 4
        nextlevelmonthlystart = 20
    elif (thisyear > 239):
        level = 'platinum'
        levelnum = 'four'
        levelint = 4

    leveldata = {'level': level, 'levelnum': levelnum, 'levelint': levelint, 'nextlevel' : nextlevel, 'nextlevelnum' : nextlevelnum, 'nextlevelint' : nextlevelint, 'nextlevelmonthlystart' : nextlevelmonthlystart}
    return leveldata


def quantize(amount):
    return Decimal(amount).quantize(TWOPLACES)


def generate_stripe_description(opportunity) -> str:
    """
    Our current code populates the Description field of recurring donations
    and opportunities when those are created. Those descriptions get passed
    on to Stripe when the card is charged. But we have at least two cases
    where the Description field could be blank: when someone manually enters
    a donation or when it's a donation that's been migrated from our legacy
    (Tinypass) system. But in those cases we know the opportunity type and
    it's a direct relationship to the description so we can populate it anyway.
    """
    # remove leading "The " from descriptions for better Stripe
    if opportunity.description:
        if opportunity.description.startswith("The "):
            return opportunity.description[4:]
        else:
            return opportunity.description

    description_map = {
        "Donation": "MinnPost Membership",
        "Recurring Donation": "MinnPost Sustaining Membership",
        "Sales": "MinnPost Purchase",
        "Sponsorship": "MinnPost Sponsorship",
    }
    if opportunity.type in description_map.keys():
        return description_map[opportunity.type]
    else:
        return "MinnPost Membership"


def create_plaid_link_token():
    plaid_env = PLAID_ENVIRONMENT
    client = plaid.Client(
        client_id=PLAID_CLIENT_ID,
        secret=PLAID_SECRET,
        environment=plaid_env,
        api_version='2019-05-29'
    )
    client_user_id = f"MinnPost {plaid_env}"
    # 2. Create a link_token for the given user
    response = client.LinkToken.create({
        'user': {
            'client_user_id': client_user_id,
        },
        'products': ["transactions"],
        'client_name': "MinnPost",
        'country_codes': ['US'],
        'language': 'en',
        'webhook': 'https://sample.webhook.com',
    })
    link_token = response['link_token']
    # 3. Send the data to the client
    return link_token


def charge(opportunity):

    amount = amount_to_charge(opportunity)
    logging.info(
        f"---- Charging ${amount} to {opportunity.stripe_customer_id} ({opportunity.name})"
    )

    if opportunity.stage_name == "Pledged":
        opportunity.stage_name = "In Process"
        opportunity.stripe_error_message = ""
        opportunity.save()
        
        payment_method = None
        payment_intent = None
        charge_source = None
        charge = None

        if opportunity.stripe_card is not None:
            payment_method = opportunity.stripe_card
        elif opportunity.stripe_bank_account is not None:
            charge_source = opportunity.stripe_bank_account
        else:
            charge_source = None

        if opportunity.shipping_name != '':
            shipping_address = {'line1' : opportunity.shipping_street, 'city' : opportunity.shipping_city, 'state' : opportunity.shipping_state, 'postal_code' : opportunity.shipping_zip, 'country' : opportunity.shipping_country}
            if shipping_address.get('line1'):
                shipping_details = {'name' : opportunity.shipping_name, 'address' : shipping_address}
            else:
                shipping_details = None
        else:
            shipping_details = None

        try:
            if payment_method is not None:
                payment_intent = stripe.PaymentIntent.create(
                    customer=opportunity.stripe_customer_id,
                    amount=int(amount * 100),
                    currency="usd",
                    description=generate_stripe_description(opportunity),
                    metadata={
                        "opportunity_id": opportunity.id,
                        "account_id": opportunity.account_id,
                        "source": opportunity.referring_page,
                    },
                    payment_method=payment_method,
                    confirmation_method='manual',
                    confirm=True,
                    setup_future_usage='off_session',
                )
            else:
                charge = stripe.Charge.create(
                    customer=opportunity.stripe_customer_id,
                    amount=int(amount * 100),
                    currency="usd",
                    description=generate_stripe_description(opportunity),
                    metadata={
                        "opportunity_id": opportunity.id,
                        "account_id": opportunity.account_id,
                        "source": opportunity.referring_page,
                    },
                    shipping=shipping_details,
                    source=charge_source,
                )
        except Exception as e:
            logging.info(f"Error charging card: {type(e)}")
            if isinstance(e, stripe.error.StripeError):
                message = e.user_message or ''
                logging.info(f"Message: {message}")

                reason = e.user_message

                if isinstance(e, stripe.error.CardError):
                    logging.info(f"The card has been declined")
                    logging.info(f"Decline code: {e.json_body.get('decline_code', '')}")

                    if reason is None:
                        reason = "card declined for unknown reason"

                if reason is None:
                    reason = "unknown failure"

            else:
                reason = "unknown failure"

            opportunity.stripe_error_message = reason
            opportunity.stage_name = "Failed"
            opportunity.save()
            logging.debug(
                f"Opportunity set to '{opportunity.stage_name}' with reason: {opportunity.stripe_error_message}"
            )
            raise ChargeException(opportunity, reason)

    else:
        logging.debug(
            f"---- Checking transaction {opportunity.stripe_transaction_id}"
        )

        if opportunity.quarantined:
            logging.info("---- Skipping because it's quarantined")
            raise QuarantinedException(f"Opportunity {opportunity.id} is quarantined")

        if payment_method is not None:
            payment_intent = stripe.PaymentIntent.retrieve(
                opportunity.stripe_transaction_id,
            )
        elif charge_source is not None:
            charge = stripe.Charge.retrieve(opportunity.stripe_transaction_id)

    if payment_intent is not None:
        charge_id = payment_intent.charges.data[0].id
        charge = stripe.Charge.retrieve(charge_id)
    
    if charge:

        if charge.status != "succeeded" and charge.status != "pending":
            logging.error("Charge failed. Check Stripe logs.")
            raise ChargeException(opportunity, "charge failed")
    
        # this is either pending or finished
        opportunity.stripe_transaction_id = charge.id

        if charge.status == "pending":
            logging.info(f"ACH charge pending. Check at intervals to see if it processes.")
            opportunity.stage_name = "ACH Pending"
            opportunity.save()

        # payment was successful
        if charge.payment_intent:
            opportunity.stripe_card = payment_intent.payment_method
        elif charge.source:
            if charge.source.object == "bank_account":
                opportunity.stripe_bank_account = charge.source.id
            else:
                opportunity.stripe_card = charge.source.id
        
        opportunity.stage_name = "Closed Won"
        opportunity.save()
