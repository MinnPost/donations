import os

from celery.schedules import crontab

# from datetime import timedelta


def bool_env(val):
    """Replaces string based environment values with Python booleans"""
    return True if os.environ.get(val, False) == "True" else False


TIMEZONE = os.getenv("TIMEZONE", "US/Central")
EMAIL_BAN_LIST = os.getenv('EMAIL_BAN_LIST', "")

#######
# Flask
#
FLASK_SECRET_KEY = os.getenv("FLASK_SECRET_KEY")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", 0)
WTF_CSRF_ENABLED = False
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

########
# Celery
#

# default is 4am and 4pm:
BATCH_HOURS = os.getenv("BATCH_HOURS", "4, 16")
CELERY_TIMEZONE = TIMEZONE
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND")
CELERY_ALWAYS_EAGER = bool_env("CELERY_ALWAYS_EAGER")
# deprecated:
CELERYBEAT_SCHEDULE = {
    "charge-cards": {
        "task": "batch.charge_cards",
        "schedule": crontab(minute="0", hour=BATCH_HOURS),
    },
    "save-stripe-fee": {
        "task": "batch.save_stripe_fee",
        "schedule": crontab(minute="0", hour=BATCH_HOURS),
    },
    "update-failed-charges": {
        "task": "batch.update_failed_charges",
        "schedule": crontab(minute="0", hour=BATCH_HOURS),
    },
    "update-ach": {
        "task": "batch.update_ach_charges",
        "schedule": crontab(minute="0", hour=BATCH_HOURS),
    }
}
REDIS_URL = os.getenv("REDIS_URL")
REDIS_TLS_URL = os.getenv("REDIS_URL") # this doesn't work with our Celery yet

######
# SMTP
#
MAIL_SERVER = os.getenv("MAIL_SERVER", "localhost")
MAIL_USERNAME = os.getenv("MAIL_USERNAME", "user")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "pass")
MAIL_PORT = os.getenv("MAIL_PORT", "2525")
MAIL_USE_TLS = bool_env("MAIL_USE_TLS")
DEFAULT_MAIL_SENDER = os.getenv("DEFAULT_MAIL_SENDER", "me@myplace.org")
MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT = os.getenv(
    "MULTIPLE_ACCOUNT_WARNING_MAIL_RECIPIENT", ""
)
ACCOUNTING_MAIL_RECIPIENT = os.getenv("ACCOUNTING_MAIL_RECIPIENT", "")
BUSINESS_MEMBER_RECIPIENT = os.getenv("BUSINESS_MEMBER_RECIPIENT", "")

########
# Stripe
#
STRIPE_KEYS = {
    "secret_key": os.getenv("SECRET_KEY"),
    "publishable_key": os.getenv("PUBLISHABLE_KEY"),
}
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
UPDATE_STRIPE_FEES = bool_env('UPDATE_STRIPE_FEES')
STRIPE_API_VERSION = os.getenv("STRIPE_API_VERSION")

#######
# Slack
#
ENABLE_SLACK = bool_env("ENABLE_SLACK")
SLACK_CHANNEL = os.getenv("SLACK_CHANNEL", "#stripe")
SLACK_API_KEY = os.getenv("SLACK_API_KEY")

########
# Sentry
#
ENABLE_SENTRY = bool_env("ENABLE_SENTRY")
SENTRY_DSN = os.getenv("SENTRY_DSN")
SENTRY_ENVIRONMENT = os.getenv("SENTRY_ENVIRONMENT", "unknown")
REPORT_URI = os.getenv("REPORT_URI")

########
# Recaptcha
#
RECAPTCHA_KEYS = {
    "secret_key": os.getenv("RECAPTCHA_SECRET_KEY"),
    "site_key": os.getenv("RECAPTCHA_SITE_KEY"),
}
USE_RECAPTCHA = bool_env("USE_RECAPTCHA")

#######
# Portal
#
ENABLE_PORTAL = bool_env("ENABLE_PORTAL")

########
# Amazon
#
MWS_ACCESS_KEY = os.getenv("MWS_ACCESS_KEY", "")
MWS_SECRET_KEY = os.getenv("MWS_SECRET_KEY", "")
AMAZON_MERCHANT_ID = os.getenv("AMAZON_MERCHANT_ID", "")
AMAZON_SANDBOX = bool_env("AMAZON_SANDBOX")
AMAZON_CAMPAIGN_ID = os.getenv("AMAZON_CAMPAIGN_ID", "")

#######
# Tasks
#
# this is User.username
CIRCLE_FAILURE_RECIPIENT = os.getenv("CIRCLE_FAILURE_RECIPIENT")

CELERYD_LOG_FORMAT = "%(levelname)s %(name)s/%(module)s:%(lineno)d - %(message)s"
CELERYD_TASK_LOG_FORMAT = "%(levelname)s %(name)s/%(module)s:%(lineno)d - %(message)s"


########
# Auth0
#
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN", "auth.texastribune.org")
AUTH0_PORTAL_M2M_CLIENT_ID = os.getenv("AUTH0_PORTAL_M2M_CLIENT_ID", None)
AUTH0_PORTAL_M2M_CLIENT_SECRET = os.getenv("AUTH0_PORTAL_M2M_CLIENT_SECRET", None)
AUTH0_PORTAL_AUDIENCE = os.getenv(
    "AUTH0_PORTAL_AUDIENCE", "https://texastribune.org/portal"
)


########
# Bad Actor
#
BAD_ACTOR_API_URL = os.getenv("BAD_ACTOR_API_URL", None)
BAD_ACTOR_NOTIFICATION_URL = os.getenv("BAD_ACTOR_NOTIFICATION_URL", None)


########
# MinnPost Config values
#

########
# Plaid (for ACH)
#
PLAID_CLIENT_ID = os.getenv('PLAID_CLIENT_ID')
PLAID_SECRET = os.getenv('PLAID_SECRET')
PLAID_ENVIRONMENT = os.getenv('PLAID_ENVIRONMENT')
PLAID_API_VERSION = os.getenv('PLAID_API_VERSION')


########
# Salesforce
#
ADVERTISING_CAMPAIGN_ID = os.getenv('ADVERTISING_CAMPAIGN_ID')
ANNIVERSARY_PARTY_CAMPAIGN_ID = os.getenv('ANNIVERSARY_PARTY_CAMPAIGN_ID')
COMBINED_EMAIL_FIELD = os.getenv('COMBINED_EMAIL_FIELD', 'Consolidated_EMail__c')
DEFAULT_CAMPAIGN_ONETIME = os.getenv('DEFAULT_CAMPAIGN_ONETIME')
DEFAULT_CAMPAIGN_RECURRING = os.getenv('DEFAULT_CAMPAIGN_RECURRING')
FESTIVAL_CAMPAIGN_ID = os.getenv('FESTIVAL_CAMPAIGN_ID')
TONIGHT_CAMPAIGN_ID = os.getenv('TONIGHT_CAMPAIGN_ID')
MINNROAST_CAMPAIGN_ID = os.getenv('MINNROAST_CAMPAIGN_ID')
MERCHANDISE_SALES_CAMPAIGN_ID = os.getenv('MERCHANDISE_SALES_CAMPAIGN_ID')
SALESFORCE_CONTACT_ADVERTISING_EMAIL = os.getenv('SALESFORCE_CONTACT_ADVERTISING_EMAIL')
UPDATE_FAILED_CHARGES = os.getenv('UPDATE_FAILED_CHARGES', False)
SALESFORCE_ID_MAX_LENGTH = int(os.getenv('SALESFORCE_ID_MAX_LENGTH', 15))


########
# User Interface options
#
DEFAULT_FREQUENCY = os.getenv('DEFAULT_FREQUENCY', 'one-time')
MINNPOST_ROOT = os.getenv('MINNPOST_ROOT')
SHOW_ACH = bool_env("SHOW_ACH")
SHOW_PAYMENT_REQUEST = bool_env("SHOW_PAYMENT_REQUEST")

########
# Analytics options
#
GOOGLE_ANALYTICS_ID = os.getenv("GOOGLE_ANALYTICS_ID", "")
GOOGLE_ANALYTICS_TRACKING_CODE_TYPE = os.getenv("GOOGLE_ANALYTICS_TRACKING_CODE_TYPE", "")
