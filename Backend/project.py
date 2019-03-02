from flask import Flask
from flask import jsonify, request, make_response, send_from_directory


app = Flask(__name__)


@app.route('/')
def hello_world():
    return send_from_directory('templates', 'login.html')


if __name__ == '__main__':
    app.run()
