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


@app.route('/api/login', methods=['GET'])
def login():
    """
    POST request with user and password to login
    :return: user_id
    """
    args = request.args
    email = args['email']
    pwd = args['password']
    user_id = -1
    if email and pwd:
        with database.get_connection() as conn:
            user_id = database.validate_user(conn, email, pwd)
    return jsonify(status=status.HTTP_200_OK, user_id=user_id)


@app.route('/api/user/post', methods=['POST'])
def user_post():
    """
    POST request to post a user post
    :return:
    """
    args = request.args
    user_id = args['user_id']
    post = args['post']
    if user_id and post:
        with database.get_connection() as conn:
            database.add_post(conn, user_id, post)
    return jsonify(status=status.HTTP_201_CREATED)


@app.route('/api/user/info', methods=['GET', 'POST'])
def query_user():
    """
    GET request user_id for user data
    :return:
    """
    args = request.args
    user_id = args['user_id']
    if user_id != -1:
        if request.method == 'GET':
            with database.get_connection() as conn:
                user_data = database.query_user_data(conn, user_id)
            return jsonify(status=status.HTTP_200_OK, user_data=user_data)
        else:
            with database.get_connection() as conn:
                database.insert_user_data(conn, user_id, age=args['age'], sex=args['sex'], location=args['location'],
                                          occupation=args['occupation'])
            return jsonify(status=status.HTTP_200_OK)
    return jsonify(status=status.HTTP_400_BAD_REQUEST, error_message='user_id cannot be -1')


@app.route('/api/user/view_posts', methods=['GET'])
def query_posts():
    """
    GET request to view all posts based on a user_id
    :return:
    """
    # TODO: Also get comments at this endpoint so there won't be multiple calls to create another comment endpoint
    args = request.args
    user_id = args['user_id']
    if user_id:
        with database.get_connection() as conn:
            posts = database.query_posts(conn, user_id)
        return jsonify(status=status.HTTP_200_OK, posts=posts)


@app.route('/api/user/send_friend_request', methods=['POST'])
def send_friend_request():
    """
    POST request to send a friend request to another user
    :return:
    """
    args = request.args
    user_id = args['user_id']
    friend_id = args['friend_id']
    if user_id and friend_id:
        with database.get_connection() as conn:
            database.send_friend_request(conn, user_id, friend_id)
    return jsonify(status=status.HTTP_200_OK)


@app.route('/api/user/view_friend_requests', methods=['GET'])
def query_friend_requests():
    """
    Queries friend requests pertaining to a user
    :return:
    """
    args = request.args
    user_id = args['user_id']
    if user_id:
        with database.get_connection() as conn:
            friend_ids = database.query_friend_requests(conn, user_id)
        return jsonify(status=status.HTTP_200_OK, friends=friend_ids)


@app.route('/api/user/friend_request', methods=['POST'])
def modify_friend_request():
    """
    Accepts/Declines a friend request and moves the request to the friend list table
    :return:
    """
    args = request.args
    user_id = args['user_id']
    friend_id = args['friend_id']
    is_accepted = args['is_accepted']
    with database.get_connection() as conn:
        if is_accepted:
            database.accept_friend_request(conn, user_id, friend_id)
        else:
            database.decline_friend_request(conn, user_id, friend_id)
    return jsonify(status=status.HTTP_200_OK)


if __name__ == '__main__':
    app.run()
