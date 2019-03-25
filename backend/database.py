import psycopg2

from backend.queries import INSERT_USER_SQL, QUERY_USER_ID, INSERT_POST_SQL, QUERY_FRIEND_POST_SQL, \
    INSERT_USER_DATA_SQL, QUERY_USER_DATA, INSERT_FRIEND_REQUEST, QUERY_FRIEND_REQUESTS

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

    # TODO: return a list not all return from the database
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


def insert_user_data(connection, user_id: int, age: int, sex: str, location: str) -> None:
    """
    Inserts user data to the user_data table
    :param connection: database connection
    :param user_id: user_id
    :param age: int
    :param sex: str
    :param location: str
    """
    with connection.cursor() as cursor:
        cursor.execute(INSERT_USER_DATA_SQL.format(user_id=user_id, age=age, sex=sex, location=location))
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
    # TODO: return a proper list
    return rows


def query_friend_requests(connection, user_id: int) -> list:
    """
    Query all friend requests from user_id
    :param connection: Database connection
    :param user_id: int
    :return: list of friend requests
    """
    with connection.cursor as cursor:
        cursor.execute(QUERY_FRIEND_REQUESTS.format(user_id))
        rows = cursor.fetchall()
    return rows


def accept_friend_request(connection, user_id: int, friend_id: int) -> bool:
    """
    Accept a friend request. Delete entry from friend_request table and insert into friend_list_table
    :param connection:
    :param user_id:
    :param friend_id:
    :return: bool for success
    """
    pass


def decline_friend_request(connection, user_id: int, friend_id: int) -> bool:
    """
    Declines a friend request. Delete entry from friend_request table.
    :param connection:
    :param user_id:
    :param friend_id:
    :return:
    """
    pass

