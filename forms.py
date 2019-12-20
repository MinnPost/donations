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


class BaseForm(FlaskForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_whitespace)
            return unbound_field.bind(form=form, filters=filters, **options)

    first_name = StringField(
        u"First name", [validators.required(message="Your first name is required.")]
    )
    last_name = StringField(
        u"Last name", [validators.required(message="Your last name is required.")]
    )
    amount = StringField(
        u"Amount",
        validators=[
            validators.required(message="Please choose a donation amount."),
            validate_amount,
        ],
        filters=[format_amount],
    )
    email = EmailField(
        "Email address", [validators.DataRequired(), validators.Email()]
    )
    billing_zip = StringField(u"ZIP Code", [validators.Length(max=5)])
    stripeToken = HiddenField(u"Stripe token", [validators.InputRequired()])
    #recaptchaToken = HiddenField(u"Recaptcha token", [validators.InputRequired()])
    description = HiddenField(u"Description", [validators.InputRequired()])
    #reason = StringField(u"Encouraged to give by", [validators.Length(max=255)])
    campaign_id = HiddenField("Campaign ID", [validators.Length(max=18)])
    #referral_id = HiddenField("Referral ID", [validators.Length(max=18)])


class DonateForm(BaseForm):
    installment_period = StringField(
        u"Frequency", [validators.AnyOf(["yearly", "monthly", "one-time", "None"])]
    )
    pay_fees = BooleanField(
        u"Pay Fees?", false_values=(False, 'false', 0, '0', None, "None")
    )
    #billing_zip = StringField(u"ZIP Code", [validators.Length(max=5)])

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

