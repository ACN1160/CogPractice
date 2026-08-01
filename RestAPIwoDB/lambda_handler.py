import serverless_wsgi
from app import create_app

app = create_app()

def handler(event, context):
    return serverless_wsgi.response(app, event, context)
