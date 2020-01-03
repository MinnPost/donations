import re
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


# amount must be $1 or higher
def validate_amount(form, field):
    value = field.data
    if value is None:
        raise validators.ValidationError("Non-numeric amount provided")
    if value < 1:
        raise validators.ValidationError("Amount is less than 1")


# if value starts with a dollar sign, remove it
# then convert to a float
def format_amount(value):
    if value is not None:
        if value.startswith("$"):
            value = value[1:]
        try:
            return Decimal(re.sub("[^\d\.]", "", value))
        except ValueError:
            return None


def strip_whitespace(value):
    if value is not None and hasattr(value, "strip"):
        return value.strip()
    return value


# all forms can inherit these options
class BaseForm(FlaskForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_whitespace)
            return unbound_field.bind(form=form, filters=filters, **options)

    source = HiddenField("Source", [validators.Optional()])
    customer_id = HiddenField("Customer ID", [validators.Optional()])
    campaign = HiddenField("Campaign ID", [validators.Length(max=18)])
    description = HiddenField(u"Description", [validators.InputRequired()])

    amount = StringField(
        u"Amount",
        validators=[
            validators.required(message="Please choose a donation amount."),
            validate_amount,
        ],
        filters=[format_amount],
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
    stripeToken = HiddenField(u"Stripe token", [validators.Optional()])
    bankToken = HiddenField(u"Bank token", [validators.Optional()])
    recaptchaToken = HiddenField(u"Recaptcha token", [validators.Optional()])
    update_default_source = HiddenField(u"Update default source?", [validators.Optional()])


# used for the main donate flow from the website
class DonateForm(BaseForm):
    lock_key = HiddenField("Lock Key", [validators.Optional()])
    installment_period = StringField(
        u"Frequency", [validators.AnyOf(["yearly", "monthly", "one-time", "None"])]
    )
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

    pay_fees = BooleanField(
        u"Pay Fees?", false_values=(False, 'false', 0, '0', None, "None")
    )


# used for anniversary-patron, minnpost-default, minnroast-patron, other minimal donate forms
class MinimalForm(BaseForm):
    pledge = HiddenField("Pledge", [validators.Optional()])
    stage = HiddenField("Stage Name", [validators.Optional()])
    close_date = HiddenField("Close Date", [validators.Optional()])
    opp_id = HiddenField("Opportunity ID", [validators.Optional()])
    recurring_id = HiddenField("Recurring Donation ID", [validators.Optional()])
    opp_type = HiddenField("Opportunity Type", [validators.Optional()])
    opp_subtype = HiddenField("Opportunity Sub-Type", [validators.Optional()])
    redirect_url = HiddenField("Opportunity Type", [validators.Optional()])
    display_as = StringField(
        u"Preferred name", [validators.Optional()]
    )
    anonymous = BooleanField(
        u"Anonymous?", false_values=(False, 'false', 0, '0', None, "None")
    )


# used for anniversary-patron, minnroast-patron, other sponsorship things
class SponsorshipForm(MinimalForm):
    additional_amount = StringField(
        u"Additional Donation",
        validators=[
            validators.Optional(),
            validate_amount,
        ],
        filters=[format_amount],
    )


# used for minnpost-advertising
class AdvertisingForm(MinimalForm):
    minnpost_invoice = StringField(
        u"Invoice #", [validators.required(message="Your invoice number is required.")]
    )
    client_organization = StringField(
        u"Organization", [validators.required(message="Your organization name is required.")]
    )


# used for minnpost-cancel
class CancelForm(MinimalForm):
    email_user_when_canceled = HiddenField("Email user when canceled?", [validators.Optional()])
    sf_id = HiddenField(u"Salesforce ID", [validators.InputRequired()])
    sf_type = HiddenField(u"Salesforce Object Type", [validators.InputRequired()])


# used for post-donate form with newsletter/testimonial options
class FinishForm(FlaskForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_whitespace)
            return unbound_field.bind(form=form, filters=filters, **options)
    lock_key = HiddenField(u"Lock Key", [validators.InputRequired()])
    reason_for_supporting = TextAreaField(u'Reason For Supporting MinnPost')
    reason_shareable = BooleanField(
        u"Reason Shareable?", false_values=(False, 'false', 0, '0', None, "None")
    )
    daily_newsletter = BooleanField(
        u"Daily Newsletter?", false_values=(False, 'false', 0, '0', None, "None")
    )
    sunday_review_newsletter = BooleanField(
        u"Sunday Review?", false_values=(False, 'false', 0, '0', None, "None")
    )
    greater_mn_newsletter = BooleanField(
        u"Greater MN Newsletter?", false_values=(False, 'false', 0, '0', None, "None")
    )
    dc_memo = BooleanField(
        u"DC Memo?", false_values=(False, 'false', 0, '0', None, "None")
    )
    event_messages = BooleanField(
        u"Events & Membership Messages?", false_values=(False, 'false', 0, '0', None, "None")
    )
    feedback_messages = BooleanField(
        u"Feedback opportunities?", false_values=(False, 'false', 0, '0', None, "None")
    )

