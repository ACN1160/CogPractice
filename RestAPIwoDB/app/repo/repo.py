class CustomerRepository:
    def __init__(self):
        self._customers = {
            1: {"id": 1, "name": "Alice", "email": "alice@example.com"},
            2: {"id": 2, "name": "Bob", "email": "bob@example.com"},
            3: {"id": 3, "name": "Charlie", "email": "charlie@example.com"},
        }

    def get_customers(self):
        return list(self._customers.values())

    def get_customer(self, customer_id):
        return self._customers.get(customer_id)
