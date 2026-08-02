class CheckingService:
    def __init__(self, repo):
        self._repo = repo

    def get_checkings(self):
        return self._repo.get_all()

    def get_checking(self, checking_id):
        return self._repo.get_by_id(checking_id)

    def get_checkingbycustomer(self, customer_id):
        return self._repo.get_by_customer(customer_id)

    def add_checking(self, id):
        customer_id = id
        if customer_id is None:
            raise ValueError('customer_id is required')
        checking_data = {
            'customer_id': customer_id,
            'amount': 0,
        }
        return self._repo.add_checking(checking_data)

    def update_checking(self, checking_id, data):
        amount = data.get('amount') if 'amount' in data else None
        customer_id = data.get('customer_id') if 'customer_id' in data else None
        return self._repo.update_checking(checking_id, amount, customer_id)

    def delete_checking(self, checking_id):
        return self._repo.delete_checking(checking_id)

    def deposit_checking(self, checking_id, amount):
        checking = self.get_checking(checking_id)
        if checking is None:
            return None
        new_amount = checking.amount + amount
        return self.update_checking(checking_id, {'amount': new_amount})

    def withdraw_checking(self, checking_id, amount):
        checking = self.get_checking(checking_id)
        if checking is None:
            return None
        new_amount = checking.amount - amount
        if new_amount < 0:
            raise ValueError('Insufficient funds')
        return self.update_checking(checking_id, {'amount': new_amount})
