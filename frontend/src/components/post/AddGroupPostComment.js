import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import store from '../../store/index'

import {postCommentOnGroupPost} from "../../actions/individualGroupPage";
export default class AddGroupPostComment extends Component {
  constructor(props) {
    super(props);
    this.commentText = React.createRef();
  }

  addComment() {
      const comment = this.commentText.current.value;
      store.dispatch(postCommentOnGroupPost(this.props.post.group_id, this.props.post.gpost_id, this.props.post.user_id, comment));
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