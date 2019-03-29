import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CommentSection from './CommentSection';
import ProfilePicture from '../ProfilePicture';
import store from '../../store/index'

import './Post.css';
import {REGULAR_POST_TYPE} from "../../constants/actionTypes";
import Button from "react-bootstrap/es/Button";
import {deletePost} from "../../actions/general";

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
      let userId = store.getState().login.user_id;
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
            {this.props.type === REGULAR_POST_TYPE && post.post.user_id === userId &&
            <Button onClick={() => {
                store.dispatch(deletePost(post.post.user_id, post.post.post_id))
            }}>Delete</Button>}
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
