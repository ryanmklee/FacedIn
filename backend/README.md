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
    "status": 201
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

##### Successful Response
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
            "occupation": "Auditior",
            "sex": "Male",
            "user_id": 1
        }
    ]
}
``` 
