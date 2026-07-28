from flask import Blueprint, abort, current_app, jsonify, make_response

Bank_main = Blueprint('main', __name__)

@Bank_main.route('/customers', methods=['GET'])
def customers():
    customers = current_app.customer_service.get_customers()
    return make_response(jsonify(customers))

@Bank_main.route('/customers/<int:id>', methods=['GET'])
def customer(id):
    customer = current_app.customer_service.get_customer(id)
    if customer is None:
        abort(404)
    return make_response(jsonify(customer))