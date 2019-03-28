import React, { Component } from "react";

import ListGroup from 'react-bootstrap/ListGroup';

import Post from './post/Post';

export default class Posts extends Component {
  render() {
    return (
      <ListGroup className="mb-3">
          {
            this.props.posts.map((postObj) =>
              <ListGroup.Item>
                <Post post={postObj} comments={postObj.comments}/>
              </ListGroup.Item>
            )
          }
      </ListGroup>
    )
  }
}