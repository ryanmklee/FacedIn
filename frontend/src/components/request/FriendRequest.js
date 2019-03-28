import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfilePicture from '../ProfilePicture';
import store from "../../store";
import {acceptFriendRequest, declineFriendRequest} from "../../actions/friendRequests";

// TODO: add accept and decline API calls

export default class FriendRequest extends Component {



    render() {
    return (
      <div>
        <ProfilePicture userId={this.props.request.from_user}></ProfilePicture>
        <label className="ml-3 mr-3">{this.props.request.name}</label>
        <Button variant="primary" onClick={() => {
            store.dispatch(acceptFriendRequest(this.props.request.from_user, this.props.request.to_user))
        }}>Accept</Button>
        <Button variant="secondary" onClick={() => {
            store.dispatch(declineFriendRequest(this.props.request.from_user, this.props.request.to_user))
        }}>Decline</Button>
      </div>
    );
  }
}