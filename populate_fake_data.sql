create table users
(
	user_id serial not null,
	email text not null,
	password text not null,
	constraint users_pk
		primary key (email, user_id)
);



create unique index users_user_id_uindex
	on users (user_id);

create table user_posts
(
	post_id serial not null
		constraint user_posts_pk
			primary key,
	user_id integer
		constraint user_posts_users_user_id_fk
			references users (user_id)
				on delete cascade,
	post text,
	time_posted timestamp default now()
);



create table friend_requests
(
	from_user integer not null
		constraint friend_requests_users_user_id_fk
			references users (user_id)
				on delete cascade,
	to_user integer not null,
	constraint friend_requests_pk
		unique (from_user, to_user)
);



create table friend_list_table
(
	user_id integer not null
		constraint friend_list_table_users_user_id_fk
			references users (user_id)
				on delete cascade,
	friend_id integer not null,
	constraint friend_list_table_pk
		primary key (friend_id, user_id)
);



create table post_comments
(
	comment_id serial not null
		constraint post_comments_pk
			primary key,
	post_id integer not null
		constraint post_comments_user_posts_post_id_fk
			references user_posts
				on delete cascade,
	user_id integer not null
		constraint post_comments_users_user_id_fk
			references users (user_id)
				on delete cascade,
	comment_text text,
	time_posted timestamp default now() not null
);



create table groups
(
	group_id serial not null
		constraint groups_pk
			primary key,
	user_id integer
		constraint groups_users_user_id_fk
			references users (user_id)
				on delete cascade,
	activity text,
	group_name text
);



create table group_requests
(
	group_id integer
		constraint group_requests_groups_group_id_fk
			references groups
				on delete cascade,
	to_user integer,
	constraint group_requests_pk
		unique (group_id, to_user)
);



create table group_list_table
(
	group_id integer not null
		constraint group_list_table_groups_group_id_fk
			references groups,
	user_id integer not null
		constraint group_list_table_users_user_id_fk
			references users (user_id)
				on delete cascade,
	constraint group_list_table_pk
		primary key (group_id, user_id)
);



create table postal_code
(
	postal_code text not null
		constraint postal_code_pk
			primary key,
	city text,
	province char(2)
);



create table locations
(
	location_id serial not null
		constraint locations_pk
			primary key,
	location_name text,
	address text,
	postal_code text
		constraint locations_postal_code_postal_code_fk
			references postal_code
				on update cascade on delete cascade
);



create table user_data
(
	user_id integer not null
		constraint user_data_pk
			unique
		constraint user_data_users_user_id_fk
			references users (user_id)
				on delete cascade,
	age integer,
	sex text,
	name text,
	occupation text,
	location_id integer
		constraint user_data_locations_location_id_fk
			references locations
);



create table events
(
	event_id serial not null,
	group_id integer
		constraint events_groups_group_id_fk
			references groups
				on delete cascade,
	event_name text not null,
	time timestamp default now(),
	location_id integer
		constraint events_locations_location_id_fk
			references locations,
	constraint events_pk
		primary key (event_id, event_name)
);



create unique index events_event_id_uindex
	on events (event_id);

create table event_attendance
(
	event_id integer not null
		constraint event_attendance_events_event_id_fk
			references events (event_id),
	user_id integer not null
		constraint event_attendance_users_user_id_fk
			references users (user_id)
				on delete cascade,
	constraint event_attendance_pk
		primary key (event_id, user_id)
);



create unique index locations_location_name_address_postal_code_uindex
	on locations (location_name, address, postal_code);

create table group_posts
(
	gpost_id serial not null
		constraint group_posts_pk_2
			primary key,
	group_id integer not null
		constraint group_posts_groups_group_id_fk
			references groups
				on delete cascade,
	user_id integer not null
		constraint group_posts_users_user_id_fk
			references users (user_id)
				on delete cascade,
	group_post text,
	time_posted timestamp default now() not null,
	constraint group_posts_pk
		unique (gpost_id, group_id, user_id, time_posted)
);



create unique index group_posts_gpost_id_uindex
	on group_posts (gpost_id);

create table group_post_comments
(
	comment_id serial not null
		constraint post_group_comments_pk
			primary key,
	gpost_id integer
		constraint group_post_comments_group_posts_gpost_id_fk
			references group_posts
				on delete cascade,
	user_id integer
		constraint post_group_comments_users_user_id_fk
			references users (user_id)
				on delete cascade,
	comment_text text,
	time_posted timestamp default now(),
	group_id integer
		constraint group_post_comments_groups_group_id_fk
			references groups
);

INSERT INTO public.users (user_id, email, password) VALUES (1, 'd3a1b@ugrad.cs.ubc.ca', 'ilove304');
INSERT INTO public.users (user_id, email, password) VALUES (2, 'user@email.com', 'password');
INSERT INTO public.users (user_id, email, password) VALUES (3, 'cs304@cs.ubc.ca', 'ilovethisclass');
INSERT INTO public.users (user_id, email, password) VALUES (5, 'cs311@cs.ubc.ca', 'ilovethisclass');
INSERT INTO public.users (user_id, email, password) VALUES (6, 'math200@cs.ubc.ca', 'ilovethisclass');
INSERT INTO public.users (user_id, email, password) VALUES (8, 'eng112@cs.ubc.ca', 'ilovepapers');
INSERT INTO public.users (user_id, email, password) VALUES (9, 'ryanmkitlee@gmail.com', '1234');
INSERT INTO public.users (user_id, email, password) VALUES (17, 'jordan@gmail.com', '1234');
INSERT INTO public.users (user_id, email, password) VALUES (10, 'scie113@ugrad.cs.ubc.ca', 'bestprofessorever');
INSERT INTO public.users (user_id, email, password) VALUES (11, 'cpsc121@ugrad.cs.ubc.ca', 'ilovelogic');
INSERT INTO public.users (user_id, email, password) VALUES (18, 'hey ', 'ryan');
INSERT INTO public.users (user_id, email, password) VALUES (19, 'gavin', 'ham');
INSERT INTO public.users (user_id, email, password) VALUES (34, 'aaaa12345@gmail.com', 'password');

INSERT INTO public.postal_code (postal_code, city, province) VALUES ('V6T1Z4', 'Vancouver', 'BC');
INSERT INTO public.postal_code (postal_code, city, province) VALUES ('V6P 3W8', 'Vancouver', 'BC');
INSERT INTO public.postal_code (postal_code, city, province) VALUES ('V2X1G5', 'Vancouver', 'BC');
INSERT INTO public.postal_code (postal_code, city, province) VALUES ('V1X1G2', 'Victoria', 'BC');

INSERT INTO public.locations (location_id, location_name, address, postal_code) VALUES (1, 'Depression School', '2325 West Mall', 'V6T1Z4');
INSERT INTO public.locations (location_id, location_name, address, postal_code) VALUES (2, 'Plastic cone', '2335 Engineering Road', 'V6T1Z4');
INSERT INTO public.locations (location_id, location_name, address, postal_code) VALUES (11, 'his house', '8120 Fremlin Street', 'V6P 3W8');
INSERT INTO public.locations (location_id, location_name, address, postal_code) VALUES (3, 'DMP 310', '234 Computer Science Rd.', 'V2X1G5');
INSERT INTO public.locations (location_id, location_name, address, postal_code) VALUES (70, 'DMP 310', '123 Computer Science Rd.', 'V1X1G2');

INSERT INTO public.user_data (user_id, age, sex, name, occupation, location_id) VALUES (8, 14, 'Female', 'Lucy MacDonald', 'Student', 2);
INSERT INTO public.user_data (user_id, age, sex, name, occupation, location_id) VALUES (3, 23, 'Male', 'Bob Joe', 'Professor', 3);
INSERT INTO public.user_data (user_id, age, sex, name, occupation, location_id) VALUES (5, 12, 'Male', 'Gareth Crisp', 'Soccer Player', 3);
INSERT INTO public.user_data (user_id, age, sex, name, occupation, location_id) VALUES (2, 13, 'Female', 'Carly Peppy', 'YouTuber', 2);
INSERT INTO public.user_data (user_id, age, sex, name, occupation, location_id) VALUES (1, 18, 'Male', 'Dr.Stranger', 'Auditor', 70);

INSERT INTO public.user_posts (post_id, user_id, post, time_posted) VALUES (4, 1, 'I truly do enjoy this course. I truly have learned a lot from this class.', '2019-03-26 02:48:28.339931');
INSERT INTO public.user_posts (post_id, user_id, post, time_posted) VALUES (5, 8, 'I really enjoy writing papers. It is a great passion of mine. It really contributes to my professional development.', '2019-03-26 19:12:03.494772');
INSERT INTO public.user_posts (post_id, user_id, post, time_posted) VALUES (6, 19, 'CPSC 304 is so fun! ', '2017-04-01 12:12:12.494000');


INSERT INTO public.groups (group_id, user_id, activity, group_name) VALUES (3, 1, '"Rock climbing"', '"Rock climbing heroes"');
INSERT INTO public.groups (group_id, user_id, activity, group_name) VALUES (4, 8, 'Writing English papers', 'Writing Club');

INSERT INTO public.group_requests (group_id, to_user) VALUES (3, 2);
INSERT INTO public.group_requests (group_id, to_user) VALUES (3, 3);
INSERT INTO public.group_requests (group_id, to_user) VALUES (3, 34);

INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (3, 4, 'Tuesday Writing Session', '2019-03-27 02:03:28.224300', 2);
INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (5, 4, 'ESL Classes', '2020-03-29 03:43:35.152344', 2);
INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (2, 4, 'Monday Writing Session', '2016-02-03 12:05:00.000000', 1);
INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (4, 4, 'Say Hello to the world', '2016-02-03 12:05:00.000000', 1);
INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (6, 4, 'Cracking the Coding Interview Prep', '2020-02-03 12:05:00.000000', 3);
INSERT INTO public.events (event_id, group_id, event_name, time, location_id) VALUES (7, 4, 'ghams bday bash', '2016-02-03 12:05:00.000000', 11);

INSERT INTO public.event_attendance (event_id, user_id) VALUES (2, 8);
INSERT INTO public.event_attendance (event_id, user_id) VALUES (2, 1);
INSERT INTO public.event_attendance (event_id, user_id) VALUES (2, 2);
INSERT INTO public.event_attendance (event_id, user_id) VALUES (3, 8);

INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (1, 7);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (8, 3);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (3, 8);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (8, 5);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (5, 8);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (1, 2);
INSERT INTO public.friend_list_table (user_id, friend_id) VALUES (2, 1);

INSERT INTO public.friend_requests (from_user, to_user) VALUES (18, 19);
INSERT INTO public.friend_requests (from_user, to_user) VALUES (9, 34);

INSERT INTO public.group_list_table (group_id, user_id) VALUES (4, 8);
INSERT INTO public.group_list_table (group_id, user_id) VALUES (3, 8);

INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (1, 4, 8, 'I''m so excited to go see everyone at the writing session!', '2019-03-26 21:29:00.225772');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (2, 4, 8, 'I''m so excited to go see everyone at the writing session!', '2019-03-26 21:32:26.378898');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (3, 4, 8, 'It is almost time for us to go to our writing session. I cannot wait! I love papers', '2019-03-26 21:42:34.164102');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (4, 4, 8, 'It is almost time for us to go to our writing session. I cannot wait! I love papers', '2019-03-26 21:42:56.120012');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (5, 4, 8, 'Hello World!', '2019-03-27 02:42:48.839314');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (6, 4, 8, 'Hello World!', '2019-03-27 02:43:23.486198');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (7, 4, 8, 'Hello World!', '2019-03-27 02:46:55.435404');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (8, 4, 8, 'Hello World!', '2019-03-27 02:47:33.187263');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (9, 4, 8, 'Hello World!', '2019-03-27 02:49:50.031775');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (10, 4, 8, 'Hello World!', '2019-03-27 02:50:29.463651');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (11, 4, 8, 'Hello World!', '2019-03-27 02:52:29.563696');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (12, 4, 8, 'Hello World!', '2019-03-27 02:53:38.561328');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (13, 4, 8, '', '2019-03-27 09:22:21.150510');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (14, 4, 8, '', '2019-03-27 09:26:43.471240');
INSERT INTO public.group_posts (gpost_id, group_id, user_id, group_post, time_posted) VALUES (15, 4, 8, 'hi', '2019-03-27 09:51:58.235007');

INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (1, 4, 8, 'I can''t wait! Only a few more hours!', '2019-03-27 05:50:53.298752', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (2, 4, 8, 'Almost time! I''m so excited to do that midterm!', '2019-03-27 05:55:20.311369', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (3, 4, 8, 'That midterm was amazing! It was very fair and I totally believe that the TA wrote an amazing midterm!', '2019-03-27 05:55:47.555646', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (4, 1, 8, 'Taking the derivative of an image is so cool! You can use it do edge detection. If you use a sobel operator it does even more amazing things!', '2019-03-27 06:09:44.183525', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (5, 1, 8, 'hry', '2019-03-28 01:49:01.899329', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (6, 1, 8, 'wassup', '2019-03-28 02:07:47.143121', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (7, 1, 8, 'nm', '2019-03-28 02:08:26.276214', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (8, 1, 8, 'anotha one', '2019-03-28 02:08:54.466912', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (9, 1, 8, 'again?', '2019-03-28 02:09:19.850628', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (10, 1, 8, 'no', '2019-03-28 02:10:05.468488', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (11, 2, 8, 'WOW IM FIRST', '2019-03-28 02:11:45.068229', 4);
INSERT INTO public.group_post_comments (comment_id, gpost_id, user_id, comment_text, time_posted, group_id) VALUES (12, 1, 8, 'hey', '2019-03-28 04:41:11.445332', 4);

INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (4, 4, 1, '"Wow! I also truly enjoy 304. It is almost as great as CPSC 311 and MATH 200. They are all so enjoyable!"', '2019-03-26 03:20:20.252072');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (5, 5, 8, 'I also do love writing papers. Being able to communicate effectively really does help me. I also like to make coffee.', '2019-03-26 19:13:31.014294');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (10, 4, 1, 'I truly do enjoy this course. I truly have learned a lot from this class.', '2019-03-28 04:42:57.159451');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (11, 4, 1, 'I truly do enjoy this course. I truly have learned a lot from this class.', '2019-03-28 04:43:20.735307');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (12, 4, 1, 'Super duper cool!', '2019-03-28 04:44:53.082356');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (13, 4, 1, 'Before this class I didn''t want to be a DBA! Now I do, I''m so excited to look at SQL queries for 8 hours a day! I couldn''t be any happier.', '2019-03-28 06:25:15.660013');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (14, 4, 1, 'I think Dr. Strange is lying', '2019-03-28 06:37:28.714240');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (15, 4, 1, 'I do not think so!', '2019-03-28 06:53:27.784947');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (16, 4, 1, 'I love writing SQL queries!', '2019-03-28 07:02:34.005396');
INSERT INTO public.post_comments (comment_id, post_id, user_id, comment_text, time_posted) VALUES (17, 4, 1, 'me too!', '2019-03-28 09:45:33.664004');


