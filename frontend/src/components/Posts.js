import React, { Component } from "react";

import ListGroup from 'react-bootstrap/ListGroup';

import Post from './post/Post';
import {REGULAR_POST_TYPE} from "../constants/actionTypes";

export default class Posts extends Component {
  render() {
    return (
        <div>
          <ListGroup className="mb-3">
            {
              this.props.posts.map((postObj) =>
                  <ListGroup.Item>
                    <Post post={postObj} type={REGULAR_POST_TYPE}/>
                  </ListGroup.Item>
              )
            }
          </ListGroup>
        </div>

    )
  }
}