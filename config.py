# from celery.schedules import crontab
from datetime import timedelta

import os


def bool_env(val):
    """Replaces string based environment values with Python booleans"""
    return True if os.environ.get(val, False) == 'True' else False

TIMEZONE = os.getenv('TIMEZONE', "US/Central")

#######
# Flask
#
FLASK_SECRET_KEY = os.getenv('FLASK_SECRET_KEY', '\xa5\xcc\xff\x8dT\xea%W\xdb\xdd\x85>\xdae\xd85D\xb7\xd2\x11(U\xac\x08')

########
# Celery
#
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND')
CELERY_ALWAYS_EAGER = bool_env('CELERY_ALWAYS_EAGER')
CHARGE_MINUTES_FREQUENCY = int(os.getenv('CHARGE_MINUTES_FREQUENCY', 1440))
CELERYBEAT_SCHEDULE = {
        'every-day': {
            'task': 'batch.charge_cards',
            'schedule': timedelta(minutes=CHARGE_MINUTES_FREQUENCY)
            },
        }
######
# SMTP
#
MAIL_SERVER = os.getenv('MAIL_SERVER', 'localhost')
MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'user')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'pass')
MAIL_PORT = os.getenv('MAIL_PORT', '2525')
MAIL_USE_TLS = bool_env('MAIL_USE_TLS')
DEFAULT_MAIL_SENDER = os.getenv('DEFAULT_MAIL_SENDER', 'me@myplace.org')
MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT = os.getenv(
        'MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT', '')
ACCOUNTING_MAIL_RECIPIENT = os.getenv('ACCOUNTING_MAIL_RECIPIENT', '')

############
# Salesforce
#
MEMBERSHIP_RECORDTYPEID = '01216000001IhHp'
DONATION_RECORDTYPEID = '01216000001IhI9'
TEXASWEEKLY_RECORDTYPEID = '01216000001IhQNAA0'
SALESFORCE = {
    "CLIENT_ID": os.getenv('SALESFORCE_CLIENT_ID'),
    "CLIENT_SECRET": os.getenv('SALESFORCE_CLIENT_SECRET'),
    "USERNAME": os.getenv('SALESFORCE_USERNAME'),
    "PASSWORD": os.getenv('SALESFORCE_PASSWORD'),
    "HOST": os.getenv("SALESFORCE_HOST")
}
COMBINED_EMAIL_FIELD = os.getenv('COMBINED_EMAIL_FIELD', 'Consolidated_EMail__c')
FORM_EMAIL_FIELD = os.getenv('FORM_EMAIL_FIELD', 'email')
DEFAULT_CAMPAIGN = os.getenv('DEFAULT_CAMPAIGN')
SHOW_UPSELL = os.getenv('SHOW_UPSELL')

########
# Stripe
#
STRIPE_KEYS = {
    'secret_key': os.getenv('SECRET_KEY'),
    'publishable_key': os.getenv('PUBLISHABLE_KEY')
}

#######
# Slack
#
ENABLE_SLACK = bool_env('ENABLE_SLACK')
SLACK_CHANNEL = os.getenv('SLACK_CHANNEL', '#stripe')
SLACK_API_KEY = os.getenv('SLACK_API_KEY')

########
# Sentry
#
ENABLE_SENTRY = bool_env('ENABLE_SENTRY')
SENTRY_DSN = os.getenv('SENTRY_DSN')
