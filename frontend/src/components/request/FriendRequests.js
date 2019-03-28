import React, { Component } from "react";

import ListGroup from 'react-bootstrap/ListGroup';
import Popover from 'react-bootstrap/Popover';

import FriendRequest from './FriendRequest';

// TODO: replace mockdata
import mockFriendRequests from '../../mockData/mockFriendRequests';

export default class FriendRequests extends Component {
  render() {
    return (
      <ListGroup className="mb-3">
          {
            mockFriendRequests.map((request, i) =>
              <ListGroup.Item key={i}>
                <FriendRequest request={request}/>
              </ListGroup.Item>
            )
          }
      </ListGroup>
    );
  }
}