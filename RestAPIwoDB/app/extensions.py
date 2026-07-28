from mongoengine import connect

def init_db(app):
    uri = app.config.get("MONGODB_URI")
    print(f"DEBUG: MONGODB_URI = {repr(uri)}")
    connect(host=uri)