Stripe-Salesforce
=================

This app is a fork of [https://bitbucket.org/texastribune/salesforce-stripe](https://bitbucket.org/texastribune/salesforce-stripe), created by Texas Tribune for their [donations app](http://support.texastribune.org/).

MinnPost's version has a few important differences:

- We have several different page types (donation, even registration, advertising payments, etc)
- We currently don't use Stripe Checkout (we use stripe.js instead; integrating Stripe into the UI)
- We have the option of using Plaid for ACH payments
- Some of our requests are synchronous where the original's are asynchronous
- Our tests are very out of date; we don't know Python well at all
- We have several different environment variables

Getting Started
---------------

This repo can be run locally with [Docker](https://www.docker.com/) and [Docker Toolbox](https://www.docker.com/docker-toolbox), or simply with [Heroku Local](https://devcenter.heroku.com/articles/heroku-local).

You'll also need to have an `env` file set up with the environment variables for Stripe and Salesforce.

Running the Project
-------------------

Run `make interactive`. This will drop you into the Flask app.

Run `python3 app.py`. You should then be able to interact with the app at `docker.local` (or whatever you set Docker to resolve to).
```
flower -A app.celery --port=5555 --address=0.0.0.0    # monitoring
C_FORCE_ROOT=True celery -A app.celery worker --loglevel=INFO &
celery beat --app app.celery &
gunicorn app:app --log-file=- --bind=0.0.0.0:5000 --access-logfile=-
```

### Tests

Running tests
-------------

To run the project tests, run
`make interactive`
`py.test tests.py`
