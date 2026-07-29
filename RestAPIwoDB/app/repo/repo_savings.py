from app.models.savingsAcc import savingsAcc


class SavingsRepo:
    def get_all(self):
        return savingsAcc.objects()

    def get_by_id(self, saving_id):
        return savingsAcc.objects(id=saving_id).first()

    def add_saving(self, saving_data):
        saving = savingsAcc(**saving_data)
        saving.save()
        return saving

    def update_saving(self, saving_id, amount=None, customer_id=None):
        saving = savingsAcc.objects(id=saving_id).first()
        if saving is None:
            return None
        if amount is not None:
            saving.amount = amount
        if customer_id is not None:
            saving.customer_id = customer_id
        saving.save()
        return saving

    def delete_saving(self, saving_id):
        saving = savingsAcc.objects(id=saving_id).first()
        if saving is None:
            return None
        saving.delete()
        return saving
