from app.models.customers import customers


class CustomerRepo():
    def get_customers(self):
        return customers.objects()

    def get_customer(self, cus_id):
        return customers.objects(id=cus_id).first()

    def authenticate_customer(self, username, password):
        customer = customers.objects(username=username).first()
        if customer and customer.password == password:
            return customer
        return None

    def add_customer(self, customer_data):
        customer = customers(**customer_data)
        customer.save()
        return customer

    def update_customer(self, cus_id, first_name, last_name, customer_email, username=None, password=None):
        customer = customers.objects(id=cus_id).first()
        if customer is None:
            return None
        if first_name:
            customer.first_name = first_name
        if last_name:
            customer.last_name = last_name
        if customer_email:
            customer.email = customer_email
        if username:
            customer.username = username
        if password:
            customer.password = password
        customer.save()
        return customer

    def delete_customer(self, cus_id):
        customer = customers.objects(id=cus_id).first()
        if customer is None:
            return None
        customer.delete()
        return customer