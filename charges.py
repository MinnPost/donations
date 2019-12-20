import calendar
import logging
from decimal import Decimal, ROUND_HALF_UP
from config import STRIPE_KEYS
from npsp import User, Task
from util import send_slack_message

import stripe

stripe.api_key = STRIPE_KEYS["secret_key"]

TWOPLACES = Decimal(10) ** -2  # same as Decimal('0.01')


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
        payment_type = opportunity.payment_type
        if opportunity.payment_type == 'American Express' or opportunity.card_type == 'American Express':
            payment_type = 'American Express'
        elif opportunity.payment_type == 'ach' or opportunity.stripe_bank_account is not None:
            payment_type = 'ach'
        fees = calculate_amount_fees(amount, payment_type)
    else:
        fees = 0
    total = amount + fees
    return quantize(total)


def calculate_amount_fees(amount, payment_type):
    amount = Decimal(amount)
    processing_percent = 0.022
    fixed_fee = 0.3
    if payment_type == 'American Express' or payment_type == 'amex':
        processing_percent = 0.035
        fixed_fee = 0
    elif payment_type == 'ach':
        processing_percent = 0.008
        fixed_fee = 0
    new_amount = (amount + Decimal(fixed_fee)) / (1 - Decimal(processing_percent))
    processing_fee = quantize(new_amount - amount)
    fees = round(processing_fee, 2)

    return fees


def check_level(amount, frequency, yearly, prior_year_amount=None, coming_year_amount=None, annual_recurring_amount=None):
    thisyear = amount * yearly
    level = ''
    levelnum = ''
    levelint = ''
    nextlevel = ''
    nextlevelnum = ''
    nextlevelint = ''
    nextlevelmonthlystart = ''

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


def charge(opportunity):

    amount = amount_to_charge(opportunity)
    logging.info(
        f"---- Charging ${amount} to {opportunity.stripe_customer_id} ({opportunity.name})"
    )
    if opportunity.stage_name != "Pledged":
        raise Exception(f"Opportunity {opportunity.id} is not Pledged")

    opportunity.stage_name = "In Process"
    opportunity.save()

    try:
        card_charge = stripe.Charge.create(
            customer=opportunity.stripe_customer_id,
            amount=int(amount * 100),
            currency="usd",
            description=opportunity.description,
            metadata={
                "opportunity_id": opportunity.id,
                "account_id": opportunity.account_id,
                "source": opportunity.referring_page,
            },
            #shipping=shipping_details,
            #source=charge_source,
        )
    except stripe.error.CardError as e:
        # look for decline code:
        error = e.json_body["error"]
        logging.info(f"The card has been declined:")
        logging.info(f"Message: {error.get('message', '')}")
        logging.info(f"Decline code: {error.get('decline_code', '')}")
        opportunity.stripe_error_message = error.get("message", "unknown failure")
        opportunity.stage_name = "Failed"
        opportunity.save()
        logging.debug(
            f"Opportunity set to '{opportunity.stage_name}' with reason: {opportunity.stripe_error_message}"
        )
        return

    except stripe.error.InvalidRequestError as e:
        logging.error(f"Problem: {e}")
        # TODO should we raise this?
        return
    except Exception as e:
        logging.error(f"Problem: {e}")
        # TODO should we raise this?
        return

    if card_charge.status != "succeeded":
        logging.error("Charge failed. Check Stripe logs.")
        # TODO should we raise this?
        return

    opportunity.stripe_card = card_charge.source.id
    opportunity.stripe_transaction_id = card_charge.id
    opportunity.stage_name = "Closed Won"
    opportunity.save()
