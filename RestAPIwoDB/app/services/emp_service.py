class EmployeeService:
    def __init__(self, repo):
        self._repo = repo

    def get_employees(self):
        return self._repo.get_employees()

    def get_employee(self, employee_id):
        return self._repo.get_employee(employee_id)

    def add_employee(self, data):
        first_name = data.get('firstname')
        last_name = data.get('lastname')
        email = data.get('email')
        hired_date = data.get('hired_date')

        employee_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'hired_date': hired_date,
        }
        return self._repo.add_employee(employee_data)

    def update_employee(self, employee_id, data):
        first_name = data.get('firstname') if 'firstname' in data else None
        last_name = data.get('lastname') if 'lastname' in data else None
        email = data.get('email') if 'email' in data else None
        hired_date = data.get('hired_date') if 'hired_date' in data else None
        return self._repo.update_employee(employee_id, first_name, last_name, email, hired_date)

    def delete_employee(self, employee_id):
        return self._repo.delete_employee(employee_id)
