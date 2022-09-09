import os
import re
import requests
import json as json
from decimal import Decimal, ROUND_HALF_UP

from flask_wtf import FlaskForm
from wtforms import validators
from wtforms.fields import (
    BooleanField,
    DecimalField,
    EmailField,
    HiddenField,
    RadioField,
    StringField,
    TextAreaField,
    SelectMultipleField,
)
from wtf_required_if import RequiredIf
from config import (
    RECAPTCHA_KEYS,
)


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
    stripe_maximum_value = 999999.99
    if value:
        if value.startswith("$"):
            value = value[1:]
        value = Decimal(re.sub("[^\d\.]", "", value))
        try:
            if value > stripe_maximum_value:
                value = stripe_maximum_value
            return value
        except ValueError:
            return None
    else:
        return 0


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
    secret = RECAPTCHA_KEYS["secret_key"]
    if secret != "":
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

    referring_page = HiddenField("Referring Page", [validators.Optional()], default="")
    customer_id = HiddenField("Customer ID", [validators.Optional()], default="")
    campaign = HiddenField("Campaign ID", [validators.Length(max=18)], default="")
    description = HiddenField(u"Description", [validators.Optional()], default="")
    stripe_payment_type = HiddenField(u"Stripe Payment Type", [validators.Optional()], default="")
    stripeToken = HiddenField(u"Stripe token", [validators.Optional()], default="")
    bankToken = HiddenField(u"Bank token", [validators.Optional()], default="")
    payment_method_id = HiddenField(u"Payment Method ID", [validators.Optional()], default="")
    recaptchaToken = HiddenField(u"Recaptcha token", [validators.Optional()], default="")
    update_default_source = HiddenField(u"Update default source?", [validators.Optional()], default="")
    fair_market_value = HiddenField(
        u"Fair Market Value",
        validators=[validators.Optional()],
        filters=[format_amount],
    )

    pay_fees = BooleanField(
        u"Pay Fees?", false_values=(False, 'false', 0, '0', None, "None")
    )

    amount = StringField(
        u"Amount",
        validators=[
            validators.InputRequired(message="Please choose a donation amount."),
            validate_amount,
        ],
        filters=[format_amount],
    )
    installment_period = StringField(
        u"Frequency", [validators.AnyOf(["yearly", "monthly", "one-time", "None"])], default=""
    )

    first_name = StringField(
        u"First name", [validators.InputRequired(message="Your first name is required.")]
    )
    last_name = StringField(
        u"Last name", [validators.InputRequired(message="Your last name is required.")]
    )
    
    # billing
    billing_street = StringField(
        u"Street Address", [validators.Optional()], default=""
    )
    billing_city = StringField(
        u"City", [validators.Optional()], default=""
    )
    billing_state = StringField(
        u"State", [validators.Optional()], default=""
    )
    billing_zip = StringField(
        u"ZIP Code", [validators.Optional()], default=""
    )
    billing_country = StringField(
        u"Country", [validators.Optional()], default=""
    )
    email = EmailField(
        "Email address", [validators.DataRequired(), validators.Email()]
    )


# used for getting a plaid token
class PlaidForm(BaseForm):
    public_token = StringField(
        u"Public token", [validators.InputRequired(message="Plaid requires a public token.")]
    )
    account_id = StringField(
        u"Account ID", [validators.InputRequired(message="Plaid requires an account ID.")]
    )


# used for the main donate flow from the website
class DonateForm(BaseForm):
    lock_key = HiddenField("Lock Key", [validators.Optional()], default="")
    display_as = StringField(
        u"Preferred name", [validators.Optional()], default=""
    )
    anonymous = BooleanField(
        u"Anonymous?", false_values=(False, 'false', 0, '0', None, "None")
    )
    in_honor_or_memory = RadioField(
        u"Honor or memory?", [validators.Optional()], choices=[('honor', 'In honor of'), ('memory', 'In memory of'), ('0', 'False')], default=None)
    in_honor_memory_of = StringField(
        u"Honor or memory of", [validators.Optional()], default=""
    )
    # swag
    # this needs to be updated if the swag options change
    member_benefit_request_swag = HiddenField(
        u"Swag choice", [validators.Optional(), validators.AnyOf(["mug", "water bottle"])], default=""
    )
    
    member_benefit_request_atlantic = HiddenField(
        u"The Atlantic subscription?", [validators.Optional(), validators.AnyOf(["yes", "no"])], default=""
    )
    member_benefit_request_atlantic_id = HiddenField("The Atlantic Subscriber ID", [validators.Optional()], default="")
    member_benefit_request_nyt = HiddenField(
        u"New York Times subscription?", [validators.Optional(), validators.AnyOf(["yes", "no"])], default=""
    )
    member_benefit_request_nyt_games = HiddenField(
        u"New York Times Games subscription?", [validators.Optional(), validators.AnyOf(["yes", "no"])], default=""
    )
    member_benefit_request_minnpost_tshirt = HiddenField(
        u"MinnPost T-Shirt?", [validators.Optional(), validators.AnyOf(["yes", "no"])], default=""
    )
    member_benefit_minnpost_tshirt_size = HiddenField("MinnPost T-Shirt Size", [validators.Optional()], default="")

    # billing
    billing_street = StringField(
        u"Street Address", [validators.InputRequired(message="Your billing street address is required.")]
    )
    billing_city = StringField(
        u"City", [validators.InputRequired(message="Your billing city is required.")]
    )
    #billing_state = StringField(
    #    u"State", [validators.InputRequired(message="Your billing state is required.")]
    #)
    billing_state = StringField(
        u"State", [RequiredIf(message="Your billing state is required.", billing_country="")]
    )
    #billing_zip = StringField(
    #    u"ZIP Code", [validators.InputRequired(message="Your billing zip code is required.")]
    #)
    billing_zip = StringField(
        u"ZIP Code", [RequiredIf(message="Your billing zip code is required if you are in the United States.", billing_country="")]
    )
    billing_country = StringField(
        u"Country", [validators.Optional()], default=""
    )

    # shipping
    shipping_name = StringField(
        u"Ship to", [validators.Optional()], default=""
    )
    shipping_street = StringField(
        u"Street Address", [validators.Optional()], default=""
    )
    shipping_city = StringField(
        u"City", [validators.Optional()], default=""
    )
    shipping_state = StringField(
        u"State", [validators.Optional()], default=""
    )
    shipping_zip = StringField(
        u"ZIP Code", [validators.Optional()], default=""
    )
    shipping_country = StringField(
        u"Country", [validators.Optional()], default=""
    )

# used for anniversary-patron, minnpost-default, minnroast-patron, other minimal donate forms
class MinimalForm(BaseForm):
    mrpledge_id = HiddenField("MrPledge ID", [validators.Optional()], default="")
    stage_name = HiddenField("Stage Name", [validators.Optional()], default="")
    close_date = HiddenField("Close Date", [validators.Optional()], default="")
    opportunity_id = HiddenField("Opportunity ID", [validators.Optional()], default="")
    recurring_id = HiddenField("Recurring Donation ID", [validators.Optional()], default="")
    opportunity_type = HiddenField("Opportunity Type", [validators.Optional()], default="")
    opportunity_subtype = HiddenField("Opportunity Sub-Type", [validators.Optional()], default="")
    redirect_url = HiddenField("Opportunity Type", [validators.Optional()], default="")
    display_as = StringField(
        u"Preferred name", [validators.Optional()], default=""
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
    folder = HiddenField("Folder", [validators.Optional()], default="")
    reason_for_supporting = TextAreaField(u'Reason For Supporting MinnPost')
    reason_shareable = BooleanField(
        u"Reason Shareable?", false_values=(False, 'false', 0, '0', None, "None")
    )


# used for minnpost-advertising
class AdvertisingForm(MinimalForm):
    invoice = StringField(
        u"Invoice #", [validators.InputRequired(message="Your invoice number is required."), validators.Length(max=18)]
    )
    client_organization = StringField(
        u"Organization", [validators.InputRequired(message="Your organization name is required.")]
    )


# used for minnpost-cancel
class CancelForm(BaseForm):
    path = HiddenField("Path", [validators.Optional()], default="")
    folder = HiddenField("Folder", [validators.Optional()], default="")

    stage_name = HiddenField("Stage Name", [validators.Optional()], default="")
    close_date = HiddenField("Close Date", [validators.Optional()], default="")
    opportunity_id = HiddenField("Opportunity ID", [validators.Optional()], default="")
    recurring_id = HiddenField("Recurring Donation ID", [validators.Optional()], default="")

    email_user_when_canceled = HiddenField("Email user when canceled?", [validators.Optional()], default="")
    open_ended_status = HiddenField("Open Ended Status", [validators.Optional()], default="")


# used for post-donate form with newsletter/testimonial options
class FinishForm(BaseForm):

    path = HiddenField("Path", [validators.Optional()], default="")
    folder = HiddenField("Folder", [validators.Optional()], default="")
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
