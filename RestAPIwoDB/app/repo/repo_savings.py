from app.models.savingsAcc import savingsAcc


class SavingsRepo:
    def get_all(self):
        return savingsAcc.objects()

    def get_by_id(self, cus_id):
        return savingsAcc.objects(id=cus_id).first()
