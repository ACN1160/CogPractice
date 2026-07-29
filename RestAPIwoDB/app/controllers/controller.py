from flask import Blueprint, abort, current_app, jsonify, make_response

Bank_main = Blueprint('main', __name__)


@Bank_main.route('/customers', methods=['GET'])
def customers():
    customers = current_app.cus_service.get_customers()
    return make_response(jsonify([c.to_dict() for c in customers]))


@Bank_main.route('/customers/<string:id>', methods=['GET'])
def customer(id):
    customer = current_app.cus_service.get_customer(id)
    if customer is None:
        abort(404)
    return make_response(jsonify(customer.to_dict()))


@Bank_main.route('/employees', methods=['GET'])
def employees():
    employees = current_app.emp_service.get_employees()
    return make_response(jsonify([e.to_dict() for e in employees]))


@Bank_main.route('/employees/<string:id>', methods=['GET'])
def employee(id):
    employee = current_app.emp_service.get_employee(id)
    if employee is None:
        abort(404)
    return make_response(jsonify(employee.to_dict()))


@Bank_main.route('/savings', methods=['GET'])
def savings():
    savings = current_app.sav_service.get_savings()
    return make_response(jsonify([s.to_dict() for s in savings]))


@Bank_main.route('/savings/<string:id>', methods=['GET'])
def saving(id):
    saving = current_app.sav_service.get_saving(id)
    if saving is None:
        abort(404)
    return make_response(jsonify(saving.to_dict()))


@Bank_main.route('/checkings', methods=['GET'])
def checkings():
    checkings = current_app.check_service.get_checkings()
    return make_response(jsonify([c.to_dict() for c in checkings]))


@Bank_main.route('/checkings/<string:id>', methods=['GET'])
def checking(id):
    checking = current_app.check_service.get_checking(id)
    if checking is None:
        abort(404)
    return make_response(jsonify(checking.to_dict()))