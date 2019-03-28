import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ProfilePicture from './ProfilePicture';
import {Link} from "react-router-dom";

export default class User extends Component {
  render() {
      console.log(this.props.user.user_id)
    return (
      <Row>
        <Col md="auto">
          <ProfilePicture userId={this.props.user.user_id}/>
        </Col>
        <Col>
          <h5 className="mt-2">{this.props.user.name}</h5>
        </Col>
        <Col md="auto" className="mr-3">
            <Button>
                <Link to={{pathname: "/profile", state:{userId: this.props.user.user_id}}} style={{ color: 'white' }}>View</Link>
            </Button>
        </Col>
      </Row>
    );
  }
}