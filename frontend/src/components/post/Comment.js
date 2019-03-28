import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Comment.css';
import ProfilePicture from "../ProfilePicture";


export default class Comment extends Component {
  render() {
    console.log(this.props)
    return (
      <Container>
        <Row className="mt-2 flex-nowrap">
          <Col md="auto" className="no-padding">
            <ProfilePicture userId={this.props.data.commentData.comment.user_id} />
          </Col>
          <Col>
            <Row>
              <Col md="auto" className="no-padding">
                <h6>{this.props.data.commentData.comment.name}</h6>
              </Col>
              <Col className="no-padding">
                <p>{this.props.data.commentData.comment.comment_text}</p>
              </Col>
            </Row>
            <Row className="date">{this.props.data.commentData.comment.time_posted}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}