## API Documentation

### Reference
All queries are to be done on [localhost:5000](localhost:5000)
#### Create user
###### POST: /api/create
```angular2html
{
    "user": "d3a1b@ugrad.cs.ubc.ca"
    "password": "ilove304"
}
```
###### Successful Response
```angular2html
{
    "status": 201,
    "user_id": [
        {
            "user_id": 1
        }
    ]
}
```
###### PUT: /api/create
```angularjs
{
    "user_id": 11,
    "user": "cpsc121@ugrad.cs.ubc.ca",
    "password": "ilovelogic"
}
```
###### Successful Response
```angularjs
{
    "status": 200
}
```
#### Login user
###### GET: /api/login
```angular2html
{
    "email": "d3a1b@ugrad.cs.ubc.ca"
    "password": "ilove304"
}
```
###### Successful Response
```angular2html
{
    "status": 200,
    "user_id": 1
}
```

#### User post
###### POST: /api/user/post
```angular2html
{
    "user_id": 1,
    "post": "I truly do enjoy this course. I truly have learned a lot from this class."
}
```
##### Successful Response
```angular2html
{
    "post_id": {
        "post_id": 5
    },
    "status": 201
}
```

#### User information
###### POST: /api/user/info
```angular2html
{
    "age": 18,
    "name": "Dr. Strange",
    "occupation": "Auditor",
    "sex": "Male",
    "user_id": 1,
    "location_name": "DMP 310",
    "address": "234 Computer Science Rd.",
    "postal_code": "V2X1G5",
    "city": "Vancouver",
    "province": "BC",
    "sex": "Male,
    "name": "Gareth Crisp",
    "occupation": "Soccer Player"
}
```

###### Successful Response
```angular2html
{
    "status": 201
}
```
###### GET: /api/user/info
```angular2html
{
    "user_id": 1
}
```
###### Successful Response
```angular2html
{
    "status": 200,
    "user_data": [
        {
            "age": 18,
            "name": "Dr. Strange",
            "occupation": "Auditor",
            "sex": "Male",
            "user_id": 1,
            "location_name": "DMP 310",
            "address": "234 Computer Science Rd.",
            "postal_code": "V2X1G5",
            "city": "Vancouver",
            "province": "BC",
            "sex": "Male,
            "name": "Gareth Crisp",
            "occupation": "Soccer Player"
        }
    ]
}
``` 

##### User post comment
###### POST: /api/user/comment
```angular2html
{
    "user_id": 1,
    "post_id": 4,
    "comment_text": "Wow! I also truly enjoy 304. It is almost as great as CPSC 311 and MATH 200. They are all so enjoyable!"
}
```
###### Successful Response
```angular2html
{
    "comment_id": {
        "comment_id": 5
    },
    "status": 200
}
```

#### Query posts
Posts include all posts associated to user_id to include friends posts as well as comments.
###### GET: /api/user/view_posts
```angular2html
{
    "user_id": 1
}
```
###### Successful Respnse
```angular2html
{
    "posts": [
        {
            "comments": [
                {
                    "comment_id": 4,
                    "comment_text": "\"Wow! I also truly enjoy 304. It is almost as great as CPSC 311 and MATH 200. They are all so enjoyable!\"",
                    "post_id": 4,
                    "time_posted": "Tue, 26 Mar 2019 03:20:20 GMT",
                    "user_id": 1
                }
            ],
            "post": {
                "name": "Dr. Strange",
                "post": "I truly do enjoy this course. I truly have learned a lot from this class.",
                "post_id": 4,
                "time_posted": "Tue, 26 Mar 2019 02:48:28 GMT",
                "user_id": 1
            }
        }
    ],
    "status": 200
}
```
#### Sending friend requests
Requires two user_id(s). One pertaining to the user whom is sending the request and the user who is being sent the request.
###### POST: /api/user/send_friend_request
```angular2html
{
    "user_id": 7,
    "friend_id": 1
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```

#### Querying friend requests
Queries friend requests for a certain user_id.
###### GET: /api/user/view_friend_requests
```angular2html
{
    "user_id": 1
}
```
###### Successful Response
```angular2html
{
    "friend_requests": [
        {
            "name": "Ryan Lee",
            "to_user": 1
        }
    ],
    "status": 200
}
```
#### Accept/Decline friend requests
Accept friend request
###### POST: /api/user/friend_request
```angular2html
{
    "user_id": 1,
    "friend_id": 7
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```
Decline friend request
###### DELETE: /api/user/friend_request
```angular2html
{
    "user_id": 1,
    "friend_id": 7
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```

#### Create group
###### POST: /api/groups/create
```angular2html
{
    "user_id": 1,
    "activity": "Rock climbing",
    "group_name": "Rock climbing heroes"
}
```
###### Successful Response
```angular2html
{
    "group_id": {
        "group_id": 4
    },
    "status": 201
}
```

#### Send group request
###### POST: /api/groups/send_request
```angular2html
{
    "user_id": 1,
    "friend_id": 7,
    "group_id": 3
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```
#### Accept/Decline group request
Accept group request
###### POST: /api/user/group_request
```angular2html
{
    "group_id": 1,
    "friend_id": 7
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```
Decline group request
###### DELETE: /api/user/group_request
```angular2html
{
    "group_id": 1,
    "friend_id": 7
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```
#### Group posts
###### POST: /api/groups/post
```angularjs
{
    "group_id": 4,
    "user_id": 8,
    "group_post": "It is almost time for us to go to our writing session. I cannot wait! I love papers"
}
```
###### Successful Response
```angularjs
{
    "gpost_id": {
        "gpost_id": 4
    },
    "status": 200
}
```
###### GET: /api/groups/post
```angularjs
{
    "group_id": 4
}
```
###### Successful Response
```angularjs
{
    "posts": [
        {
            "group_id": 4,
            "group_post": "I'm so excited to go see everyone at the writing session!",
            "name": "Lucy MacDonald",
            "time_posted": "Tue, 26 Mar 2019 21:29:00 GMT",
            "user_id": 8
        },
        {
            "group_id": 4,
            "group_post": "I'm so excited to go see everyone at the writing session!",
            "name": "Lucy MacDonald",
            "time_posted": "Tue, 26 Mar 2019 21:32:26 GMT",
            "user_id": 8
        },
        {
            "group_id": 4,
            "group_post": "It is almost time for us to go to our writing session. I cannot wait! I love papers",
            "name": "Lucy MacDonald",
            "time_posted": "Tue, 26 Mar 2019 21:42:34 GMT",
            "user_id": 8
        },
        {
            "group_id": 4,
            "group_post": "It is almost time for us to go to our writing session. I cannot wait! I love papers",
            "name": "Lucy MacDonald",
            "time_posted": "Tue, 26 Mar 2019 21:42:56 GMT",
            "user_id": 8
        }
    ],
    "status": 200
}
```

#### Query group information
###### GET: /api/groups/info
```angularjs
{
    "group_id": 4
}
```
###### Successful Response
```angularjs
{
    "groups": [
        {
            "activity": "Writing English papers",
            "group_id": 4,
            "group_name": "Writing Club",
            "user_id": 8
        }
    ],
    "status": 200
}
```
#### Create event for a group
###### POST: /api/groups/event/create
```angularjs
{
    "group_id": 4,
    "event_name": "Monday Writing Session",
    "location_name": "DMP 310",
    "address": "234 Computer Science Rd.",
    "postal_code": "V2X1G5",
    "city": "Vancouver",
    "province": "BC",
    "timestamp": '2/3/2016 12:05'
}
```
###### Successful Response
```angularjs
{
    "event_id": {
        "event_id": 2
    },
    "location_id": 3
    "status": 200
}
```

#### View all events for a group
###### GET: /api/groups/event/view
```angularjs
{
    "group_id": 4
}
```
###### Successful Response
```angularjs
{
    "events": [
        {
            "event_id": 2,
            "event_name": "Monday Writing Session",
            "group_id": 4,
            "location": "Vancouver, BC",
            "time": "Wed, 03 Feb 2016 12:05:00 GMT"
        }
    ],
    "status": 200
}
```
#### Event attendance
User attends an event
###### POST: /api/groups/event/attend
```angularjs
{
    "event_id": 2,
    "user_id": 8,
}
```
###### Successful Response
```angular2html
{
    "status": 200
}
```

###### GET: /api/groups/event/attend
```angularjs
{
    "event_id": 2,
}
```
###### Successful Response
```angular2html
{
    "attendees": [
        {
            "name": "Lucy MacDonald",
            "user_id": 8
        }
    ],
    "status": 200
}
```
#### Get user who joined all the groups (SQL Division Endpoint)
###### GET: /api/groups/most_joined
###### Successful Response
```angularjs
{
    "status": 200,
    "users": [
        {
            "age": 14,
            "location": "Vancouver, BC",
            "name": "Lucy MacDonald",
            "occupation": "Student",
            "sex": "Female",
            "user_id": 8
        }
    ]
}
```

#### Count and query all events this month in a group (Aggregate query)
###### GET: api/groups/monthly_events
```angularjs
{
    "group_id": 4
}
```
```angularjs
{
    "count": {
        "count": 1
    },
    "events": [
        {
            "event_id": 3,
            "event_name": "Tuesday Writing Session",
            "group_id": 4,
            "location": "New Zealand",
            "time": "Wed, 27 Mar 2019 02:03:28 GMT"
        }
    ],
    "status": 200
}
```

#### Group all friends by city
###### GET: /api/user/friend_locations
```angularjs
{
    "user_id": 8
}
```
###### Successful Response
```angularjs
{
    "friends": [
        [
            {
                "city": "Vancouver",
                "count": 2,
                "location_id": 3
            },
            [
                {
                    "address": "234 Computer Science Rd.",
                    "age": 23,
                    "city": "Vancouver",
                    "location_name": "DMP 310",
                    "name": "Bob Joe",
                    "occupation": "Professor",
                    "postal_code": "V2X1G5",
                    "province": "BC",
                    "sex": "Male",
                    "user_id": 8
                },
                {
                    "address": "234 Computer Science Rd.",
                    "age": 12,
                    "city": "Vancouver",
                    "location_name": "DMP 310",
                    "name": "Gareth Crisp",
                    "occupation": "Soccer Player",
                    "postal_code": "V2X1G5",
                    "province": "BC",
                    "sex": "Male",
                    "user_id": 8
                }
            ]
        ]
    ],
    "status": 200
}
```