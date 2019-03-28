import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CommentSection from './CommentSection';
import ProfilePicture from '../ProfilePicture';

import './Post.css';
import {REGULAR_POST_TYPE} from "../../constants/actionTypes";

export default class Post extends Component {
  render() {
      let postText;
      let post;
      if (this.props.type === REGULAR_POST_TYPE) {
          post = this.props.post;
          postText = this.props.post.post.post;
      } else {
          post = {
              post: this.props.post[0],
              comments: this.props.post[1].comments
          };
          postText = post.post.group_post;
      }
      return (
      <Container>
        <Row className="mt-2 flex-nowrap">
          <Col md="auto" className="no-padding">
            <ProfilePicture userId={post.post.user_id}/>
          </Col>
          <Col>
            <Row className="name"><h6>{post.post.name}</h6></Row>
            <Row className="date">{post.post.time_posted}</Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <p>{postText}</p>
        </Row>
        <hr/>
        <CommentSection post={post} type={this.props.type}/>
      </Container>
    );
  }
}
