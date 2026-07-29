from flask import abort, current_app, jsonify, make_response, request
from app.controllers.main import Bank_main

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


@Bank_main.route('/employees', methods=['POST'])
def add_employee():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    created_employee = current_app.emp_service.add_employee(data)
    return make_response(jsonify(created_employee.to_dict()), 201)


@Bank_main.route('/employees/<string:id>', methods=['PUT'])
def update_employee(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_employee = current_app.emp_service.update_employee(id, data)
    if updated_employee is None:
        abort(404)
    return make_response(jsonify(updated_employee.to_dict()))


@Bank_main.route('/employees/<string:id>', methods=['DELETE'])
def delete_employee(id):
    deleted_employee = current_app.emp_service.delete_employee(id)
    if deleted_employee is None:
        abort(404)
    return make_response('', 204)
