from app.models.employees import employees


class EmployeeRepo:
    def get_employees(self):
            return employees.objects()
    def get_employee(self, emp_id):
        return employees.objects(id = emp_id)
    
