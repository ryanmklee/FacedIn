import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Event from './Event';
import Post from './post/Post';

import './Group.css';

const posts = [
  {
      "comments": [
          {
              "comment_id": 4,
              "comment_text": "\"Wow! I also truly enjoy 304. It is almost as great as CPSC 311 and MATH 200. They are all so enjoyable!\"",
              "post_id": 4,
              "time_posted": "Tue, 26 Mar 2019 03:20:20 GMT",
              "user_id": 1
          },
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
  },
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
];

const events = [
  {name: 'BBQ Party', date: new Date(), location: "UBC"},
  {name: 'Valentine\'s day', date: new Date(), location: "Vancouver"},
  {name: 'Christmas party', date: new Date(), location: "Coquitlam"}
];

export default class Group extends Component {
  render() {
    return (
      <Container className="mt-3 mb-3 group">
        <Jumbotron className="groupTitle">
          <h2>CPSC 304 Group</h2>
          <p>This is a placeholder for group description.</p>
          <Button>Join Group</Button>
        </Jumbotron>
        <Row>
          <Col><h4>Group posts</h4></Col>
          <Col md="auto"><Button variant="primary">Add Post</Button></Col>
        </Row>
        <hr/>
        <ListGroup className="mb-3">
          {
            posts.map((postObj) =>
              <ListGroup.Item>
                <Post post={postObj.post} comments={postObj.comments}/>
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <Row>
          <Col><h4>Events</h4></Col>
          <Col md="auto"><Button variant="primary">Add Event</Button></Col>
        </Row>
        <hr/>
        <ListGroup>
          {
            events.map((event) =>
              <ListGroup.Item>
                <Event event={event}/>
              </ListGroup.Item>
            )
          }
        </ListGroup>
      </Container>
    );
  }
}
