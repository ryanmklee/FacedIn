from flask import Flask
from flask import jsonify, request, send_from_directory, json
from flask_api import status
from flask_cors import CORS

from backend import database

app = Flask(__name__)
CORS(app, resources=r'/api/*')


@app.route('/')
def hello_world():
    return send_from_directory('templates', 'login.html')


@app.route('/api/create', methods=['POST', 'PUT'])
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
            if request.method == 'POST':
                user_id = database.insert_user(conn, user, pwd)
                database.null_user_data(conn, user_id['user_id'])
                return jsonify(status=status.HTTP_201_CREATED, user_id=user_id)
            else:
                user_id = args['user_id']
                database.update_user(conn, user_id, user, pwd)
                return jsonify(status=status.HTTP_200_OK)
    else:
        return jsonify(status=status.HTTP_400_BAD_REQUEST)


@app.route('/api/login', methods=['GET'])
def login():
    """
    GET request with user and password to login
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


@app.route('/api/user/post', methods=['POST', 'DELETE'])
def user_post():
    """
    POST request to post a user post
    :return:
    """
    with database.get_connection() as conn:
        if request.method == 'POST':
            args = request.args
            user_id = args['user_id']
            post = pad_single_quote(args['post'])
            post_id = database.add_post(conn, user_id, post)
            return jsonify(status=status.HTTP_201_CREATED, post_id=post_id)
        else:
            data = json.loads(request.data)
            user_id = data['user_id']
            post_id = data['post_id']
            database.delete_post(conn, user_id, post_id)
            return jsonify(status=status.HTTP_200_OK)


@app.route('/api/user/info', methods=['GET', 'POST', 'PUT'])
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
        if request.method == 'POST':
            location_id = create_location(args)
            with database.get_connection() as conn:
                database.insert_user_data(conn, user_id, age=args['age'], sex=pad_single_quote(args['sex']), location_id=location_id,
                                          occupation=pad_single_quote(args['occupation']),
                                          name=pad_single_quote(args['name']))
            return jsonify(status=status.HTTP_201_CREATED)
        if request.method == 'PUT':
            location_id = create_location(args)
            with database.get_connection() as conn:
                database.update_user_data(conn, user_id, age=args['age'], sex=pad_single_quote(args['sex']), location_id=location_id,
                                          occupation=pad_single_quote(args['occupation']),
                                          name=pad_single_quote(args['name']))
            return jsonify(status=status.HTTP_200_OK, message='Updated {}'.format(user_id))
    return jsonify(status=status.HTTP_400_BAD_REQUEST, error_message='user_id cannot be -1')


@app.route('/api/user/view_posts', methods=['GET'])
def query_posts():
    """
    GET request to view all posts based on a user_id
    :return:
    """
    args = request.args
    user_id = args['user_id']
    if user_id:
        res = []
        with database.get_connection() as conn:
            for post in database.query_posts(conn, user_id):
                ret = {
                    'post': post,
                    'comments': database.query_comments(conn, post['post_id'])
                }
                res.append(ret)
        return jsonify(status=status.HTTP_200_OK, posts=res)


@app.route('/api/user/comment', methods=['POST'])
def post_comment():
    """
    POST request to post a comment on a post_id (post)
    """
    args = request.args
    post_id = args['post_id']
    user_id = args['user_id']
    comment_text = pad_single_quote(args['comment_text'])
    with database.get_connection() as conn:
        comment_id = database.insert_comment(conn, user_id, post_id, comment_text)
    return jsonify(status=status.HTTP_200_OK, comment_id=comment_id)


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
    :return: friend_requests
    """
    args = request.args
    user_id = args['user_id']
    if user_id:
        with database.get_connection() as conn:
            friend_ids = database.query_friend_requests(conn, user_id)
        return jsonify(status=status.HTTP_200_OK, friend_requests=friend_ids)


@app.route('/api/user/friend_request', methods=['POST', 'DELETE'])
def modify_friend_request():
    """
    Accepts/Declines a friend request and moves the request to the friend list table
    :return:
    """
    data = json.loads(request.data)
    user_id = data['user_id']
    friend_id = data['friend_id']
    with database.get_connection() as conn:
        if request.method == 'POST':
            database.accept_friend_request(conn, user_id, friend_id)
        else:
            database.decline_friend_request(conn, user_id, friend_id)
    return jsonify(status=status.HTTP_200_OK)


@app.route('/api/user/friend_locations', methods=['GET'])
def query_friends_by_city():
    """
    Queries all of users' friends and returns a list of friends grouped by city
    :return: list of friends grouped by city
    """
    args = request.args
    user_id = args['user_id']
    with database.get_connection() as conn:
        grouped = []
        cities = database.count_city_friends(conn, user_id)
        for city in cities:
            friends = database.friends_in_city(conn, user_id, city['city'])
            grouped.append([city, friends])
    return jsonify(status=status.HTTP_200_OK, friends=grouped)


@app.route('/api/groups/create', methods=['POST'])
def create_group():
    """
    Creates a group given an admin, activity and group_name
    """
    args = request.args
    user_id = args['user_id']
    activity = pad_single_quote(args['activity'])
    group_name = pad_single_quote(args['group_name'])
    with database.get_connection() as conn:
        group_id = database.insert_group(conn, user_id, activity, group_name)
    return jsonify(status=status.HTTP_201_CREATED, group_id=group_id)


@app.route('/api/groups/user', methods=['GET'])
def query_created_groups():
    """
    Queries all groups that the user_id created.
    :return:
    """
    args = request.args
    with database.get_connection() as conn:
        if 'user_id' in args:
            groups = database.query_groups(conn, user_id=args['user_id'])
    # TODO
    return jsonify(status=status.HTTP_200_OK)


@app.route('/api/groups/post', methods=['GET', 'POST'])
def group_post():
    args = request.args
    group_id = args['group_id']
    with database.get_connection() as conn:
        if request.method == 'GET':
            res = []
            posts = database.query_group_posts(conn, group_id)
            for post in posts:
                gpost_id = post['gpost_id']
                comments = database.query_group_post_comment(conn, gpost_id)
                res.append([post, {'comments': comments}])
            return jsonify(status=status.HTTP_200_OK, posts=res)
        else:
            gpost_id = database.insert_group_post(conn, group_id, args['user_id'], args['group_post'])
            return jsonify(status=status.HTTP_200_OK, gpost_id=gpost_id)


@app.route('/api/groups/insert_comment', methods=['POST'])
def post_group_comment():
    """
    Posts a comment on a group post
    :return:
    """
    args = request.args
    group_id = args['group_id']
    gpost_id = args['gpost_id']
    user_id = args['user_id']
    comment_text = pad_single_quote(args['comment_text'])
    with database.get_connection() as conn:
        comment_id = database.insert_group_post_comment(conn, group_id, gpost_id, user_id, comment_text)
    return jsonify(status=status.HTTP_200_OK, comment_id=comment_id)


@app.route('/api/groups/send_request', methods=['POST'])
def send_group_request():
    """
    Sends a group request from a group member to another user
    """
    args = request.args
    user_id = args['user_id']
    friend_id = args['friend_id']
    group_id = args['group_id']
    with database.get_connection() as conn:
        if database.validate_group_member(conn, group_id, user_id):
            database.send_group_request(conn, group_id, friend_id)
        else:
            return jsonify(status=status.HTTP_400_BAD_REQUEST, error_message='The user is not a member of the group, '
                                                                             'you may not add them to a group that a '
                                                                             'person is not associated in.')
    return jsonify(status=status.HTTP_200_OK, message='Sent group request to friend_id: {}'.format(friend_id))


@app.route('/api/groups/group_request', methods=['POST', 'DELETE'])
def modify_group_request():
    """
    Accepts or declines group requests
    """
    with database.get_connection() as conn:
        if request.method == 'POST':
            args = request.args
            group_id = args['group_id']
            user_id = args['user_id']
            database.accept_group_request(conn, group_id, user_id)
        else:
            data = request.data
            group_id = data['group_id']
            user_id = data['user_id']
            database.decline_group_request(conn, group_id, user_id)
    return jsonify(status=status.HTTP_200_OK)


@app.route('/api/groups/join', methods=['POST'])
def join_group():
    """
    User joins a group
    :return:
    """
    args = request.args
    group_id = args['group_id']
    user_id = args['user_id']
    with database.get_connection() as conn:
        database.self_invite_group(conn, group_id, user_id)
    return jsonify(status=status.HTTP_201_CREATED)


@app.route('/api/groups/all', methods=['GET'])
def query_all_groups():
    with database.get_connection() as conn:
        groups = database.query_all_groups(conn)
    return jsonify(status=status.HTTP_200_OK, groups=groups)


@app.route('/api/groups/info', methods=['GET'])
def query_group():
    """
    Queries a group given a group_id to get their information
    :return:
    """
    args = request.args
    group_id = args['group_id']
    with database.get_connection() as conn:
        groups = database.query_group_info(conn, group_id)
    return jsonify(status=status.HTTP_200_OK, groups=groups)


@app.route('/api/groups/event/create', methods=['POST'])
def create_event():
    """
    Creates an event given a group_id, event_name, location and timestamp
    :return:
    """
    args = request.args
    location_id = create_location(args)
    group_id = args['group_id']
    event_name = pad_single_quote(args['event_name'])
    timestamp = args['timestamp']
    with database.get_connection() as conn:
        event_id = database.insert_event(conn, group_id, event_name, location_id, timestamp)
    return jsonify(status=status.HTTP_200_OK, event_id=event_id, location_id=location_id)


@app.route('/api/groups/event/view', methods=['GET'])
def view_events():
    """
    View all events given a group_id for the group
    :return:
    """
    args = request.args
    group_id = args['group_id']
    with database.get_connection() as conn:
        events = database.query_group_events(conn, group_id)
    return jsonify(status=status.HTTP_200_OK, events=events)


@app.route('/api/groups/event/attend', methods=['GET', 'POST'])
def attend_event():
    """
    User attends event given a user_id and an event_id
    """
    args = request.args
    event_id = args['event_id']
    with database.get_connection() as conn:
        if request.method == 'POST':
            user_id = args['user_id']
            database.insert_event_attendance(conn, event_id, user_id)
        else:
            attendees = database.query_event_attendance(conn, event_id)
            return jsonify(status=status.HTTP_200_OK, attendees=attendees)
    return jsonify(status=status.HTTP_200_OK)


@app.route('/api/groups/most_joined', methods=['GET'])
def most_joined_groups():
    """
    Returns the users who have joined all the groups
    :return:
    """
    with database.get_connection() as conn:
        users = database.query_users_all_groups(conn)
    return jsonify(status=status.HTTP_200_OK, users=users)


@app.route('/api/groups/users', methods=['GET'])
def query_users_group():
    """
    Returns a list of users in a group
    :return:
    """
    args = request.args
    group_id = args['group_id']
    with database.get_connection() as conn:
        users = database.query_users_in_group(conn, group_id)
    return jsonify(status=status.HTTP_200_OK, users=users)


@app.route('/api/groups/monthly_events', methods=['GET'])
def monthly_events():
    """
    Query monthly events for a group
    :return: list of events
    """
    args = request.args
    group_id = args['group_id']
    with database.get_connection() as conn:
        events = database.query_monthly_events(conn, group_id)
        count = database.count_monthly_events(conn, group_id)
    return jsonify(status=status.HTTP_200_OK, count=count, events=events)


@app.route('/api/location/view', methods=['GET'])
def query_location():
    args = request.args
    location_id = args['location_id']
    with database.get_connection() as conn:
        location_details = database.query_location(conn, location_id)
        return jsonify(status=status.HTTP_200_OK, location=location_details)


@app.route('/api/search', methods=['GET'])
def query_search_phrase():
    args = request.args
    phrase = pad_single_quote(args['phrase'])
    with database.get_connection() as conn:
        res = database.query_search_term(conn, phrase)
    return jsonify(status=status.HTTP_200_OK, res=res)


def create_location(args):
    location_name = pad_single_quote(args['location_name'])
    address = pad_single_quote(args['address'])
    postal_code = pad_single_quote(args['postal_code'])
    province = pad_single_quote(args['province'])
    city = pad_single_quote(args['city'])
    with database.get_connection() as conn:
        database.create_update_postal_code(conn, postal_code, city, province)
        location_id = database.create_location(conn, location_name, address, postal_code)
    return location_id


def pad_single_quote(s) -> str:
    return s.replace("'", "''")


if __name__ == '__main__':
    app.run()
