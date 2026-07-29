from app.models.customers import customers


class CustomerRepo():
    def get_customers(self):
        return customers.objects()
    def get_customer(self, cus_id):
        return customers.objects(id = cus_id).first()