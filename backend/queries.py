INSERT_USER_SQL = '''
INSERT INTO users (user_id, email, password)
 VALUES (DEFAULT, '{usr}', '{pwd}') RETURNING user_id
 '''
QUERY_USER_ID = '''
select user_id
from users
where email = '{email}'   
and password = '{pwd}'
'''
INSERT_POST_SQL = '''
INSERT INTO user_posts ("post_id", "user_id", "post", "time_posted")
  VALUES (DEFAULT, '{user_id}', '{post}', DEFAULT) returning post_id
'''
QUERY_FRIEND_POST_SQL = '''
select post_id, user_posts.user_id, name, post, time_posted
from user_posts
join user_data ud on ud.user_id = user_posts.user_id
where user_posts.user_id = '{user_id}'
   or user_posts.user_id in (select friend_id from friend_list_table where friend_list_table.user_id = '{user_id}');
'''
INSERT_USER_DATA_SQL = '''
INSERT INTO user_data("user_id", "age", "sex", "location", "occupation", "name")
VALUES ('{user_id}', '{age}', '{sex}', '{location}', '{occupation}', '{name}')
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
join user_data ud on ud.user_id = from_user
where to_user = '{user_id}';
'''
INSERT_COMMENT_SQL = '''
INSERT INTO post_comments ("comment_id", "post_id", "user_id", "comment_text", "time_posted")
  VALUES (DEFAULT, '{post_id}', '{user_id}','{comment_text}', DEFAULT) returning comment_id
'''
QUERY_COMMENTS_SQL = '''
select * from post_comments where post_id = '{post_id}';
'''
DELETE_FRIEND_REQUEST_SQL = '''
DELETE FROM friend_requests WHERE "from_user" = '{friend_id}' AND "to_user" = '{user_id}'
'''
INSERT_FRIEND_LIST_SQL = '''
INSERT INTO "friend_list_table" ("user_id", "friend_id") 
  VALUES ('{user_id}', '{friend_id}')
'''
INSERT_GROUP_SQL = '''
INSERT INTO groups ("group_id", "user_id", "activity", "group_name") 
  VALUES (DEFAULT, '{user_id}', '{activity}', '{group_name}') returning group_id
'''
QUERY_ALL_GROUPS_SQL = '''
select group_id, groups.user_id, name as admin, activity, group_name
from groups
       join user_data ud on ud.user_id = groups.user_id;
'''

QUERY_USER_GROUPS_SQL = '''
select groups.group_id, group_name
from group_list_table
       join groups on group_list_table.group_id = groups.group_id
where groups.user_id = '{user_id}';
'''

INSERT_GROUP_REQUEST_SQL = '''
INSERT INTO group_requests ("group_id", "to_user")
  VALUES ('{group_id}', '{friend_id}');
'''

QUERY_SPECIFIC_GROUP_SQL = '''
select * from groups 
  where user_id = '{user_id}' and group_id = '{group_id}';
'''


DELETE_GROUP_REQUEST_SQL = '''
DELETE FROM "public"."group_requests" 
  WHERE "group_id" = '{group_id}' AND "to_user" = '{user_id}'
'''

QUERY_GROUP_REQUESTS_SQL = '''
select from_user, ud.name
from group_requests
       join user_data ud on ud.user_id = group_requests.from_user
where to_user = '{user_id}'
'''

INSERT_EVENT_SQL = '''
INSERT INTO "events" ("event_id", "group_id", "event_name", "location", "time")
 VALUES (DEFAULT, '{group_id}', '{event_name}', '{location}', '{timestamp}') returning event_id
'''

QUERY_GROUP_EVENTS_SQL = '''
select * from events where group_id = '{group_id}';
'''

INSERT_GROUP_LIST_SQL = '''
INSERT INTO "group_list_table" ("group_id", "user_id")
 VALUES ('{group_id}', '{user_id}')
'''

QUERY_GROUP_MEMBERS = '''
select * from group_list_table
  where group_id = '{group_id}' and user_id = '{user_id}'
'''

QUERY_USER_ASSOCIATED_EVENTS = '''
select *
from events
where group_id in (select group_id from groups where user_id = '{user_id}');
'''

INSERT_EVENT_ATTENDANCE_SQL = '''
INSERT INTO "event_attendance" ("event_id", "user_id")
 VALUES ('{event_id}', '{user_id}')
'''

QUERY_USER_EVENT_ATTENDANCE_SQL = '''
select event_attendance.user_id, name
from event_attendance
       join user_data ud on ud.user_id = event_attendance.user_id
where event_id = '{event_id}';
'''

QUERY_LOCATION_SQL = '''
    select * from locations inner join postal_code pc 
                on locations.postal_code = pc.postal_code
    where location_id = '{location_id}';
'''

CREATE_UPDATE_POSTAL_CODE_SQL = '''
    insert into "postal_code" (postal_code, city, province) 
    values ('{postal_code}', '{city}', '{province}')
    on conflict (postal_code) do update 
        set city = EXCLUDED.city, province = EXCLUDED.province;
'''

CREATE_LOCATION_SQL = '''
    insert into "locations" (location_id, location_name, address, postal_code) 
    values (default, '{location_name}', '{address}', '{postal_code}')
'''

INSERT_GROUP_POST_SQL = '''
'''

QUERY_GROUP_POST_SQL = '''
'''

QUERY_GROUP_INFO_SQL = '''
select * from groups where group_id = '{group_id}';
'''
