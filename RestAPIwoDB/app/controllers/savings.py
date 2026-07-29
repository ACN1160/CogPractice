from flask import abort, current_app, jsonify, make_response, request
from app.controllers.main import Bank_main

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


@Bank_main.route('/savings/<string:id>', methods=['POST'])
def add_saving(id):
    created_saving = current_app.sav_service.add_saving(id)
    if created_saving is None:
        abort(404)
    return make_response(jsonify(created_saving.to_dict()), 201)


@Bank_main.route('/savings/<string:id>', methods=['PUT'])
def update_saving(id):
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'No data provided'}), 400)
    updated_saving = current_app.sav_service.update_saving(id, data)
    if updated_saving is None:
        abort(404)
    return make_response(jsonify(updated_saving.to_dict()))


@Bank_main.route('/savings/<string:id>', methods=['DELETE'])
def delete_saving(id):
    deleted_saving = current_app.sav_service.delete_saving(id)
    if deleted_saving is None:
        abort(404)
    return make_response('', 204)
