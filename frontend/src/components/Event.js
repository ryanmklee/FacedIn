import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class Event extends Component {
  getDateString() {
    return monthNames[this.props.event.date.getMonth()] + " " + this.props.event.date.getDate();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={2}>
            {this.getDateString()}
          </Col>
          <Col>
            <Row>
              <h6>{this.props.event.name}</h6>
            </Row>
            <Row>
              Location: {this.props.event.location}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}