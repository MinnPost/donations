from flask_wtf import FlaskForm
from wtforms import validators
from wtforms.fields import (
    BooleanField,
    DecimalField,
    HiddenField,
    RadioField,
    StringField,
)
from wtforms.fields.html5 import EmailField


def strip_filter(value):
    if value is not None and hasattr(value, "strip"):
        return value.strip()
    return value


class BaseForm(FlaskForm):
    class Meta:
        def bind_field(self, form, unbound_field, options):
            filters = unbound_field.kwargs.get("filters", [])
            filters.append(strip_filter)
            return unbound_field.bind(form=form, filters=filters, **options)

    first_name = StringField(
        u"First name", [validators.required(message="Your first name is required.")]
    )
    last_name = StringField(
        u"Last name", [validators.required(message="Your last name is required.")]
    )
    amount = DecimalField(
        u"Amount",
        [
            validators.required(message="Please choose a donation amount."),
            validators.NumberRange(min=1),
        ],
    )
    stripeEmail = EmailField(
        "Email address", [validators.DataRequired(), validators.Email()]
    )
    stripeToken = HiddenField(u"Stripe token", [validators.InputRequired()])
    recaptchaToken = HiddenField(u"Recaptcha token", [validators.InputRequired()])
    description = HiddenField(u"Description", [validators.InputRequired()])
    pay_fees_value = HiddenField(
        u"Pay Fees Value", [validators.AnyOf(["True", "False"])]
    )
    reason = StringField(u"Encouraged to give by", [validators.Length(max=255)])
    campaign_id = HiddenField("Campaign ID", [validators.Length(max=18)])
    referral_id = HiddenField("Referral ID", [validators.Length(max=18)])


class DonateForm(BaseForm):
    installment_period = StringField(
        u"Installment Period", [validators.AnyOf(["yearly", "monthly", "None"])]
    )
    zipcode = StringField(u"ZIP Code", [validators.Length(max=5)])
