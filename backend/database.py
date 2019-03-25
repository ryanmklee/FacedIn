import psycopg2

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
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
        cursor.execute(QUERY_USER_ID.format(email=email, pwd=password))
        rows = cursor.fetchall()
        user_id = rows[0][0] if len(rows) == 1 else -1
    return user_id


def query_posts(connection, user_id: int) -> list:
    """
    Query posts based on users that the user_id should be able to see
    :param connection: Database connection
    :param user_id: int
    :return: list of posts
    """
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
        cursor.execute(INSERT_FRIEND_REQUEST.format(user_id=user_id, friend_id=friend_id))
        connection.commit()


def query_user_data(connection, user_id: int) -> list:
    """
    Queries user profile based on user_id
    :param connection: database connection
    :param user_id: user_id
    :return:
    """
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
        cursor.execute(INSERT_COMMENT_SQL.format(user_id=user_id, post_id=post_id, comment_text=comment_text))
        cursor.commit()


def query_comments(connection, post_id: int) -> list:
    """
    Return a list of comments pertaining to a post_id
    :param connection: Database connection
    :param post_id: int
    :return: list of comments
    """
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
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
    with connection.cursor() as cursor:
        cursor.execute(DELETE_FRIEND_REQUEST_SQL.format(user_id=user_id, friend_id=friend_id))
        cursor.commit()


