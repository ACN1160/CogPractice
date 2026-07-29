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

    def update_customer(self, cus_id, first_name, last_name, customer_email):
        customer = customers.objects(id=cus_id).first()
        if customer is None:
            return None
        if first_name:
            customer.first_name = first_name
        if last_name:
            customer.last_name = last_name
        if customer_email:
            customer.email = customer_email
        customer.save()
        return customer