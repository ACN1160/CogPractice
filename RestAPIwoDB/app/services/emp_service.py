class EmployeeService:
    def __init__(self, repo):
        self._repo = repo

    def get_employees(self):
        return self._repo.get_employees()

    def get_employee(self, employee_id):
        return self._repo.get_employee(employee_id)
