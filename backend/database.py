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


def update_user(connection, user_id: int, user: str, password: str) -> None:
    """
    Update user into database with user_id, user, password.
    :param connection: Database connection
    :param user_id: int
    :param user: str
    :param password: str
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(UPDATE_USER_SQL.format(user_id=user_id, email=user, password=password))
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


def insert_user_data(connection, user_id: int, age: int, sex: str, location_id: int, occupation: str, name: str) -> None:
    """
    Inserts user data to the user_data table
    :param connection: database connection
    :param name: str
    :param user_id: user_id
    :param age: int
    :param sex: str
    :param location_id: int
    :param occupation: str
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_USER_DATA_SQL.format(user_id=user_id, age=age, sex=sex, location_id=location_id,
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


def query_all_groups(connection) -> list:
    """
    Queries all groups that exists
    :param connection: Database connection
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_ALL_GROUPS_SQL)
        groups = cursor.fetchall()
    return groups


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


def insert_event(connection, group_id: int, event_name: str, location_id: int, timestamp: str) -> dict:
    """
    Inserts an event to the events table based on a group_id
    :param connection:
    :param location_id:
    :param timestamp:
    :param event_name:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_EVENT_SQL.format(group_id=group_id, event_name=event_name, location_id=location_id,
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


def insert_group_post(connection, group_id: int, user_id: int, group_post: str) -> dict:
    """
    Inserts group_id, user_id and group_post to group_list table
    :param connection: Database connection
    :param group_id: int
    :param user_id: int
    :param group_post: str
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_POST_SQL.format(group_id=group_id, user_id=user_id, group_post=group_post))
        connection.commit()
        gpost_id = cursor.fetchone()
    return gpost_id


def query_group_posts(connection, group_id: int) -> list:
    """
    Queries all posts associated to a group_id
    :param connection: Database connection
    :param group_id: int
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_POST_SQL.format(group_id=group_id))
        rows = cursor.fetchall()
    return rows


def insert_group_post_comment(connection, group_id: int, gpost_id: int, user_id: int, comment_text: str) -> dict:
    """
    Insert a comment to a group post
    :param connection:
    :param group_id:
    :param gpost_id:
    :param user_id:
    :param comment_text:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(INSERT_GROUP_POST_COMMENT_SQL.format(group_id=group_id, gpost_id=gpost_id,
                                                            user_id=user_id, comment_text=comment_text))
        connection.commit()
        comment_id = cursor.fetchone()
    return comment_id


def query_group_post_comment(connection, gpost_id: int) -> list:
    """
    Queries all comments associated to the group post given the gpost_id
    :param connection: Database connection
    :param gpost_id: int
    :return: list of comments
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_GROUP_POST_COMMENT_SQL.format(gpost_id=gpost_id))
        rows = cursor.fetchall()
    return rows


def query_location(connection, location_id: int) -> dict:
    """
    Queries location_id and returns a dict that is the table entry for the
    given location_id
    :param connection: Database connection
    :param location_id: int
    :return: list of user_ids and names
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_LOCATION_SQL.format(location_id=location_id))
        rows = cursor.fetchall()
    return rows[0]


def create_location(connection, location_name: str, address: str, postal_code: str) -> int:
    """
    Creates a location.
    :param connection:
    :param location_name:
    :param address:
    :param postal_code:
    :return:
    """
    with connection.cursor() as cursor:
        cursor.execute(CREATE_LOCATION_SQL.format(location_name=location_name,
                                                  address=address, postal_code=postal_code))
        connection.commit()
        location_id = cursor.fetchone()[0]
    return location_id


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


def query_users_all_groups(connection):
    """
    Queries users which are in all the groups
    :param connection:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(USERS_IN_ALL_GROUPS)
        rows = cursor.fetchall()
    return rows


def query_monthly_events(connection, group_id: int) -> list:
    """
    Queries monthly events given a group_id
    :param connection:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_EVENTS_MONTHLY.format(group_id=group_id))
        rows = cursor.fetchall()
    return rows


def count_monthly_events(connection, group_id: int) -> dict:
    """
    Counts the monthly events given a group_id
    :param connection:
    :param group_id:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(COUNT_EVENTS_MONTHLY.format(group_id=group_id))
        count = cursor.fetchone()
    return count


def count_city_friends(connection, user_id: int) -> list:
    """
    Counts and names the cities friends are in given a user_id
    :param connection: Database connection
    :param user_id: int
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_FRIEND_CITY_COUNT.format(user_id=user_id))
        rows = cursor.fetchall()
    return rows


def friends_in_city(connection, user_id: int, city: str) -> list:
    """
    Returns the list of friends in a city
    :param connection: Database connection
    :param user_id: int
    :param city: str
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(GROUP_FRIENDS_BY_CITY.format(user_id=user_id, city=city))
        rows = cursor.fetchall()
    return rows


def query_search_term(connection, phrase: str) -> dict:
    """
    Returns a list of users, groups and events matched by the phrase
    :param connection:
    :param phrase:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(QUERY_SEARCH_TERM_USERS.format(phrase=phrase))
        users = cursor.fetchall()
        cursor.execute(QUERY_SEARCH_TERM_EVENTS.format(phrase=phrase))
        events = cursor.fetchall()
        cursor.execute(QUERY_SEARCH_TERM_GROUPS.format(phrase=phrase))
        groups = cursor.fetchall()
    return {"users": users, "events": events, "groups": groups}


def update_user_data(connection, user_id, age, sex, location_id, occupation, name) -> None:
    """
    Update user data with new data
    :param connection:
    :param user_id:
    :param age:
    :param sex:
    :param location_id:
    :param occupation:
    :param name:
    :return:
    """
    with connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
        cursor.execute(UPDATE_USER_DATA_SQL.format(user_id=user_id, age=age, sex=sex, location_id=location_id,
                                                   occupation=occupation, name=name))
        connection.commit()
