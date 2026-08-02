class EmployeeService:
    def __init__(self, repo):
        self._repo = repo

    def get_employees(self):
        return self._repo.get_employees()

    def get_employee(self, employee_id):
        return self._repo.get_employee(employee_id)

    def authenticate_employee(self, username, password):
        return self._repo.authenticate_employee(username, password)

    def add_employee(self, data):
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        hired_date = data.get('hired_date')
        username = data.get('username')
        password = data.get('password')

        employee_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'hired_date': hired_date,
            'username': username,
            'password': password,
        }
        return self._repo.add_employee(employee_data)

    def update_employee(self, employee_id, data):
        first_name = data.get('first_name') if 'first_name' in data else None
        last_name = data.get('last_name') if 'last_name' in data else None
        email = data.get('email') if 'email' in data else None
        hired_date = data.get('hired_date') if 'hired_date' in data else None
        username = data.get('username') if 'username' in data else None
        password = data.get('password') if 'password' in data else None
        return self._repo.update_employee(employee_id, first_name, last_name, email, hired_date, username, password)

    def delete_employee(self, employee_id):
        return self._repo.delete_employee(employee_id)
