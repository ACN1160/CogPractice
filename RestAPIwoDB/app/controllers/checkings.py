from flask import abort, current_app, jsonify, make_response, request
from flask_jwt_extended import jwt_required
from app.controllers.main import Bank_main

@Bank_main.route('/checkings', methods=['GET'])
@jwt_required()
def checkings():
    checkings = current_app.check_service.get_checkings()
    return make_response(jsonify([c.to_dict() for c in checkings]))


@Bank_main.route('/checkings/<string:id>', methods=['GET'])
@jwt_required()
def checking(id):
    checking = current_app.check_service.get_checking(id)
    if checking is None:
        abort(404)
    return make_response(jsonify(checking.to_dict()))

@Bank_main.route('/checkings/customer/<string:id>', methods=['GET'])
@jwt_required()
def checkings_by_customer(id):
    checking_accounts = current_app.check_service.get_checkingbycustomer(id)
    return make_response(jsonify([c.to_dict() for c in checking_accounts]))


@Bank_main.route('/checkings/<string:id>', methods=['POST'])
@jwt_required()
def add_checking(id):
    created_checking = current_app.check_service.add_checking(id)
    if created_checking is None:
        abort(404)
    return make_response(jsonify(created_checking.to_dict()), 201)


@Bank_main.route('/checkings/<string:id>', methods=['PUT'])
@jwt_required()
def update_checking(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_checking = current_app.check_service.update_checking(id, data)
    if updated_checking is None:
        abort(404)
    return make_response(jsonify(updated_checking.to_dict()))


@Bank_main.route('/checkings/<string:id>', methods=['DELETE'])
@jwt_required()
def delete_checking(id):
    deleted_checking = current_app.check_service.delete_checking(id)
    if deleted_checking is None:
        abort(404)
    return make_response('', 204)

@Bank_main.route('/checkings/<string:id>/deposit', methods=['POST'])
@jwt_required()
def deposit_checking(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    try:
        updated = current_app.check_service.deposit_checking(id, data['amount'])
        if updated is None:
            abort(404)
        return make_response(jsonify(updated.to_dict()))
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@Bank_main.route('/checkings/<string:id>/withdraw', methods=['POST'])
@jwt_required()
def withdraw_checking(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    try:
        updated = current_app.check_service.withdraw_checking(id, data['amount'])
        if updated is None:
            abort(404)
        return make_response(jsonify(updated.to_dict()))
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
