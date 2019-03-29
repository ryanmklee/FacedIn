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
import {
    createEventForGroup, getGroupMembers, getGroupMonthlyEvent,
    getIGroupEvents,
    getIGroupInformation,
    getIGroupPosts, joinGroup,
    postToGroup
} from "../actions/individualGroupPage";
import {
    EVENT_ADDRESS_INPUT, EVENT_CITY,
    EVENT_LOCATION_NAME_INPUT,
    EVENT_NAME_INPUT, EVENT_POSTALCODE, EVENT_PROVINCE, EVENT_TIMESTAMP, GROUP_POST_TYPE,
    USERNAME_INPUT,
    WRITE_GROUP_POST_INPUT
} from "../constants/actionTypes";
import {acceptGroupRequest, sendGroupRequest} from "../actions/general";
import Navigator from "./Navigator";
class IndividualGroupPage extends React.Component {

    componentWillMount() {
        this.props.getGroupInfo(this.props.location.state.groupId)
    }

    componentDidMount() {
        let groupId = this.props.location.state.groupId;
        this.props.getGroupMembers(groupId);
        this.props.getGroupPosts(groupId);
        setTimeout(function(){
            this.props.getGroupEvents(groupId);
            this.props.getMonthlyGroupEvents(groupId)
        }.bind(this),1000);


    }

    render() {
        let userInThisGroup = false;
        if (this.props.groupMembers.some(e => e.user_id === this.props.userId)) {
            userInThisGroup = true
        }
        return (
            <div>
                <Navigator/>
                <Container className="mt-3 mb-3 group">
                    <Jumbotron className="groupTitle">
                        <h2>{this.props.groupName}</h2>
                        <p>{this.props.groupDesc}</p>
                        {(!this.props.acceptedToGroup && !userInThisGroup) &&<Button onClick={() => {
                            this.props.joinGroup(this.props.userId, this.props.location.state.groupId)
                        }}>Join Group</Button>}
                    </Jumbotron>
                    <Row>
                        <Col><h4>Group posts</h4></Col>
                        {userInThisGroup &&<Row>
                        <input id={WRITE_GROUP_POST_INPUT} type="text" placeholder="Write a post..."/>
                        <Col md="auto"><Button variant="primary" onClick={() => {
                            let postText = document.getElementById(WRITE_GROUP_POST_INPUT).value;
                            this.props.createPost(this.props.location.state.groupId, this.props.userId, postText)
                        }}>Add Post</Button></Col>
                        </Row>}
                    </Row>
                    <hr/>
                    <ListGroup className="mb-3">
                        {
                            this.props.posts.map((postObj) =>
                                <ListGroup.Item>
                                    <Post post={postObj} type={GROUP_POST_TYPE}/>
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
                            this.props.createEvent(this.props.location.state.groupId, eName, eLName, eAddress, ePostal, eCity, eProvince, eTS)
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
                    <Row>
                        <h2>{"Events This Month: " + this.props.monthlyEventsCount}</h2>
                    </Row>
                    <ListGroup>
                        {
                            this.props.monthlyEvents.map((event) =>
                                <ListGroup.Item>
                                    <Event event={event} attendable={userInThisGroup}/>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                    <h2>All Events</h2>
                    <ListGroup>
                        {
                            this.props.events.map((event) =>
                                <ListGroup.Item>
                                    <Event event={event} attendable={userInThisGroup}/>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Container>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        userId: state.login.user_id,
        posts: state.individualGroupPage.posts,
        events: state.individualGroupPage.events,
        monthlyEvents: state.individualGroupPage.monthlyEvents,
        monthlyEventsCount: state.individualGroupPage.monthlyEventsCount,
        groupMembers: state.individualGroupPage.groupMembers,
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
    getGroupMembers: (groupId) => {
        dispatch(getGroupMembers(groupId))
    },
    createPost: (groupId, userId, postText) => {
        dispatch(postToGroup(groupId, userId, postText))
    },
    createEvent : (groupId, eventName, locationName, address, postalCode, city, province, timestamp) => {
        dispatch(createEventForGroup(groupId, eventName, locationName, address, postalCode, city, province, timestamp))
    },
    joinGroup: (userId, groupId) => {
        dispatch(joinGroup(groupId, userId))
    }

});
export default connect(mapStateToProps, mapDispatchToProps)(IndividualGroupPage)