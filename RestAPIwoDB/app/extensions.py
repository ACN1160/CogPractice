from mongoengine import connect
from flask_jwt_extended import JWTManager

jwt = JWTManager()

def init_db(app):
    uri = app.config.get("MONGODB_URI")
    print(f"DEBUG: MONGODB_URI = {repr(uri)}")
    connect(host=uri)