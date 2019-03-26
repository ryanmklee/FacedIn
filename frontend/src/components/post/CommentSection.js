import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import AddComment from './AddComment';
import Comment from './Comment';

export default class CommentSection extends Component {
  render () {
    return (
      <Container>
        <ListGroup className="mb-3">
          {
            this.props.comments.map((comment) =>
              <ListGroup.Item>
                <Comment comment={comment}/>
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <AddComment postId={this.props.postId}/>
      </Container>
    )
  }
}