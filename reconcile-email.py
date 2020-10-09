import os
from config import
STRIPE_KEYS,
COMBINED_EMAIL_FIELD
from time import sleep

import stripe
from salesforce_bulk import SalesforceBulk
from simple_salesforce import Salesforce

stripe.api_key = STRIPE_KEYS["secret_key"]
stripe.api_version = "2020-08-27"

# get Stripe emails
customers = stripe.Customer.list(limit=100)
stripe_emails = set(
    (x["email"].lower() for x in customers.auto_paging_iter() if x["email"])
)

# then compare to SF
query = f"""
            SELECT {COMBINED_EMAIL_FIELD}
            FROM Contact
        """

SALESFORCE = {
    "USERNAME": os.getenv("SALESFORCE_USERNAME"),
    "PASSWORD": os.getenv("SALESFORCE_PASSWORD"),
    "HOST": os.getenv("SALESFORCE_HOST"),
    "TOKEN": os.getenv("SALESFORCE_TOKEN"),
    "CLIENT_ID": os.getenv("SALESFORCE_CLIENT_ID"),
    "CLIENT_SECRET": os.getenv("SALESFORCE_CLIENT_SECRET"),
}

USER = SALESFORCE["USERNAME"]
PASS = SALESFORCE["PASSWORD"]
TOKEN = SALESFORCE["TOKEN"]
HOST = SALESFORCE["HOST"]

sf = Salesforce(username=USER, password=PASS, security_token=TOKEN)

bulk = SalesforceBulk(sessionId=sf.session_id, host=HOST)

job = bulk.create_query_job("Contact", contentType="CSV")

batch = bulk.query(job, query)
while not bulk.is_batch_done(job, batch):
    sleep(3)
bulk.close_job(job)

rows = bulk.get_batch_result_iter(job, batch, parse_csv=True)
bulk_email = list(rows)
email_list = []
emails_sf = [x[COMBINED_EMAIL_FIELD] for x in bulk_email]
print ("The following email addresses appear in Stripe but not Salesforce: \n")
for field in emails_sf:
    for email in field.split(","):
        if email != "":
            email_list.append(email.strip())
diff = stripe_emails.difference(email_list)
for item in diff:
    print(item)
