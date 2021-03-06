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
###### DELETE: /api/user/post
```angularjs
{
    "user_id": 2,
    "post_id": 12
}
```
###### Successful Response
```angularjs
{
    "status": 200
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
}
```
###### Successful Response
```angular2html
{
    "status": 201
}
```
###### PUT: /api/user/info
```angularjs
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
}
```
###### Successful Response
```angularjs
{
    "message": "Updated 1",
    "status": 200
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
###### Successful Response
```angular2html
{
    "posts": [
        {
            "comments": [
                {
                    "comment_id": 4,
                    "comment_text": "\"Wow! I also truly enjoy 304. It is almost as great as CPSC 311 and MATH 200. They are all so enjoyable!\"",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Tue, 26 Mar 2019 03:20:20 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 10,
                    "comment_text": "I truly do enjoy this course. I truly have learned a lot from this class.",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 04:42:57 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 11,
                    "comment_text": "I truly do enjoy this course. I truly have learned a lot from this class.",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 04:43:20 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 12,
                    "comment_text": "Super duper cool!",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 04:44:53 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 13,
                    "comment_text": "Before this class I didn't want to be a DBA! Now I do, I'm so excited to look at SQL queries for 8 hours a day! I couldn't be any happier.",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 06:25:15 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 14,
                    "comment_text": "I think Dr. Strange is lying",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 06:37:28 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 15,
                    "comment_text": "I do not think so!",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 06:53:27 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 16,
                    "comment_text": "I love writing SQL queries!",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 07:02:34 GMT",
                    "user_id": 1
                },
                {
                    "comment_id": 17,
                    "comment_text": "me too!",
                    "name": "Dr. Strangest",
                    "post_id": 4,
                    "time_posted": "Thu, 28 Mar 2019 09:45:33 GMT",
                    "user_id": 1
                }
            ],
            "post": {
                "name": "Dr. Strangest",
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
    {
    "friend_requests": [
        {
            "age": 14,
            "from_user": 8,
            "location_id": 2,
            "name": "Lucy MacDonald",
            "occupation": "Student",
            "sex": "Female",
            "to_user": 1,
            "user_id": 8
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
#### Join group
###### POST: /api/groups/join
```angularjs
{
    "group_id": 4,
    "user_id": 1
}
```
###### Successful Response
```angularjs
{
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
        [
            {
                "gpost_id": 1,
                "group_id": 4,
                "group_post": "I'm so excited to go see everyone at the writing session!",
                "name": "Lucy MacDonald",
                "time_posted": "Tue, 26 Mar 2019 21:29:00 GMT",
                "user_id": 8
            },
            {
                "comments": [
                    {
                        "age": 14,
                        "comment_id": 4,
                        "comment_text": "Taking the derivative of an image is so cool! You can use it do edge detection. If you use a sobel operator it does even more amazing things!",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Wed, 27 Mar 2019 06:09:44 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 5,
                        "comment_text": "hry",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 01:49:01 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 6,
                        "comment_text": "wassup",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:07:47 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 7,
                        "comment_text": "nm",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:08:26 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 8,
                        "comment_text": "anotha one",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:08:54 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 9,
                        "comment_text": "again?",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:09:19 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 10,
                        "comment_text": "no",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:10:05 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 12,
                        "comment_text": "hey",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 04:41:11 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 13,
                        "comment_text": "hi",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 18:43:49 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 123,
                        "comment_id": 15,
                        "comment_text": "Wassup bro",
                        "gpost_id": 1,
                        "group_id": 4,
                        "location_id": 77,
                        "name": "Dr. Strangest",
                        "occupation": "Auditor",
                        "sex": "Male",
                        "time_posted": "Thu, 28 Mar 2019 21:45:29 GMT",
                        "user_id": 1
                    }
                ]
            }
        ],
        [
            {
                "gpost_id": 2,
                "group_id": 4,
                "group_post": "I'm so excited to go see everyone at the writing session!",
                "name": "Lucy MacDonald",
                "time_posted": "Tue, 26 Mar 2019 21:32:26 GMT",
                "user_id": 8
            },
            {
                "comments": [
                    {
                        "age": 14,
                        "comment_id": 11,
                        "comment_text": "WOW IM FIRST",
                        "gpost_id": 2,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Thu, 28 Mar 2019 02:11:45 GMT",
                        "user_id": 8
                    }
                ]
            }
        ],
        [
            {
                "gpost_id": 3,
                "group_id": 4,
                "group_post": "It is almost time for us to go to our writing session. I cannot wait! I love papers",
                "name": "Lucy MacDonald",
                "time_posted": "Tue, 26 Mar 2019 21:42:34 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 4,
                "group_id": 4,
                "group_post": "It is almost time for us to go to our writing session. I cannot wait! I love papers",
                "name": "Lucy MacDonald",
                "time_posted": "Tue, 26 Mar 2019 21:42:56 GMT",
                "user_id": 8
            },
            {
                "comments": [
                    {
                        "age": 14,
                        "comment_id": 1,
                        "comment_text": "I can't wait! Only a few more hours!",
                        "gpost_id": 4,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Wed, 27 Mar 2019 05:50:53 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 2,
                        "comment_text": "Almost time! I'm so excited to do that midterm!",
                        "gpost_id": 4,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Wed, 27 Mar 2019 05:55:20 GMT",
                        "user_id": 8
                    },
                    {
                        "age": 14,
                        "comment_id": 3,
                        "comment_text": "That midterm was amazing! It was very fair and I totally believe that the TA wrote an amazing midterm!",
                        "gpost_id": 4,
                        "group_id": 4,
                        "location_id": 2,
                        "name": "Lucy MacDonald",
                        "occupation": "Student",
                        "sex": "Female",
                        "time_posted": "Wed, 27 Mar 2019 05:55:47 GMT",
                        "user_id": 8
                    }
                ]
            }
        ],
        [
            {
                "gpost_id": 5,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:42:48 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 6,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:43:23 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 7,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:46:55 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 8,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:47:33 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 9,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:49:50 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 10,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:50:29 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 11,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:52:29 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 12,
                "group_id": 4,
                "group_post": "Hello World!",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 02:53:38 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 13,
                "group_id": 4,
                "group_post": "",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 09:22:21 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 14,
                "group_id": 4,
                "group_post": "",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 09:26:43 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ],
        [
            {
                "gpost_id": 15,
                "group_id": 4,
                "group_post": "hi",
                "name": "Lucy MacDonald",
                "time_posted": "Wed, 27 Mar 2019 09:51:58 GMT",
                "user_id": 8
            },
            {
                "comments": []
            }
        ]
    ],
    "status": 200
}
```
#### Query all groups
###### GET: /api/groups/all
###### Successful Response
```angularjs
{
    "groups": [
        {
            "activity": "\"Rock climbing\"",
            "admin": "Dr. Strange",
            "group_id": 3,
            "group_name": "\"Rock climbing heroes\"",
            "user_id": 1
        },
        {
            "activity": "Writing English papers",
            "admin": "Lucy MacDonald",
            "group_id": 4,
            "group_name": "Writing Club",
            "user_id": 8
        }
    ],
    "status": 200
}

```
#### Add a comment to a group post
###### POST: /api/groups/insert_comment
```angularjs
{
    "group_id": 4,
    "gpost_id": 1,
    "user_id": 8,
    "comment_text": "Taking the derivative of an image is so cool! You can use it do edge detection. If you use a sobel operator it does even more amazing things!
}
```
###### Successful Response
```angularjs
{
    "comment_id": {
        "comment_id": 4
    },
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
    "location_id": 3,
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
        "count": 2
    },
    "events": [
        {
            "address": "2335 Engineering Road",
            "city": "Vancouver",
            "event_id": 3,
            "event_name": "Tuesday Writing Session",
            "group_id": 4,
            "location_id": 2,
            "location_name": "Plastic cone",
            "postal_code": "V6T1Z4",
            "province": "BC",
            "time": "Wed, 27 Mar 2019 02:03:28 GMT"
        },
        {
            "address": "234 Computer Science Rd.",
            "city": "Vancouver",
            "event_id": 9,
            "event_name": "Google Interview",
            "group_id": 4,
            "location_id": 3,
            "location_name": "DMP 310",
            "postal_code": "V2X1G5",
            "province": "BC",
            "time": "Thu, 28 Mar 2019 22:09:56 GMT"
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
                "city": "Calgary",
                "count": 1,
                "location_id": 77
            },
            [
                {
                    "address": "420 Computer Science Rd.",
                    "age": 19,
                    "city": "Calgary",
                    "location_name": "DMP 110",
                    "name": "Dr. Strange",
                    "occupation": "Starbucks Barista",
                    "postal_code": "G2A1F4",
                    "province": "AB",
                    "sex": "Male",
                    "user_id": 1
                }
            ]
        ],
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
                    "user_id": 3
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
                    "user_id": 5
                }
            ]
        ]
    ],
    "status": 200
}
```
#### Search users, events and groups based on a phrase
This endpoint looks at the users' name, location and occupation,
looks at group name, looks at event name and activity then pattern matches with a wildcard with the phrase.
###### GET: /api/search
```angularjs
{
    "phrase": "g"
}
```
```angularjs
{
    "res": {
        "events": [
            {
                "activity": "Writing English papers",
                "address": "8120 Fremlin Street",
                "city": "Vancouver",
                "event_id": 7,
                "event_name": "ghams bday bash",
                "group_id": 4,
                "group_name": "Writing Club",
                "location_id": 11,
                "location_name": "his house",
                "postal_code": "V6P 3W8",
                "province": "BC",
                "time": "Wed, 03 Feb 2016 12:05:00 GMT",
                "user_id": 8
            }
        ],
        "groups": [],
        "users": [
            {
                "address": "234 Computer Science Rd.",
                "age": 12,
                "city": "Vancouver",
                "location_id": 3,
                "location_name": "DMP 310",
                "name": "Gareth Crisp",
                "occupation": "Soccer Player",
                "postal_code": "V2X1G5",
                "province": "BC",
                "sex": "Male",
                "user_id": 5
            }
        ]
    },
    "status": 200
}
```
#### Query users in a group
###### GET: /api/groups/users
```angularjs
{
    "group_id": 8
}
```
###### Successful Response
```angularjs
{
    "status": 200,
    "users": [
        {
            "address": "2335 Engineering Road",
            "age": 14,
            "city": "Vancouver",
            "location_id": 2,
            "location_name": "Plastic cone",
            "name": "Lucy MacDonald",
            "occupation": "Student",
            "postal_code": "V6T1Z4",
            "province": "BC",
            "sex": "Female",
            "user_id": 8
        },
        {
            "address": "420 Computer Science Rd.",
            "age": 19,
            "city": "Calgary",
            "location_id": 77,
            "location_name": "DMP 110",
            "name": "Dr. Strange",
            "occupation": "Starbucks Barista",
            "postal_code": "G2A1F4",
            "province": "AB",
            "sex": "Male",
            "user_id": 1
        }
    ]
}

```