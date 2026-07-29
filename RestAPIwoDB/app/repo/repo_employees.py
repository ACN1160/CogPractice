from app.models.employees import employees


class EmployeeRepo:
    def get_employees(self):
        return employees.objects()

    def get_employee(self, emp_id):
        return employees.objects(id=emp_id).first()

    def add_employee(self, employee_data):
        employee = employees(**employee_data)
        employee.save()
        return employee

    def update_employee(self, emp_id, first_name=None, last_name=None, email=None, hired_date=None):
        employee = employees.objects(id=emp_id).first()
        if employee is None:
            return None
        if first_name is not None:
            employee.first_name = first_name
        if last_name is not None:
            employee.last_name = last_name
        if email is not None:
            employee.email = email
        if hired_date is not None:
            employee.hired_date = hired_date
        employee.save()
        return employee

    def delete_employee(self, emp_id):
        employee = employees.objects(id=emp_id).first()
        if employee is None:
            return None
        employee.delete()
        return employee
