Stripe-Salesforce
=================

This app is a fork of [https://github.com/texastribune/salesforce-stripe](https://github.com/texastribune/salesforce-stripe), created by Texas Tribune for their [donations app](http://support.texastribune.org/). It powers various methods of payment at MinnPost, most commonly with users starting at [https://www.minnpost.com/support/](https://www.minnpost.com/support/), although others start users in this app.

MinnPost's version has a few important differences:

- We have several different page types (donation, even registration, advertising payments, etc)
- We currently don't use Stripe Checkout (we use stripe.js instead; integrating Stripe into the UI)
- We have the option of using Plaid for ACH payments
- Some of our requests are synchronous where the original's are asynchronous
- Our tests are very out of date; we don't know Python well at all
- We have several different environment variables
- We store each transaction in a Postgres row, and we pass the ID to Salesforce. This is so we can track the post-transaction form (newsletter signups, reasons for giving) without putting that into the more important payment flow.

Getting Started
---------------

The recommended method for running this repo locally is to use [Docker](https://www.docker.com/). If you don't already have Docker set up, you'll want to [install Docker for Mac](https://docs.docker.com/engine/installation/mac/) to get a Docker environment set up on your computer.

You'll also need to have an `env` file set up with the environment variables for Stripe and Salesforce.

Running the Project
-------------------

Run `make backing`. This will start RabbitMQ and Redis.
Run `make interactive`. This will drop you into the Flask app.

Run `python3 app.py`. You should then be able to interact with the app at `docker.local` (or whatever you set Docker to resolve to).
```
# flower -A app.celery --port=5555 --address=0.0.0.0    # monitoring
C_FORCE_ROOT=True celery -A app.celery worker --loglevel=INFO &
celery beat --app app.celery &
# gunicorn app:app --log-file=- --bind=0.0.0.0:5000 --access-logfile=-
```

Restarting the batch process on Heroku
--------------------------------------

We've only seen this happen once, but apparently it is possible for the batch process in `batch.py` to fail and need to be rerun manually.

This can be done on the command line like this:

```
heroku run python batch.py --app app-name app.py
```

### Tests

Running tests
-------------

To run the project tests, run
`make interactive`
`py.test tests.py`
