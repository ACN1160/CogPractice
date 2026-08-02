from flask import current_app

class SavingsService:
    def __init__(self, repo):
        self._repo = repo

    def get_savings(self):
        return self._repo.get_all()

    def get_saving(self, saving_id):
        return self._repo.get_by_id(saving_id)

    def get_savingbycustomer(self, customer_id):
        return self._repo.get_by_customer(customer_id)

    def add_saving(self, id):
        customer_id = id
        if customer_id is None:
            raise ValueError('customer_id is required')

        customer = current_app.cus_service.get_customer(customer_id)
        if customer is None:
            raise ValueError('customer_id does not exist')

        saving_data = {
            'customer_id': customer_id,
            'amount': 0,
        }
        return self._repo.add_saving(saving_data)

    def update_saving(self, saving_id, data):
        amount = data.get('amount') if 'amount' in data else None
        customer_id = data.get('customer_id') if 'customer_id' in data else None
        return self._repo.update_saving(saving_id, amount, customer_id)

    def delete_saving(self, saving_id):
        return self._repo.delete_saving(saving_id)

    def deposit_saving(self, saving_id, amount):
        saving = self.get_saving(saving_id)
        if saving is None:
            return None
        new_amount = saving.amount + amount
        return self.update_saving(saving_id, {'amount': new_amount})

    def withdraw_saving(self, saving_id, amount):
        saving = self.get_saving(saving_id)
        if saving is None:
            return None
        new_amount = saving.amount - amount
        if new_amount < 0:
            raise ValueError('Insufficient funds')
        return self.update_saving(saving_id, {'amount': new_amount})
