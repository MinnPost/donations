import os
import json
from datetime import datetime, timedelta
import hashlib
import logging
import smtplib
import charges
from stopforumspam_api import query
from collections import defaultdict
from config import (
    BUSINESS_MEMBER_RECIPIENT,
    DEFAULT_MAIL_SENDER,
    EMAIL_BAN_LIST,
    ENABLE_SLACK,
    MAIL_PASSWORD,
    MAIL_PORT,
    MAIL_SERVER,
    MAIL_USERNAME,
    MINNPOST_ROOT,
    MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT,
    SLACK_API_KEY,
    SLACK_CHANNEL,
)

import requests

from npsp import SalesforceConnection, SalesforceException, DEFAULT_RDO_TYPE


def construct_slack_message(contact=None, opportunity=None, rdo=None, account=None):

    if rdo and opportunity:
        raise SalesforceException("rdo and opportunity can't both be specified")

    reason = (
        getattr(rdo, "encouraged_by", False)
        or getattr(opportunity, "encouraged_by", False)
        or ""
    )
    period = f"[{rdo.installment_period}]" if rdo else "[one-time]"
    amount = getattr(rdo, "amount", False) or getattr(opportunity, "amount", "")
    amount = float(amount)
    reason = f"({reason})" if reason else ""
    entity = account.name if account else contact.name

    message = f"{entity} pledged ${amount:.0f} {period} {reason}"

    logging.info(message)

    return message


def notify_slack(contact=None, opportunity=None, rdo=None, account=None):
    """
    Send a notification about a donation to Slack.
    """

    text = construct_slack_message(
        contact=contact, opportunity=opportunity, rdo=rdo, account=account
    )
    username = rdo.lead_source if rdo else opportunity.lead_source
    message = {"text": text, "channel": SLACK_CHANNEL, "icon_emoji": ":moneybag:"}

    send_slack_message(message, username=username)


def send_slack_message(message=None, username="moneybot"):

    if not ENABLE_SLACK or not message:
        return
    message["token"] = SLACK_API_KEY
    message["username"] = username
    url = "https://slack.com/api/chat.postMessage"
    try:
        response = requests.post(url, params=message)
        slack_response = json.loads(response.text)
        if not slack_response["ok"]:
            raise Exception(slack_response["error"])
    except Exception as e:
        logging.error(f"Failed to send Slack notification: {e}")


def construct_slack_attachment(
    email=None,
    donor=None,
    source=None,
    amount=None,
    period=None,
    donation_type=None,
    reason=None,
):
    """
    Not currently in use.
    """

    grav_hash = hashlib.md5(email.lower().encode("utf-8")).hexdigest()

    attachment = {
        "fallback": "Donation",
        "color": "good",
        # "pretext": "optional and appears above attachment"
        # # "text": "text",
        "author_name": donor,
        # author_link
        "author_icon": f"https://www.gravatar.com/avatar/{grav_hash}?s=16&r=g&default=robohash",
        "title": email,
        # "title_link":
        # "text": reason,
        # title_link
        "fields": [
            {"title": "Source", "value": source, "short": True},
            {"title": "Amount", "value": f"${amount}", "short": True},
            {"title": "Period", "value": period, "short": True},
            {"title": "Type", "value": donation_type, "short": True},
        ],
        # "image_url":
        # "thumb_url":
        # "footer":
        # "footer_icon":
        # "ts":
    }
    if reason:
        attachment["text"] = reason

    return attachment


def send_multiple_account_warning(contact):
    """
    Send the warnings about multiple accounts.
    """

    body = f"""
    Multiple accounts were found matching the email address <{contact.email}>
    while inserting a transaction.

    The transaction was attached to the first match found. You may want to
    move the transaction to the proper account if the one chosen is not
    correct. You may also want to delete or otherwise correct the duplicate
    account(s).
    """

    send_email(
        recipient=MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT,
        subject=f"Multiple accounts found for {contact.email}",
        body=body,
    )


def clean(form):
    """
    Clean up a form by converting strings to their 'None' or boolean equivalents and converting string numbers to their native types. Also makes None the response if the form is asked for a missing key.
    """
    result = defaultdict(lambda: None)
    for k, v in form.items():
        if v is None or v == "None":
            result[k] = None
            continue
        if v is True or v == "True":
            result[k] = True
            continue
        if v is False or v == "False":
            result[k] = False
            continue
        if isinstance(v, (int, float)):
            result[k] = v
            continue
        try:
            result[k] = int(v)
            continue
        except ValueError:
            try:
                result[k] = float(v)
                continue
            except ValueError:
                result[k] = v
    return result


def send_email(recipient, subject, body, sender=None):

    if sender is None:
        FROM = DEFAULT_MAIL_SENDER
    else:
        FROM = sender

    TO = recipient if type(recipient) is list else [recipient]
    SUBJECT = subject
    TEXT = body

    # Prepare actual message
    message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % (
        FROM,
        ", ".join(TO),
        SUBJECT,
        TEXT,
    )
    try:
        server = smtplib.SMTP(MAIL_SERVER, MAIL_PORT)
        server.ehlo()
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(FROM, TO, message)
        server.close()
        logging.debug("successfully sent the mail")
    except Exception as e:
        logging.error(f"failed to send mail: {e}")


def send_email_new_business_membership(account, contact):

    if not BUSINESS_MEMBER_RECIPIENT:
        raise Exception("BUSINESS_MEMBER_RECIPIENT must be specified")

    url = SalesforceConnection().instance_url

    body = f"A new business membership has been received for {account.name}:\n\n"

    body += f"{url}/{account.id}\n\n"
    if account.created:
        body += "A new account was created.\n\n"

    body += f"It was created by {contact.name}:\n\n"

    body += f"{url}/{contact.id}\n\n"

    if contact.created:
        body += "A new contact was created."

    logging.info(body)
    send_email(
        recipient=BUSINESS_MEMBER_RECIPIENT,
        subject="New business membership",
        body=body,
    )

def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
        for root_path, dirs, files in os.walk(folder)
        for f in files))


def update_fees(query, log, donation_type):
    sf = SalesforceConnection()
    response = sf.query(query)
    log.it('Found {} donations available to update fees.'.format(
        len(response)))

    for item in response:

        # salesforce connect
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)

        if donation_type == 'recurring':
            amount = float(item['npe03__Amount__c'])
        else:
            amount = float(item['Amount'])

        opp_id = item.get('Id')

        payment_type = item.get('payment_type')
        if item.get('payment_type') == 'American Express' or item.get('Card_type__c') == 'American Express' or item.get('Stripe_Payment_Type__c') == 'amex':
            payment_type = 'amex'
        elif item.get('payment_type') == 'ach' or item.get('Stripe_Payment_Type__c') == 'bank_account' or item.get('Stripe_Bank_Account__c') is not None:
            payment_type = 'bank_account'
        fees = charges.calculate_amount_fees(amount, payment_type, item.get('Stripe_Agreed_to_pay_fees__c', False))

        log.it('---- Updating fee value for {} to ${}'.format(opp_id, fees))

        update = {
            'Stripe_Transaction_Fee__c': fees
            }
        resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
        if resp.status_code == 204:
            log.it('salesforce updated with fee value')
        else:
            log.it('error updating salesforce with fee value')
            raise Exception('error')
        continue


def fail_expired_charges(query):
    sf = SalesforceConnection()
    response = sf.query(query)
    length = len(response)
    logging.info(f"Found {length} opportunities to set to Closed Lost.")

    for item in response:

        # salesforce connect
        path = item['attributes']['url']
        url = '{}{}'.format(sf.instance_url, path)

        opp_id = item.get('Id')
        stage_name = item.get('StageName')

        if stage_name == 'Failed':
            stage_name = "Closed Lost"
            logging.info(f"Updating opportunity ID {opp_id} StageName to {stage_name}")
            update = {
                'StageName': stage_name
                }
            resp = requests.patch(url, headers=sf.headers, data=json.dumps(update))
            if resp.status_code == 204:
                logging.info("Salesforce opportunity updated to Closed Lost")
            else:
                logging.info("Error updating Salesforce opportunity to Closed Lost")
                raise Exception('error')
        continue


def is_known_spam_email(email):

    if email in EMAIL_BAN_LIST:
        logging.info(f"Error: block from ban list. Email is {email}")
        return True

    response = query(email=email)
    if response != None:
        if response.email.appears:
            difference = datetime.utcnow() - response.email.lastseen
            if response.email.frequency > 2 and difference.days < 365:
                logging.info(f"Error: block from stopforumspam response. Email is {email}")
                return True

    api_url = step_one_url = f'{MINNPOST_ROOT}/wp-json/user-account-management/v1/check-account/?email={email}'
    logging.info("url is {api_url}")
    wordpress_response = requests.get(api_url)
    if wordpress_response != None:
        result = json.loads(wordpress_response.text)
        if 'status' in result:
            if result['status'] == 'spam':
                logging.info(f"Error: block from WordPress response. Email is {email}")
                return True

    return False
