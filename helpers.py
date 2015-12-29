def checkLevel(amount, frequency, yearly, prior_year_amount=None, coming_year_amount=None, annual_recurring_amount=None):
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


def amount_to_charge(entry):
    """
    Determine the amount to charge. This depends on whether the payer agreed
    to pay fees or not. If they did then we add that to the amount charged.
    Stripe charges 2.9% + $0.30.

    Stripe wants the amount to charge in cents. So we multiply by 100 and
    return that.
    """
    amount = int(entry['Amount'])
    if entry['Stripe_Agreed_to_pay_fees__c'] == 1:
        fees = amount * .029 + .30
    else:
        fees = 0
    total = amount + fees
    total_in_cents = total * 100

    return int(total_in_cents)