import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import store from '../../store/index'

import Comment from './Comment';
import {postCommentOnPost} from "../../actions/general";
const tempGroupId = 4;
const tempUserId = 8;
export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.commentText = React.createRef();
    console.log(this.props)


  }

  addComment() {
      const comment = this.commentText.current.value;
      store.dispatch(postCommentOnPost(tempUserId, tempUserId, comment));
  }

  render () {
    return (
      <InputGroup>
        <FormControl
          placeholder="Add comment" type="text" ref={this.commentText}
        />
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={() => {
              this.addComment()
          }}>Submit</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
}