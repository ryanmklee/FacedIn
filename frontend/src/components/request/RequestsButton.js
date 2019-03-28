import React, { Component } from "react";

import OverlayTrigger  from 'react-bootstrap/OverlayTrigger';
import FriendRequests from './FriendRequests';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover style={{maxWidth:'100%'}}>
    <h5>Friend requests</h5>
    <FriendRequests style={{maxWidth:'100%'}}/>
  </Popover>
);

export default class RequestsButton extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <img src="https://img.icons8.com/material/24/FFFFFF/bell.png"
             style={{height: "24px", marginTop: "0.5em"}}/>
      </OverlayTrigger>
    );
  }
}