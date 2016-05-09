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
    url = 'https://{}.plaid.com/{}'.format(PLAID_ENVIRONMENT, 'exchange_token')

    #print('url is {}'.format(url))

    request = {'client_id' : PLAID_CLIENT_ID, 'secret' : PLAID_SECRET, 'public_token' : public_token, 'account_id' : account_id}

    resp = requests.post(url, request)
    response = json.loads(resp.text)
    #print(response)
    check_response(response=resp, expected_status=200)
    return response