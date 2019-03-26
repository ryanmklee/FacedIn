import psycopg2
import psycopg2.extras

from backend.queries import *

DBNAME = 'lxjvzzed'
USER = 'lxjvzzed'
PASSWORD = '8XaKBKymJa295Ej28nnXiYFnUlDWkApM'
HOST = 'stampy.db.elephantsql.com'


def get_connection():
    """
    Connects to PostgreSQL database
    :return: psycopg2 connection object
    """
    conn = psycopg2.connect(dbname=DBNAME, user=USER, password=PASSWORD, host=HOST)
    return conn if conn else psycopg2.Error


def insert_user(connection, user: str, password: str) -> None:
    """
    Insert user into database with password
    :param connection: Database connection
    :param user: str
    :param password: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_USER_SQL.format(usr=user, pwd=password))
        connection.commit()


def validate_user(connection, email: str, password: str) -> int:
    """
    Validate user credentials and return bool if it is a match
    :param connection: Database connection
    :param email: email
    :param password: password
    :return: int, user_id
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_USER_ID.format(email=email, pwd=password))
        rows = cursor.fetchall()
        user_id = rows[0]['user_id'] if len(rows) == 1 else -1
    return user_id


def query_posts(connection, user_id: int) -> list:
    """
    Query posts based on users that the user_id should be able to see
    :param connection: Database connection
    :param user_id: int
    :return: list of posts
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_FRIEND_POST_SQL.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def add_post(connection, user_id: int, post: str) -> None:
    """
    Adds a post for a user
    :param user_id: user_id
    :param connection: Database connection
    :param post: user post
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_POST_SQL).format(user_id=user_id, post=post)
        connection.commit()


def insert_user_data(connection, user_id: int, age: int, sex: str, location: str, occupation: str) -> None:
    """
    Inserts user data to the user_data table
    :param connection: database connection
    :param user_id: user_id
    :param age: int
    :param sex: str
    :param location: str
    :param occupation: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_USER_DATA_SQL.format(user_id=user_id, age=age, sex=sex, location=location,
                                                   occupation=occupation))
        connection.commit()


def send_friend_request(connection, user_id: int, friend_id: int) -> None:
    """
    Insert into friend request table
    :param connection: Database connection
    :param user_id: int
    :param friend_id: int
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_FRIEND_REQUEST.format(user_id=user_id, friend_id=friend_id))
        connection.commit()


def query_user_data(connection, user_id: int) -> list:
    """
    Queries user profile based on user_id
    :param connection: database connection
    :param user_id: user_id
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_USER_DATA.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def query_friend_requests(connection, user_id: int) -> list:
    """
    Query all friend requests from user_id
    :param connection: Database connection
    :param user_id: int
    :return: list of friend requests
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_FRIEND_REQUESTS.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def insert_comment(connection, user_id: int, post_id: int, comment_text: str) -> None:
    """
    Insert comment into the post_id
    :param connection: Database connection
    :param user_id: int
    :param post_id: int
    :param comment_text: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_COMMENT_SQL.format(user_id=user_id, post_id=post_id, comment_text=comment_text))
        cursor.commit()


def query_comments(connection, post_id: int) -> list:
    """
    Return a list of comments pertaining to a post_id
    :param connection: Database connection
    :param post_id: int
    :return: list of comments
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_COMMENTS_SQL.format(post_id=post_id))
        rows = cursor.fetchall()
    return rows


def accept_friend_request(connection, user_id: int, friend_id: int) -> None:
    """
    Accept a friend request. Delete entry from friend_request table and insert into friend_list_table
    :param connection:
    :param user_id:
    :param friend_id:
    :return: bool for success
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(DELETE_FRIEND_REQUEST_SQL.format(user_id=user_id, friend_id=friend_id))
        cursor.execute(INSERT_FRIEND_LIST_SQL.format(user_id=user_id, friend_id=friend_id))
        cursor.commit()


def decline_friend_request(connection, user_id: int, friend_id: int) -> None:
    """
    Declines a friend request. Delete entry from friend_request table.
    :param connection:
    :param user_id:
    :param friend_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(DELETE_FRIEND_REQUEST_SQL.format(user_id=user_id, friend_id=friend_id))
        cursor.commit()


def insert_group(connection, user_id: str, activity: str, group_name: str) -> None:
    """
    Inserts a group into the database.
    :param connection: Database connection
    :param user_id: int
    :param activity: str
    :param group_name: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_SQL.format(user_id=user_id, activity=activity, group_name=group_name))
        cursor.commit()


def send_group_request(connection, group_id: int, user_id: int) -> None:
    """
    Sends a group request to a user
    :param connection: Database connection
    :param group_id: int
    :param user_id: int
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_REQUEST_SQL.format(group_id=group_id, user_id=user_id))
        cursor.commit()


def query_group_requests(connection, user_id: int) -> list:
    """
    Queries all group requests associated to the user_id
    :param connection: Database connection
    :param user_id: int
    :return: list of groups
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_REQUESTS_SQL.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def accept_group_request(connection, group_id: int, user_id: int) -> None:
    """
    Accepts a group request and adds to the group_list_table
    :param connection:
    :param group_id:
    :param user_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(DELETE_GROUP_REQUEST_SQL.format(group_id=group_id, user_id=user_id))
        cursor.execute(INSERT_GROUP_LIST_SQL.format(group_id=group_id, user_id=user_id))
        cursor.commit()


def decline_group_request(connection, group_id: int, user_id: int) -> None:
    """
    Declines a group request and deletes its' entry from group_list
    :param connection:
    :param group_id:
    :param user_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(DELETE_GROUP_REQUEST_SQL.format(group_id=group_id, user_id=user_id))
        cursor.commit()


def insert_event(connection, group_id: int, event_name: str, location: str, timestamp: str) -> None:
    """
    Inserts an event to the events table based on a group_id
    :param connection:
    :param timestamp:
    :param location:
    :param event_name:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_EVENT_SQL.format(group_id=group_id, event_name=event_name, location=location,
                                               timestamp=timestamp))
        cursor.commit()


def query_group_events(connection, group_id: int) -> list:
    """
    Returns a list of group events
    :param connection:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_EVENTS_SQL.format(group_id))
        rows = cursor.fetchall()
    return rows


def validate_group_admin(connection, group_id: int, user_id: int) -> bool:
    """
    Validates if the user is the admin of the group.
    :param connection:
    :param group_id:
    :param user_id:
    :return: bool
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_SPECIFIC_GROUP_SQL.format(group_id=group_id, user_id=user_id))
        rows = cursor.fetchall()
    return True if len(rows) == 1 else False


def validate_group_member(connection, group_id: int, user_id: int) -> bool:
    """
    Validates if the user is in the group
    :param connection:
    :param group_id:
    :param user_id:
    :return: bool
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_MEMBERS.format(group_id=group_id, user_id=user_id))
        rows = cursor.fetchall()
    return True if len(rows) == 1 else False
