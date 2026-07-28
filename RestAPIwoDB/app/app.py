from flask import Flask
from app.config import getconfig
from app.controllers.controller import Bank_main
from app.repo.repo import CustomerRepository
from app.services.service import CustomerService


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(getconfig())

    app.customers = CustomerRepository()
    app.customer_service = CustomerService(app.customers)

    app.register_blueprint(Bank_main, url_prefix='/api/v1')
    return app
