from flask import Flask
from flask import jsonify, request, make_response, send_from_directory
from flask_api import status

from backend import database

app = Flask(__name__)


@app.route('/')
def hello_world():
    return send_from_directory('templates', 'login.html')


@app.route('/api/create', methods=['POST'])
def create_user():
    """
    POST request to create user
    PARAMS: user, password
    :return: status code
    """
    args = request.args
    user = args['user']
    pwd = args['password']
    if user and pwd:
        with database.get_connection() as conn:
            database.insert_user(conn, user, pwd)
    else:
        return jsonify(status=status.HTTP_400_BAD_REQUEST)

    return jsonify(status=status.HTTP_201_CREATED)


@app.route('/api/login', methods=['POST'])
def login():
    """
    POST request with user and password to login
    :return: user_id
    """
    # TODO
    pass


@app.route('/api/post', methods=['POST'])
def post():
    """
    POST request to post a user post
    :return:
    """
    pass


if __name__ == '__main__':
    app.run()
