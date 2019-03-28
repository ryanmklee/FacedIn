import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

import AddGroupPostComment from './AddGroupPostComment';
import Comment from './Comment';

export default class CommentSection extends Component {

    constructor(props) {
        super(props)
        // console.log(this.props)
    }
  render () {
    return (
      <Container>
        <ListGroup className="mb-3">
          {
            this.props.post[1].comments.map((comment) =>
              <ListGroup.Item>
                <Comment data={{
                    commentData: {
                        post: this.props.post[0],
                        comment: comment
                    }
                }
                }/>
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <AddGroupPostComment post={this.props.post[0]}/>
      </Container>
    )
  }
}