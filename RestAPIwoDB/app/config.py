class Baseconfig:
    DEBUG = False
    TESTING = False 
    SECRET_KEY = 'My_secret_Key'

def getconfig():
    return Baseconfig