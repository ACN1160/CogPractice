class CustomerService:
    def __init__(self, repo):
        self._repo = repo

    def get_customers(self):
        return self._repo.get_customers()

    def get_customer(self, customer_id):
        return self._repo.get_customer(customer_id)

    def authenticate_customer(self, username, password):
        return self._repo.authenticate_customer(username, password)

    def add_customer(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        customer_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password,
        }
        return self._repo.add_customer(customer_data)

    def update_customer(self, id, data):
        first_name = data.get('first_name') if 'first_name' in data else None
        last_name = data.get('last_name') if 'last_name' in data else None
        email = data.get('email') if 'email' in data else None
        username = data.get('username') if 'username' in data else None
        password = data.get('password') if 'password' in data else None
        return self._repo.update_customer(id, first_name, last_name, email, username, password)

    def delete_customer(self, customer_id):
            return self._repo.delete_customer(customer_id)
