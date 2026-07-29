from flask import abort, current_app, jsonify, make_response, request
from app.controllers.main import Bank_main

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


@Bank_main.route('/customers', methods=['POST'])
def add_customer():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    created_customer = current_app.cus_service.add_customer(data)
    return make_response(jsonify(created_customer.to_dict()), 201)


@Bank_main.route('/customers/<string:id>', methods=['PUT'])
def update_customer(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_customer = current_app.cus_service.update_customer(id, data)
    if updated_customer is None:
        abort(404)
    return make_response(jsonify(updated_customer.to_dict()))


@Bank_main.route('/customers/<string:id>', methods=['DELETE'])
def delete_customer(id):
    deleted_customer = current_app.cus_service.delete_customer(id)
    if deleted_customer is None:
        abort(404)
    return make_response('', 204)
