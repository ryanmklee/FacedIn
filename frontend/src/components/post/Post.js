import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import CommentSection from './CommentSection';
import formatDateString from '../../utils/date';

import './Post.css';

export default class Post extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let temp = this.props;
    // this.date = formatDateString(this.props.time_posted);
  }
 
  render() {
    return (
      <Container>
        <Row className="mt-2 flex-nowrap">
          <Col md="auto" className="no-padding">
            <Image roundedCircle thumbnail className="post-image" src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"></Image>
          </Col>
          <Col>
            <Row className="name"><h6>{this.props.post.name}</h6></Row>
            <Row className="date">{this.props.post.time_posted}</Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <p>{this.props.post.group_post}</p>
        </Row>
        <hr/>
        {/*<CommentSection comments={this.props.comments} postId={this.props.post.post_id}/>*/}
      </Container>
    );
  }
}
