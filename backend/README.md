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
    "user_id": 1,
    "age": 18,
    "name": "Dr. Strange",
    "sex": Male,
    "location": "Seattle, WA",
    "occupation": Auditor
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
            "location": "Seattle, WA",
            "name": "Dr. Strange",
            "occupation": "Auditor",
            "sex": "Male",
            "user_id": 1
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

