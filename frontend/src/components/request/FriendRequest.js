import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProfilePicture from '../ProfilePicture';

// TODO: add accept and decline API calls

export default class FriendRequest extends Component {
  render() {
    return (
      <div>
        <ProfilePicture userId={this.props.request.user_id}></ProfilePicture>
        <label className="ml-3 mr-3">{this.props.request.name}</label>
        <Button variant="primary">Accept</Button>
        <Button variant="secondary">Decline</Button>
      </div>
    );
  }
}