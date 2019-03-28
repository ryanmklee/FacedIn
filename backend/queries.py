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
INSERT INTO user_data("user_id", "age", "sex", "occupation", "name", "location_id")
VALUES ('{user_id}', '{age}', '{sex}', '{occupation}', '{name}', '{location_id}')
'''

UPDATE_USER_DATA_SQL = '''
update users set email = '{email}',
                 password = '{password}'
where user_id = '{user_id}'
'''

QUERY_USER_DATA = '''
select * from user_data
  join locations l on user_data.location_id = l.location_id
  join postal_code pc on l.postal_code = pc.postal_code
where user_id = '{user_id}';
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
INSERT INTO "events" ("event_id", "group_id", "event_name", "time", "location_id")
 VALUES (DEFAULT, '{group_id}', '{event_name}', '{timestamp}', '{location_id}') returning event_id
'''

QUERY_GROUP_EVENTS_SQL = '''
select * from events
join locations l on events.location_id = l.location_id
join postal_code pc on l.postal_code = pc.postal_code
where group_id = '{group_id}';
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
join locations l on events.location_id = l.location_id
join postal_code pc on l.postal_code = pc.postal_code
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
ON CONFLICT(location_name, address, postal_code)
 do update set location_name=EXCLUDED.location_name returning location_id;
'''

INSERT_GROUP_POST_SQL = '''
INSERT INTO "group_posts" ("gpost_id", "group_id", "user_id", "group_post", "time_posted")
 VALUES (DEFAULT, '{group_id}', '{user_id}', '{group_post}', DEFAULT) returning gpost_id
'''

QUERY_GROUP_POST_SQL = '''
select gpost_id, group_id, ud.user_id, group_post, name, time_posted
from group_posts
            join user_data ud on ud.user_id = group_posts.user_id
where group_id = '{group_id}';
'''

QUERY_GROUP_INFO_SQL = '''
select * from groups where group_id = '{group_id}';
'''

COUNT_EVENTS_MONTHLY = '''
select count(*)
from events
where group_id = '{group_id}'
  and EXTRACT(MONTH FROM time) = EXTRACT(MONTH from now())
  and EXTRACT(YEAR from time) = EXTRACT(YEAR from now());
'''

QUERY_EVENTS_MONTHLY = '''
select *
from events
where group_id = '{group_id}'
  and EXTRACT(MONTH FROM time) = EXTRACT(MONTH from now())
  and EXTRACT(YEAR from time) = EXTRACT(YEAR from now());
'''

USERS_IN_ALL_GROUPS = '''
SELECT * from user_data where user_id in
(SELECT distinct user_id FROM group_list_table as sx
WHERE NOT EXISTS (
(SELECT p.group_id FROM groups as p )
EXCEPT
(SELECT sp.group_id FROM group_list_table as sp WHERE sp.user_id = sx.user_id )));
'''

GROUP_FRIENDS_BY_CITY = '''
select flt.user_id, age, sex, name, occupation, location_name, address, pc.postal_code, city, province
       from friend_list_table flt
join user_data ud on ud.user_id = flt.friend_id
join locations l on ud.location_id = l.location_id
join postal_code pc on l.postal_code = pc.postal_code
where flt.user_id = '{user_id}' and pc.city = '{city}'
'''

QUERY_FRIEND_CITY_COUNT = '''
select pc.city, l.location_id, count(city)
from user_data
join locations l on user_data.location_id = l.location_id
join postal_code pc on l.postal_code = pc.postal_code
where user_id in
      (select friend_id
       from friend_list_table
       where user_id = '{user_id}')
group by pc.city, l.location_id;

'''

INSERT_GROUP_POST_COMMENT_SQL = '''
INSERT INTO group_post_comments ("comment_id", "gpost_id", "user_id", "group_id", "comment_text", "time_posted")
 VALUES (DEFAULT, '{gpost_id}', '{user_id}', '{group_id}', '{comment_text}', DEFAULT) returning comment_id
'''

QUERY_GROUP_POST_COMMENT_SQL = '''
select * from group_post_comments where gpost_id = '{gpost_id}'
'''

QUERY_SEARCH_TERM_USERS = '''
select *
from user_data
       join locations l on user_data.location_id = l.location_id
       join postal_code pc on l.postal_code = pc.postal_code
where name ilike '{phrase}%'
   or occupation ilike '{phrase}%'
   or city ilike '{phrase}%';
'''

QUERY_SEARCH_TERM_GROUPS = '''
select *
from groups
where activity ilike '{phrase}%'
   or group_name like '{phrase}%';
'''

QUERY_SEARCH_TERM_EVENTS = '''
select *
from events
       join locations l on events.location_id = l.location_id
       join postal_code pc on l.postal_code = pc.postal_code
       join groups g on events.group_id = g.group_id
where event_name ilike '{phrase}%';
'''
