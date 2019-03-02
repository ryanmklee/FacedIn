import psycopg2

DBNAME = 'lxjvzzed'
USER = 'lxjvzzed'
PASSWORD = '8XaKBKymJa295Ej28nnXiYFnUlDWkApM'
HOST = 'stampy.db.elephantsql.com'


INSERT_USER_SQL = ''


def get_connection():
    try:
        conn = psycopg2.connect(dbname=DBNAME, user=USER, password=PASSWORD, host=HOST)
    except psycopg2.Error as e:
        # TODO: need logger
        print('failed to connect')

def insert_user(user, password):
    # TODO: implement
    pass

