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
INSERT INTO user_data("user_id", "age", "sex", "location", "occupation")
VALUES ('{user_id}', '{age}', '{sex}', '{location}', '{occupation}')
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
where from_user = '{user_id}';
'''
INSERT_COMMENT_SQL = '''
INSERT INTO post_comments ("comment_id", "post_id", "user_id", "comment_text", "time_posted")
  VALUES (DEFAULT, '{post_id}', '{user_id}','{comment_text}', DEFAULT)
'''
QUERY_COMMENTS_SQL = '''
select * from post_comments where post_id = {};
'''
DELETE_FRIEND_REQUEST_SQL = '''
DELETE FROM friend_requests WHERE "from_user" = '{user_id}' AND "to_user" = '{friend_id}'
'''
INSERT_FRIEND_LIST_SQL = '''
INSERT INTO "friend_list_table" ("user_id", "friend_id") 
  VALUES ('{user_id}', '{friend_id}')
'''
INSERT_GROUP_SQL = '''
INSERT INTO groups ("group_id", "user_id", "activity", "group_name") 
  VALUES (DEFAULT, '{user_id}', '{activity}', '{group_name}')
'''
QUERY_ALL_GROUPS_SQL = '''
select group_id, groups.user_id, name as admin, activity, group_name
from groups
       join user_data ud on ud.user_id = groups.user_id;
'''
