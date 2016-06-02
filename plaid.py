from datetime import datetime, timedelta
import json
import redis

#from flask import jsonify

import requests

from salesforce import SalesforceConnection

from config import PLAID_CLIENT_ID
from config import PLAID_SECRET
from config import PLAID_PUBLIC_KEY
from config import PLAID_ENVIRONMENT

from check_response import check_response


def get_bank_token(public_token=None, account_id=None):
    """
    Call the Plaid API to get a bank account
    """

    # production url is api not production
    if PLAID_ENVIRONMENT == 'production':
        subdomain = 'api'
    else:
        subdomain = PLAID_ENVIRONMENT

    url = 'https://{}.plaid.com/{}'.format(subdomain, 'exchange_token')

    print('url is {}. now make request with public token {}'.format(url, public_token))

    request = {'client_id' : PLAID_CLIENT_ID, 'secret' : PLAID_SECRET, 'public_token' : public_token, 'account_id' : account_id}
    print('created the request')
    resp = requests.post(url, request)
    print('response below')
    print(resp)
    response = json.loads(resp.text)
    print('load it with json')
    print(response)
    print('now return it')
    check_response(response=resp, expected_status=200)
    return response