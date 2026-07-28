from mongoengine import Document, ReferenceField, FloatField


class checkingAcc(Document):
    customer_id = ReferenceField("customers", required=True)
    amount = FloatField(required=True)

    meta = {"collection": "checkingAccounts"}

    def to_dict(self):
        return {
            "id": str(self.id),
            "customer_id": str(self.customer_id.id) if self.customer_id else None,
            "amount": self.amount,
        }
