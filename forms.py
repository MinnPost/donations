from flask_wtf import FlaskForm

from wtforms.fields import StringField, HiddenField, BooleanField, DecimalField, TextAreaField, SelectMultipleField
from wtforms.fields import RadioField, SelectField
from wtforms import validators
from wtforms.fields.html5 import EmailField


class BaseForm(FlaskForm):
    first_name = StringField(u'First name',
        [validators.required(message="Your first name is required.")])
    last_name = StringField(u'Last name',
        [validators.required(message="Your last name is required.")])
    amount = DecimalField(u'Amount',
        [validators.required(message="Please choose a donation amount."),
        validators.NumberRange(min=1)])
    reason = StringField(u'Encouraged to contribute by')
    installment_period = HiddenField(u'Installment Period')
    installments = HiddenField(u'Installments')
    description = HiddenField(u'Description')
    pay_fees = BooleanField(u'Agree to pay fees')
    pay_fees_value = HiddenField(u'Pay Fees Value')


class MinnPostForm(FlaskForm):
    amount = HiddenField(u'Amount')
    campaign = HiddenField(u'Campaign')
    recurring = HiddenField(u'Frequency')
    pledge = HiddenField(u'Pledge ID')
    pay_fees = BooleanField(u'Agree to pay fees')

    in_honor_name = StringField(u'In Honor Of...')
    in_honor_notify = BooleanField(u'Notify Someone?')
    in_honor_email = StringField(u'In Honor Of [email]')
    in_honor_amount = BooleanField(u'Include Amount in Notification?')

    in_memory_name = StringField(u'In Memory Of...')
    in_memory_notify = BooleanField(u'Notify Someone?')
    in_memory_email = StringField(u'In Memory Of [email]')
    in_memory_amount = BooleanField(u'Include Amount in Notification?')

    swag = StringField(u'Swag')
    swag_atlanticsubscription = StringField(u'Atlantic Subscription')
    atlantic_id = StringField(u'Existing Atlantic ID')
    
    first_name = StringField(u'First',
        [validators.required(message="Your first name is required.")])
    last_name = StringField(u'Last',
        [validators.required(message="Your last name is required.")])

    edit_display_as = StringField(u'Display As')
    anonymous = BooleanField(u'Anonymous?')

    billing_street = StringField(u'Billing Street Address')
    billing_city = StringField(u'Billing City')
    billing_state = StringField(u'Billing State')
    billing_zip = StringField(u'Billing Zip/Postal Code')
    billing_country = StringField(u'Billing Country')

    shipping_street = StringField(u'Shipping Street Address')
    shipping_city = StringField(u'Shipping City')
    shipping_state = StringField(u'Shipping State')
    shipping_zip = StringField(u'Shipping Zip/Postal Code')
    shipping_country = StringField(u'Shipping Country')

    email = StringField(u'Email Address',
        [validators.required(message="Your email address is required.")])
    creatempaccount = BooleanField(u'Create MinnPost Account?')
    # do not pass the password through here so we can pass it to ajax

    additional_donation = DecimalField(u'Additional Donation', validators=[validators.Optional()])


class ConfirmForm(FlaskForm):
    reason_for_supporting = TextAreaField(u'Reason For Supporting MinnPost')
    reason_shareable = BooleanField(u'Reason Shareable?')
    newsletters = SelectMultipleField(u'Newsletters')
    other_messages = SelectMultipleField(u'Periodic MinnPost Messages')
    

class MemberForm(BaseForm):
    openended_status = RadioField(u'Membership Duration',
        choices=[('Open', 'Sustaining'), ('None', 'One Year')],
        default='Open')


class DonateForm(BaseForm):
    openended_status = HiddenField(u'Openended Status')


class BlastForm(FlaskForm):
    first_name = StringField(u'First name',
        [validators.required(message="Your first name is required.")])
    last_name = StringField(u'Last name',
        [validators.required(message="Your last name is required.")])
    amount_choices = [
        ('349', 'Annual ($349)'),
        ('325', 'Annual Tax-Exempt ($325 — For government agencies and nonprofit organizations)'),
        ('40', 'Monthly ($40)'),
        ]
    amount = SelectField(u'Amount', choices=amount_choices)
    subscriber_email = EmailField('Subscriber Email address',
        [validators.DataRequired(), validators.Email()])
    installment_period = HiddenField(u'Installment Period')
    installments = HiddenField(u'Installments')
    openended_status = HiddenField(u'Openended Status')
    description = HiddenField(u'Description')
    pay_fees = BooleanField(u'Agree to pay fees')
    pay_fees_value = HiddenField(u'Pay Fees Value')
