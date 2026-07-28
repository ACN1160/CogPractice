import os
from dotenv import load_dotenv

load_dotenv()
class Baseconfig:
    DEBUG = True
    TESTING = False 
    SECRET_KEY = 'My_secret_Key'
    MONGODB_URI = os.environ.get("MONGODB_URI")


def getconfig():
    return Baseconfig