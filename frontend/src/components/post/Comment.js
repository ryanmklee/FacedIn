import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

import formatDateString from '../../utils/date';

import './Comment.css';

function getUser(userId) {
  return {
        "age": 18,
        "location": "Seattle, WA",
        "name": "Dr. Strange",
        "occupation": "Auditor",
        "sex": "Male",
        "user_id": 1
    }
}

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.data.commentData.post;
      console.log(this.user)

      this.date = formatDateString(this.props.data.commentData.comment.time_posted);
  }

  render() {
    return (
      <Container>
        <Row className="mt-2 flex-nowrap">
          <Col md="auto" className="no-padding">
            <Image roundedCircle thumbnail className="comment-image" src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"></Image>
          </Col>
          <Col>
            <Row>
              <Col md="auto" className="no-padding">
                <h6>{this.user.name}</h6>
              </Col>
              <Col className="no-padding">
                <p>{this.props.data.commentData.comment.comment_text}</p>
              </Col>
            </Row>
            <Row className="date">{this.date}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}