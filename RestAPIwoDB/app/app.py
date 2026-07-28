from flask import Flask
from app.config import getconfig
from app.controllers.controller import Bank_main
from app.repo.repo_checking import CheckingRepo
from app.repo.repo_customers import CustomerRepo
from app.repo.repo_employees import EmployeeRepo
from app.repo.repo_savings import SavingsRepo
from app.services.check_service import CheckingService
from app.services.cus_service import CustomerService
from app.services.emp_service import EmployeeService
from app.services.sav_service import SavingsService
from app.extensions import init_db


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(getconfig())

    app.customers = CustomerRepo()
    app.employees = EmployeeRepo()
    app.savings = SavingsRepo()
    app.checkings = CheckingRepo()

    app.cus_service = CustomerService(app.customers)
    app.emp_service = EmployeeService(app.employees)
    app.sav_service = SavingsService(app.savings)
    app.check_service = CheckingService(app.checkings)

    init_db(app)

    app.register_blueprint(Bank_main, url_prefix='/api/v1')
    return app
