import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Component for displaying a group on a list of groups from GroupPage
export default class Group extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={3}>
            <h6>{this.props.group.group_name}</h6>
          </Col>
          <Col>
            <label className="mr-2" style={{color: 'gray'}}>Activity:</label>
            {this.props.group.activity}
          </Col>
          <Col className="ml-auto" md="auto">
            <Button onClick={() => {}}>View</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}