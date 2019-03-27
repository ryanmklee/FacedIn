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
import connect from "react-redux/es/connect/connect";
import {tryLogin} from "../actions/login";
import store from "../store";
import {
    createEventForGroup,
    getIGroupEvents,
    getIGroupInformation,
    getIGroupPosts,
    postToGroup
} from "../actions/individualGroupPage";

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
  {
    "event_id": 2,
    "event_name": "Monday Writing Session",
    "group_id": 4,
    "location": "Vancouver, BC",
    "time": "Wed, 03 Feb 2016 12:05:00 GMT"
  },
  {
    "event_id": 2,
    "event_name": "Monday Writing Session",
    "group_id": 4,
    "location": "Vancouver, BC",
    "time": "Wed, 03 Feb 2016 12:05:00 GMT"
  }
];

class IndividualGroupPage extends React.Component {

    componentDidMount() {
        const tempGroupId = 4;
        const tempUserId = 8;

        // this.props.dispatch(getIGroupPosts(tempGroupId)).then(() => {
        //
        // });

        this.props.dispatch(getIGroupEvents(tempGroupId)).then(() => {

        });
        //
        // this.props.dispatch(getIGroupInformation(tempGroupId)).then(() => {
        //
        // });

        // this.props.dispatch(postToGroup(tempGroupId, tempUserId, "Hello World!")).then(() => {
        //
        // });
        //
        // this.props.dispatch(createEventForGroup(tempGroupId, "Say Hello to the world", "Somewhere", '2/3/2016 12:05')).then(() => {
        //
        // });
    }

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
            this.props.events.map((event) =>
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
function mapStateToProps(state){
    return {
        posts: state.individualGroupPage.posts,
        events: state.individualGroupPage.events,
        size: state.individualGroupPage.events.size
    }
}
export default connect(mapStateToProps)(IndividualGroupPage)