from flask import Blueprint, abort, current_app, jsonify, make_response

Bank_main = Blueprint('main', __name__)


@Bank_main.route('/customers', methods=['GET'])
def customers():
    customers = current_app.cus_service.get_customers()
    return make_response(jsonify(customers))


@Bank_main.route('/customers/<int:id>', methods=['GET'])
def customer(id):
    customer = current_app.cus_service.get_customer(id)
    if customer is None:
        abort(404)
    return make_response(jsonify(customer))


@Bank_main.route('/employees', methods=['GET'])
def employees():
    employees = current_app.emp_service.get_employees()
    return make_response(jsonify(employees))


@Bank_main.route('/employees/<int:id>', methods=['GET'])
def employee(id):
    employee = current_app.emp_service.get_employee(id)
    if employee is None:
        abort(404)
    return make_response(jsonify(employee))


@Bank_main.route('/savings', methods=['GET'])
def savings():
    savings = current_app.sav_service.get_all()
    return make_response(jsonify(savings))


@Bank_main.route('/savings/<int:id>', methods=['GET'])
def saving(id):
    saving = current_app.sav_service.get_by_id(id)
    if saving is None:
        abort(404)
    return make_response(jsonify(saving))


@Bank_main.route('/checkings', methods=['GET'])
def checkings():
    checkings = current_app.check_service.get_all()
    return make_response(jsonify(checkings))


@Bank_main.route('/checkings/<int:id>', methods=['GET'])
def checking(id):
    checking = current_app.check_service.get_by_id(id)
    if checking is None:
        abort(404)
    return make_response(jsonify(checking))