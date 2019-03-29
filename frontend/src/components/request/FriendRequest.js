import React, {Component} from "react";

import Button from 'react-bootstrap/Button';

import ProfilePicture from '../ProfilePicture';
import {store} from "../../store";
import {acceptFriendRequest, declineFriendRequest} from "../../actions/friendRequests";

export default class FriendRequest extends Component {



    render() {
    return (
      <div>
        <ProfilePicture userId={this.props.request.from_user}/>
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