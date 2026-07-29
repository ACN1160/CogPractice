from app.models.checkingAcc import checkingAcc


class CheckingRepo:
    def get_all(self):
        return checkingAcc.objects()

    def get_by_id(self, cus_id):
        return checkingAcc.objects(id=cus_id).first()
