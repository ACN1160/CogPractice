from flask import abort, current_app, jsonify, make_response, request
from flask_jwt_extended import jwt_required
from app.controllers.main import Bank_main

@Bank_main.route('/savings', methods=['GET'])
@jwt_required()
def savings():
    savings = current_app.sav_service.get_savings()
    return make_response(jsonify([s.to_dict() for s in savings]))


@Bank_main.route('/savings/<string:id>', methods=['GET'])
@jwt_required()
def saving(id):
    saving = current_app.sav_service.get_saving(id)
    if saving is None:
        abort(404)
    return make_response(jsonify(saving.to_dict()))

@Bank_main.route('/savings/customer/<string:id>', methods=['GET'])
@jwt_required()
def savings_by_customer(id):
    savings_accounts = current_app.sav_service.get_savingbycustomer(id)
    return make_response(jsonify([s.to_dict() for s in savings_accounts]))


@Bank_main.route('/savings/<string:id>', methods=['POST'])
@jwt_required()
def add_saving(id):
    created_saving = current_app.sav_service.add_saving(id)
    if created_saving is None:
        abort(404)
    return make_response(jsonify(created_saving.to_dict()), 201)


@Bank_main.route('/savings/<string:id>', methods=['PUT'])
@jwt_required()
def update_saving(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_saving = current_app.sav_service.update_saving(id, data)
    if updated_saving is None:
        abort(404)
    return make_response(jsonify(updated_saving.to_dict()))


@Bank_main.route('/savings/<string:id>', methods=['DELETE'])
@jwt_required()
def delete_saving(id):
    deleted_saving = current_app.sav_service.delete_saving(id)
    if deleted_saving is None:
        abort(404)
    return make_response('', 204)

@Bank_main.route('/savings/<string:id>/deposit', methods=['POST'])
@jwt_required()
def deposit_saving(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    try:
        updated = current_app.sav_service.deposit_saving(id, data['amount'])
        if updated is None:
            abort(404)
        return make_response(jsonify(updated.to_dict()))
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@Bank_main.route('/savings/<string:id>/withdraw', methods=['POST'])
@jwt_required()
def withdraw_saving(id):
    data = request.get_json()
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    try:
        updated = current_app.sav_service.withdraw_saving(id, data['amount'])
        if updated is None:
            abort(404)
        return make_response(jsonify(updated.to_dict()))
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
