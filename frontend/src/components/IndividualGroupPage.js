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
    createEventForGroup, getGroupMonthlyEvent,
    getIGroupEvents,
    getIGroupInformation,
    getIGroupPosts,
    postToGroup
} from "../actions/individualGroupPage";
import {
    EVENT_ADDRESS_INPUT, EVENT_CITY,
    EVENT_LOCATION_NAME_INPUT,
    EVENT_NAME_INPUT, EVENT_POSTALCODE, EVENT_PROVINCE, EVENT_TIMESTAMP,
    USERNAME_INPUT,
    WRITE_GROUP_POST_INPUT
} from "../constants/actionTypes";
import {acceptGroupRequest, sendGroupRequest} from "../actions/general";

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
const tempGroupId = 4;
const tempUserId = 8;
class IndividualGroupPage extends React.Component {

    componentWillMount() {
        this.props.getGroupInfo(tempGroupId)
    }

    componentDidMount() {
        this.props.getGroupPosts(tempGroupId);
        this.props.getGroupEvents(tempGroupId);
        this.props.getMonthlyGroupEvents(tempGroupId)

    }

    render() {
    return (
      <Container className="mt-3 mb-3 group">
        <Jumbotron className="groupTitle">
          <h2>{this.props.groupName}</h2>
          <p>{this.props.groupDesc}</p>
            {!this.props.acceptedToGroup &&<Button onClick={() => {
              let tempFriendId = 7;
              this.props.joinGroup(tempUserId, tempFriendId, tempGroupId)
          }}>Join Group</Button>}
        </Jumbotron>
        <Row>
          <Col><h4>Group posts</h4></Col>
            <input id={WRITE_GROUP_POST_INPUT} type="text" placeholder="Write a post..."/>
            <Col md="auto"><Button variant="primary" onClick={() => {
                let postText = document.getElementById(WRITE_GROUP_POST_INPUT).value;
                this.props.createPost(tempGroupId, tempUserId, postText)
            }}>Add Post</Button></Col>
        </Row>
        <hr/>
        <ListGroup className="mb-3">
          {
            this.props.posts.map((postObj) =>
              <ListGroup.Item>
                <Post post={postObj} comments={postObj.comments}/>
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <Row>
          <Col><h4>Events</h4></Col>
          <Col md="auto"><Button variant="primary" onClick={() => {
              let eName = document.getElementById(EVENT_NAME_INPUT).value;
              let eLName = document.getElementById(EVENT_LOCATION_NAME_INPUT).value;
              let eAddress = document.getElementById(EVENT_ADDRESS_INPUT).value;
              let ePostal = document.getElementById(EVENT_POSTALCODE).value;
              let eCity = document.getElementById(EVENT_CITY).value;
              let eProvince = document.getElementById(EVENT_PROVINCE).value;
              let eTS = document.getElementById(EVENT_TIMESTAMP).value;
              this.props.createEvent(tempGroupId, eName, eLName, eAddress, ePostal, eCity, eProvince, eTS)
          }}>Add Event</Button></Col>
        </Row>
          <Row>
              <input id={EVENT_NAME_INPUT} type="text" placeholder="Event name..."/>
              <input id={EVENT_LOCATION_NAME_INPUT} type="text" placeholder="Location Name..."/>
              <input id={EVENT_ADDRESS_INPUT} type="text" placeholder="Address..."/>
              <input id={EVENT_POSTALCODE} type="text" placeholder="Postal Code..."/>
              <input id={EVENT_CITY} type="text" placeholder="City..."/>
              <input id={EVENT_PROVINCE} type="text" placeholder="Province..."/>
              <input id={EVENT_TIMESTAMP} type="text" placeholder="Tstamp...2/3/2016 12:05"/>
          </Row>

          <hr/>
          <h2>Events This Month</h2>
          <ListGroup>
              {
                  this.props.monthlyEvents.map((event) =>
                      <ListGroup.Item>
                          <Event event={event}/>
                      </ListGroup.Item>
                  )
              }
          </ListGroup>
          <h2>All Events</h2>
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
        userId: state.login.user_id,
        posts: state.individualGroupPage.posts,
        events: state.individualGroupPage.events,
        monthlyEvents: state.individualGroupPage.monthlyEvents,
        groupName: state.individualGroupPage.groupName,
        groupDesc: state.individualGroupPage.groupDesc,
        acceptedToGroup: state.individualGroupPage.acceptedToGroup
    }
}

const mapDispatchToProps = (dispatch) => ({
    getGroupInfo: (groupId) => {
        dispatch(getIGroupInformation(groupId))
    },
    getGroupPosts: (groupId) => {
        dispatch(getIGroupPosts(groupId))
    },
    getGroupEvents: (groupId) => {
        dispatch(getIGroupEvents(groupId))
    },
    getMonthlyGroupEvents: (groupId) => {
        dispatch(getGroupMonthlyEvent(groupId))
    },
    createPost: (groupId, userId, postText) => {
        dispatch(postToGroup(groupId, userId, postText))
    },
    createEvent : (groupId, eventName, locationName, address, postalCode, city, province, timestamp) => {
        dispatch(createEventForGroup(groupId, eventName, locationName, address, postalCode, city, province, timestamp))
    },
    joinGroup: (userId, friendId, groupId) => {
        dispatch(sendGroupRequest(userId, friendId, groupId)).then(() => {
            dispatch(acceptGroupRequest(friendId, groupId))
        })
    }

});
export default connect(mapStateToProps, mapDispatchToProps)(IndividualGroupPage)