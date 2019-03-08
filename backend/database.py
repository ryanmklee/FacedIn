import psycopg2

DBNAME = 'lxjvzzed'
USER = 'lxjvzzed'
PASSWORD = '8XaKBKymJa295Ej28nnXiYFnUlDWkApM'
HOST = 'stampy.db.elephantsql.com'


INSERT_USER_SQL = '''INSERT INTO users (user_id, email, password) VALUES (DEFAULT, '{usr}', '{pwd}')'''
VALIDATE_USER_SQL = '' # TODO


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


def validate_user(connection, user: str, password: str) -> bool:
    """
    Validate user credentials and return bool if it is a match
    :param connection:
    :param user:
    :param password:
    :return:
    """
    pass


def query_posts(connection, user_id: int) -> list:
    """
    Query posts based on users that the user_id should be able to see
    :param connection:
    :param user_id:
    :return:
    """
    pass


def add_post(connection, str) -> bool:
    """
    Adds a post for a user
    :param connection:
    :param str:
    :return:
    """
    pass
