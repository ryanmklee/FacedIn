import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Comment from './Comment';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <InputGroup>
        <FormControl
          placeholder="Add comment"
        />
        <InputGroup.Append>
          <Button variant="outline-primary">Submit</Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
}