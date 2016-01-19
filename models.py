from core import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String())
    sf_id = db.Column(db.String())

    def __init__(self, transaction_id, sf_id):
        self.transaction_id = transaction_id
        self.sf_id = sf_id

    def __repr__(self):
        return '<Transaction %r>'.format(self.id)