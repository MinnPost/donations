import os
import re
import requests
import simplejson as json
from decimal import Decimal, ROUND_HALF_UP

from flask_wtf import FlaskForm
from wtforms import validators
from wtforms.fields import (
    BooleanField,
    DecimalField,
    HiddenField,
    RadioField,
    StringField,
    TextAreaField,
    SelectMultipleField,
)
from wtforms.fields.html5 import EmailField

recaptcha_keys = os.environ.get("RECAPTCHA_KEYS", [])


# amount must be $1 or higher
def validate_amount(form, field):
    value = field.data
    if value is None:
        raise validators.ValidationError("Non-numeric amount provided")
    if value < 1:
        raise validators.ValidationError("Amount is less than 1")


# if value starts with a dollar sign, remove it
# then convert to a Decimal
def format_amount(value):
    if value:
        if value.startswith("$"):
            value = value[1:]
        try:
            return Decimal(re.sub("[^\d\.]", "", value))
        except ValueError:
            return None


# format the value of a swag item for inserting into Salesforce
def format_swag(value):
    if value is not None:
        if value == "waterbottle":
            value = "water bottle"
    return value



# format the value of a swag subscription for inserting into Salesforce
def format_swag_subscription(value):
    if value is not None and value == "true":
        value = "yes"
    else:
        value = ""
    return value


def strip_whitespace(value):
    if value is not None and hasattr(value, "strip"):
        return value.strip()
    return value


def is_human(captcha_response):
    """ Validating recaptcha response from google server.
        Returns True captcha test passed for the submitted form 
        else returns False.
    """
    secret = recaptcha_keys.get("secret_key", '')
    if secret is not '':
        payload = {'response':captcha_response, 'secret':secret}
        response = requests.post("https://www.google.com/recaptcha/api/siteverify", payload)
        response_text = json.loads(response.text)
        return response_text['success']


# all forms can inherit these options
class BaseForm(FlaskForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_whitespace)
            return unbound_field.bind(form=form, filters=filters, **options)

    referring_page = HiddenField("Referring Page", [validators.Optional()])
    customer_id = HiddenField("Customer ID", [validators.Optional()])
    campaign = HiddenField("Campaign ID", [validators.Length(max=18)])
    description = HiddenField(u"Description", [validators.Optional()])
    stripe_payment_type = HiddenField(u"Stripe Payment Type", [validators.Optional()])
    stripeToken = HiddenField(u"Stripe token", [validators.Optional()])
    bankToken = HiddenField(u"Bank token", [validators.Optional()])
    recaptchaToken = HiddenField(u"Recaptcha token", [validators.Optional()])
    update_default_source = HiddenField(u"Update default source?", [validators.Optional()])

    pay_fees = BooleanField(
        u"Pay Fees?", false_values=(False, 'false', 0, '0', None, "None")
    )

    amount = StringField(
        u"Amount",
        validators=[
            validators.required(message="Please choose a donation amount."),
            validate_amount,
        ],
        filters=[format_amount],
    )
    installment_period = StringField(
        u"Frequency", [validators.AnyOf(["yearly", "monthly", "one-time", "None"])]
    )

    first_name = StringField(
        u"First name", [validators.required(message="Your first name is required.")]
    )
    last_name = StringField(
        u"Last name", [validators.required(message="Your last name is required.")]
    )
    
    billing_street = StringField(
        u"Street Address", [validators.Optional()]
    )
    billing_city = StringField(
        u"City", [validators.Optional()]
    )
    billing_state = StringField(
        u"State", [validators.Optional()]
    )
    billing_zip = StringField(
        u"ZIP Code", [validators.Length(max=5)]
    )
    billing_country = StringField(
        u"Country", [validators.Optional()]
    )
    email = EmailField(
        "Email address", [validators.DataRequired(), validators.Email()]
    )


# used for getting a plaid token
class PlaidForm(BaseForm):
    public_token = StringField(
        u"Public token", [validators.required(message="Plaid requires a public token.")]
    )
    account_id = StringField(
        u"Account ID", [validators.required(message="Plaid requires an account ID.")]
    )


# used for the main donate flow from the website
class DonateForm(BaseForm):
    lock_key = HiddenField("Lock Key", [validators.Optional()])
    display_as = StringField(
        u"Preferred name", [validators.Optional()]
    )
    anonymous = BooleanField(
        u"Anonymous?", false_values=(False, 'false', 0, '0', None, "None")
    )
    in_honor_or_memory = RadioField(
        u"Honor or memory?", [validators.Optional()], choices=[('honor', 'In honor of'), ('memory', 'In memory of'), ('0', 'False')])
    in_honor_memory_of = StringField(
        u"Honor or memory of", [validators.Optional()]
    )
    # swag
    # this needs to be updated if the swag options change
    member_benefit_request_swag = HiddenField(
        u"Swag choice", [validators.Optional(), validators.AnyOf(["mug", "water bottle"])]
    )
    
    member_benefit_request_atlantic = HiddenField(
        u"The Atlantic subscription?", [validators.Optional(), validators.AnyOf(["yes", "no"])]
    )
    member_benefit_request_atlantic_id = HiddenField("The Atlantic Subscriber ID", [validators.Optional()])
    member_benefit_request_nyt = HiddenField(
        u"New York Times subscription?", [validators.Optional(), validators.AnyOf(["yes", "no"])]
    )

    # shipping
    shipping_name = StringField(
        u"Ship to", [validators.Optional()]
    )
    shipping_street = StringField(
        u"Street Address", [validators.Optional()]
    )
    shipping_city = StringField(
        u"City", [validators.Optional()]
    )
    shipping_state = StringField(
        u"State", [validators.Optional()]
    )
    shipping_zip = StringField(
        u"ZIP Code", [validators.Length(max=5)]
    )
    shipping_country = StringField(
        u"Country", [validators.Optional()]
    )

# used for anniversary-patron, minnpost-default, minnroast-patron, other minimal donate forms
class MinimalForm(BaseForm):
    pledge = HiddenField("Pledge", [validators.Optional()])
    stage_name = HiddenField("Stage Name", [validators.Optional()])
    close_date = HiddenField("Close Date", [validators.Optional()])
    opportunity_id = HiddenField("Opportunity ID", [validators.Optional()])
    recurring_id = HiddenField("Recurring Donation ID", [validators.Optional()])
    opportunity_type = HiddenField("Opportunity Type", [validators.Optional()])
    opportunity_subtype = HiddenField("Opportunity Sub-Type", [validators.Optional()])
    redirect_url = HiddenField("Opportunity Type", [validators.Optional()])
    display_as = StringField(
        u"Preferred name", [validators.Optional()]
    )
    anonymous = BooleanField(
        u"Anonymous?", false_values=(False, 'false', 0, '0', None, "None")
    )
    additional_donation = StringField(
        u"Additional Donation Amount",
        validators=[
            validators.Optional(),
            validate_amount,
        ],
        filters=[format_amount],
    )


# used for anniversary-patron, minnroast-patron, other sponsorship things
class SponsorshipForm(MinimalForm):
    folder = HiddenField("Folder", [validators.Optional()])
    fair_market_value = StringField(
        u"Fair Market Value",
        validators=[
            validators.Optional(),
            validate_amount,
        ],
        filters=[format_amount],
    )
    reason_for_supporting = TextAreaField(u'Reason For Supporting MinnPost')
    reason_shareable = BooleanField(
        u"Reason Shareable?", false_values=(False, 'false', 0, '0', None, "None")
    )


# used for minnpost-advertising
class AdvertisingForm(MinimalForm):
    invoice = StringField(
        u"Invoice #", [validators.required(message="Your invoice number is required.")]
    )
    client_organization = StringField(
        u"Organization", [validators.required(message="Your organization name is required.")]
    )


# used for minnpost-cancel
class CancelForm(MinimalForm):
    email_user_when_canceled = HiddenField("Email user when canceled?", [validators.Optional()])
    open_ended_status = HiddenField("Open Ended Status", [validators.Optional()])


# used for post-donate form with newsletter/testimonial options
class FinishForm(BaseForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_whitespace)
            return unbound_field.bind(form=form, filters=filters, **options)

    path = HiddenField("Path", [validators.Optional()])
    folder = HiddenField("Folder", [validators.Optional()])
    additional_donation = StringField(
        u"Additional Donation Amount",
        validators=[
            validators.Optional(),
            validate_amount,
        ],
        filters=[format_amount],
    )
    lock_key = HiddenField(u"Lock Key", [validators.InputRequired()])
    reason_for_supporting = TextAreaField(u'Reason For Supporting MinnPost')
    reason_shareable = BooleanField(
        u"Reason Shareable?", false_values=(False, 'false', 0, '0', None, "None")
    )
    groups_submitted = SelectMultipleField(u'Email Newsletters')
