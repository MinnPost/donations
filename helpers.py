import os
from datetime import datetime, timedelta
from stopforumspam_api import query
import httpbl
from config import PROJECT_HONEYPOT_KEY
bl = httpbl.HttpBL(PROJECT_HONEYPOT_KEY)
def checkLevel(amount, frequency, yearly, prior_year_amount=None, coming_year_amount=None, annual_recurring_amount=None):
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


def amount_to_charge(entry):
    """
    Determine the amount to charge. This depends on whether the payer agreed
    to pay fees or not. If they did then we add that to the amount charged.
    Stripe charges 2.2% + $0.30.

    Stripe wants the amount to charge in cents. So we multiply by 100 and
    return that.
    
    Fees are different for ACH, and also for Amex.

    """
    amount = float(entry['Amount'])
    if entry['Stripe_Agreed_to_pay_fees__c']:
        payment_type = entry.get('payment_type')
        if entry.get('payment_type') == 'American Express' or entry.get('Card_type__c') == 'American Express':
            payment_type = 'American Express'
        elif entry.get('payment_type') == 'ach' or entry.get('Stripe_Bank_Account__c') is not None:
            payment_type = 'ach'
        fees = calculate_amount_fees(amount, payment_type)
    else:
        fees = 0
    total = amount + fees
    total_in_cents = total * 100

    return int(total_in_cents)


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
    processing_fee = new_amount - amount
    fees = round(processing_fee, 2)

    return fees

def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
        for root_path, dirs, files in os.walk(folder)
        for f in files))

def is_known_spam_email(email):
    if query != None:
        response = query(email=email)
        if response != None:
            if response.email.appears:
                difference = datetime.utcnow() - response.email.lastseen
                if response.email.frequency > 8 and difference.days < 60:
                    return True
    return False

def is_known_spam_ip(ip):
    if query != None:
        stop_response = query(ip=ip)
        if stop_response != None:
            if stop_response.ip.appears:
                difference = datetime.utcnow() - stop_response.ip.lastseen
                if stop_response.ip.frequency > 8 and difference.days < 60:
                    return True
            ph_response = bl.query(ip)
            if ph_response['threat_score'] > 25 and response['days_since_last_activity'] < 60:
                return True
    return False
