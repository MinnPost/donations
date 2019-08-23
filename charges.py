import calendar
import logging
from decimal import Decimal
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
    amount = float(opportunity.amount)
    if opportunity.Stripe_Agreed_to_pay_fees__c:
        payment_type = opportunity.payment_type
        if opportunity.payment_type == 'American Express' or opportunity.Card_type__c == 'American Express':
            payment_type = 'American Express'
        elif opportunity.payment_type == 'ach' or opportunity.Stripe_Bank_Account__c is not None:
            payment_type = 'ach'
        fees = calculate_amount_fees(amount, payment_type)
    else:
        fees = 0
    total = amount + fees
    return quantize(total)


def calculate_amount_fees(amount, payment_type):
    amount = float(amount)
    processing_percent = 0.022
    fixed_fee = 0.3
    if payment_type == 'American Express' or payment_type == 'amex':
        processing_percent = 0.035
        fixed_fee = 0
    elif payment_type == 'ach':
        processing_percent = 0.008
        fixed_fee = 0
    new_amount = (amount + fixed_fee) / (1 - processing_percent)
    processing_fee = quantize(new_amount - amount)
    fees = round(processing_fee, 2)

    return fees


def quantize(amount):
    return Decimal(amount).quantize(TWOPLACES)


def charge(opportunity):

    amount = amount_to_charge(opportunity)
    logging.info(
        f"---- Charging ${amount} to {opportunity.stripe_customer} ({opportunity.name})"
    )
    if opportunity.stage_name != "Pledged":
        raise Exception(f"Opportunity {opportunity.id} is not Pledged")

    try:
        card_charge = stripe.Charge.create(
            customer=opportunity.stripe_customer,
            amount=int(amount * 100),
            currency="usd",
            description=opportunity.description,
            metadata={
                "opportunity_id": opportunity.id,
                "account_id": opportunity.account_id,
            },
        )
    except stripe.error.CardError as e:
        # look for decline code:
        error = e.json_body["error"]
        logging.info(f"The card has been declined:")
        logging.info(f"Message: {error.get('message', '')}")
        logging.info(f"Decline code: {error.get('decline_code', '')}")
        opportunity.closed_lost_reason = error.get("message", "unknown failure")
        opportunity.stage_name = "Closed Lost"
        opportunity.save()
        logging.debug(
            f"Opportunity set to '{opportunity.stage_name}' with reason: {opportunity.closed_lost_reason}"
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
