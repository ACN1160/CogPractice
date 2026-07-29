class CustomerService:
    def __init__(self, repo):
        self._repo = repo

    def get_customers(self):
        return self._repo.get_customers()

    def get_customer(self, customer_id):
        return self._repo.get_customer(customer_id)

    def add_customer(self, first_name, last_name, customer_email):
        customer_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": customer_email,
        }
        return self._repo.add_customer(customer_data)

    def update_customer(self, first_name, last_name, customer_email):
        return self._repo.update_customer(first_name, last_name, customer_email)
