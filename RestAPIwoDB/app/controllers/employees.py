from flask import abort, current_app, jsonify, make_response, request
from flask_jwt_extended import create_access_token, jwt_required
from app.controllers.main import Bank_main

@Bank_main.route('/employees', methods=['GET'])
@jwt_required()
def employees():
    employees = current_app.emp_service.get_employees()
    return make_response(jsonify([e.to_dict() for e in employees]))


@Bank_main.route('/employees/<string:id>', methods=['GET'])
@jwt_required()
def employee(id):
    employee = current_app.emp_service.get_employee(id)
    if employee is None:
        abort(404)
    return make_response(jsonify(employee.to_dict()))


@Bank_main.route('/employees/login', methods=['POST'])
def login_employee():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    employee = current_app.emp_service.authenticate_employee(data['username'], data['password'])
    if employee is None:
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(employee.id), additional_claims={'role': 'employee'})
    return make_response(jsonify({**employee.to_dict(), 'access_token': token}), 200)


@Bank_main.route('/employees', methods=['POST'])
@jwt_required()
def add_employee():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    created_employee = current_app.emp_service.add_employee(data)
    return make_response(jsonify(created_employee.to_dict()), 201)


@Bank_main.route('/employees/<string:id>', methods=['PUT'])
@jwt_required()
def update_employee(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_employee = current_app.emp_service.update_employee(id, data)
    if updated_employee is None:
        abort(404)
    return make_response(jsonify(updated_employee.to_dict()))


@Bank_main.route('/employees/<string:id>', methods=['DELETE'])
@jwt_required()
def delete_employee(id):
    deleted_employee = current_app.emp_service.delete_employee(id)
    if deleted_employee is None:
        abort(404)
    return make_response('', 204)
