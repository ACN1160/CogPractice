from app.models.customers import customers


class CustomerRepo():
    def get_customers(self):
        return customers.objects()
    def get_customer(self, cus_id):
        return customers.objects(id=cus_id).first()

    def add_customer(self, customer_data):
        customer = customers(**customer_data)
        customer.save()
        return customer