INSERT_USER_SQL = '''
INSERT INTO users (user_id, email, password)
 VALUES (DEFAULT, '{usr}', '{pwd}')
 '''
QUERY_USER_ID = '''
select user_id
from users
where email = '{email}'
and password = '{pwd}'
'''
INSERT_POST_SQL = '''
INSERT INTO user_posts ("post_id", "user_id", "post")
  VALUES (DEFAULT, '{user_id}', '{post}')
'''
QUERY_FRIEND_POST_SQL = '''
select user_posts.user_id, name, post, time_posted
from user_posts
join user_data ud on ud.user_id = user_posts.user_id
where user_posts.user_id = '{user_id}'
   or user_posts.user_id in (select friend_id from friend_list_table where friend_list_table.user_id = '{user_id}');
'''
INSERT_USER_DATA_SQL = '''
INSERT INTO user_data("user_id", "age", "sex", "location")
VALUES ('{user_id}', '{age}', '{sex}', '{location}')
'''
QUERY_USER_DATA = '''
select * from user_data where user_id = '{user_id}';
'''
INSERT_FRIEND_REQUEST = '''
INSERT INTO friend_requests ("from_user", "to_user")
 VALUES ('{user_id}', '{friend_id}')
'''
QUERY_FRIEND_REQUESTS = '''
select name, to_user from friend_requests
join user_data ud on ud.user_id = to_user
where from_user = {'user_id'};
'''

