web: gunicorn app:app --log-file=-
worker: celery -A app.celery worker --without-gossip --without-mingle --without-heartbeat --loglevel=INFO
