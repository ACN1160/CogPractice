from app.models.checkingAcc import checkingAcc


class CheckingRepo:
    def get_all(self):
        return checkingAcc.objects()

    def get_by_id(self, checking_id):
        return checkingAcc.objects(id=checking_id).first()

    def get_by_customer(self, customer_id):
        return checkingAcc.objects(customer_id=customer_id)

    def add_checking(self, checking_data):
        checking = checkingAcc(**checking_data)
        checking.save()
        return checking

    def update_checking(self, checking_id, amount=None, customer_id=None):
        checking = checkingAcc.objects(id=checking_id).first()
        if checking is None:
            return None
        if amount is not None:
            checking.amount = amount
        if customer_id is not None:
            checking.customer_id = customer_id
        checking.save()
        return checking

    def delete_checking(self, checking_id):
        checking = checkingAcc.objects(id=checking_id).first()
        if checking is None:
            return None
        checking.delete()
        return checking
