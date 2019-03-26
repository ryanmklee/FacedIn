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


def insert_user(connection, user: str, password: str) -> dict:
    """
    Insert user into database with password
    :param connection: Database connection
    :param user: str
    :param password: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_USER_SQL.format(usr=user, pwd=password))
        connection.commit()
        user_id = cursor.fetchone()
    return user_id


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


def add_post(connection, user_id: int, post: str) -> dict:
    """
    Adds a post for a user
    :param user_id: user_id
    :param connection: Database connection
    :param post: user post
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_POST_SQL.format(user_id=user_id, post=post))
        connection.commit()
        post_id = cursor.fetchone()
    return post_id


def insert_user_data(connection, user_id: int, age: int, sex: str, location: str, occupation: str, name: str) -> None:
    """
    Inserts user data to the user_data table
    :param connection: database connection
    :param name: str
    :param user_id: user_id
    :param age: int
    :param sex: str
    :param location: str
    :param occupation: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_USER_DATA_SQL.format(user_id=user_id, age=age, sex=sex, location=location,
                                                   occupation=occupation, name=name))
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


def insert_comment(connection, user_id: int, post_id: int, comment_text: str) -> list:
    """
    Insert comment into the post_id
    :param connection: Database connection
    :param user_id: int
    :param post_id: int
    :param comment_text: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_COMMENT_SQL.format(user_id=user_id, post_id=post_id, comment_text=comment_text))
        connection.commit()
        comment_id = cursor.fetchone()
    return comment_id


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
        cursor.execute(INSERT_FRIEND_LIST_SQL.format(user_id=friend_id, friend_id=user_id))
        connection.commit()


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
        connection.commit()


def insert_group(connection, user_id: int, activity: str, group_name: str) -> dict:
    """
    Inserts a group into the database.
    :param connection: Database connection
    :param user_id: int
    :param activity: str
    :param group_name: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_SQL.format(user_id=user_id, activity=activity, group_name=group_name))
        connection.commit()
        group_id = cursor.fetchone()
        cursor.execute(INSERT_GROUP_LIST_SQL.format(group_id=group_id['group_id'], user_id=user_id))
    return group_id


def query_groups(connection, user_id: int) -> list:
    """
    Queries groups where user is assoicated in
    :param connection: Database connection
    :param user_id: int
    :return: list of groups associated to the user
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        pass


def send_group_request(connection, group_id: int, user_id: int) -> None:
    """
    Sends a group request to a user
    :param connection: Database connection
    :param group_id: int
    :param user_id: int
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_REQUEST_SQL.format(group_id=group_id, user_id=user_id))
        connection.commit()


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


def insert_event(connection, group_id: int, event_name: str, location: str, timestamp: str) -> dict:
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
        connection.commit()
        event_id = cursor.fetchone()
    return event_id


def query_group_events(connection, group_id: int) -> list:
    """
    Returns a list of group events
    :param connection:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_EVENTS_SQL.format(group_id=group_id))
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


def query_associated_events(connection, user_id: int) -> list:
    """
    Queries events associated to a user
    :param connection: Database connection
    :param user_id: int
    :return: list of associated events
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_USER_ASSOCIATED_EVENTS.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def query_event_attendance(connection, event_id: int) -> list:
    """
    Queries event attendance and returns a list of user_ids and names
    :param connection: Database connection
    :param event_id: int
    :return: list of user_ids and names
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_USER_EVENT_ATTENDANCE_SQL.format(event_id=event_id))
        rows = cursor.fetchall()
    return rows


def insert_event_attendance(connection, event_id: int, user_id: int) -> None:
    """
    Inserts user_id and event_id to the event attendance table
    :param connection: Database connection
    :param event_id: int
    :param user_id: int
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_EVENT_ATTENDANCE_SQL.format(user_id=user_id, event_id=event_id))
        connection.commit()


def query_location(connection, location_id: int) -> dict:
    """
    Queries event attendance and returns a dict that is the table entry for the
    given location_id
    :param connection: Database connection
    :param location_id: int
    :return: list of user_ids and names
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_LOCATION_SQL.format(location_id=location_id))
        rows = cursor.fetchall()
    return rows[0]


def create_location(connection, location_name: str, address: str, postal_code: str) -> None:
    """
    Creates a location.
    :param connection:
    :param location_name:
    :param address:
    :param postal_code:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(CREATE_LOCATION_SQL.format(location_name=location_name,
                                                  address=address, postal_code=postal_code))
        connection.commit()


def create_update_postal_code(connection, postal_code: str, city: str, province: str) -> None:
    """
    Creates a postal code if it does not exist, else update it.
    :param connection:
    :param postal_code:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(CREATE_UPDATE_POSTAL_CODE_SQL.format(postal_code=postal_code,
                                                            city=city,
                                                            province=province[0:2]))
        connection.commit()


def query_group_info(connection, group_id: int):
    """
    Queries a group for information
    :param connection: Database connection
    :param group_id: int
    :return: list of group information
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_INFO_SQL.format(group_id=group_id))
        rows = cursor.fetchall()
    return rows
