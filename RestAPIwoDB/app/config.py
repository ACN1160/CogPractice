import os
from dotenv import load_dotenv

load_dotenv()
class Baseconfig:
    DEBUG = True
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'My_secret_Key')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'My_jwt_secret_Key')
    MONGODB_URI = os.environ.get("MONGODB_URI")


def getconfig():
    return Baseconfig