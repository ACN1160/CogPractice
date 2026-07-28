class CustomerService:
    def __init__(self, repo):
        self._repo = repo

    def get_customers(self):
        return self._repo.get_customers()

    def get_customer(self, customer_id):
        return self._repo.get_customer(customer_id)
