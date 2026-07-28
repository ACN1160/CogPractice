from flask import Blueprint, current_app, jsonify, make_response

customers = Blueprint('main', __name__)

@customers.route('/', methods=['GET'])
def customers():
    customers = current_app.customer_service.get_customers()
    return make_response(jsonify(customers))