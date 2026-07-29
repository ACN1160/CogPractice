class CustomerService:
    def __init__(self, repo):
        self._repo = repo

    def get_customers(self):
        return self._repo.get_customers()

    def get_customer(self, customer_id):
        return self._repo.get_customer(customer_id)

    def add_customer(self, data):
        first_name = data.get('firstname')
        last_name = data.get('lastname')
        email = data.get('email')

        customer_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
        }
        return self._repo.add_customer(customer_data)

    def update_customer(self, id, data):
        first_name = data.get('firstname') if 'firstname' in data else None
        last_name = data.get('lastname') if 'lastname' in data else None
        email = data.get('email') if 'email' in data else None
        return self._repo.update_customer(id, first_name, last_name, email)
