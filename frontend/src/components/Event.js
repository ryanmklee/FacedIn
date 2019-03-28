import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import formatDateString from '../utils/date';
import connect from "react-redux/es/connect/connect";
import Button from "react-bootstrap/es/Button";

class Event extends Component {
  constructor(props) {
    super(props);
    // this.date = formatDateString(this.props.event.time);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={2} className="date">
            {this.date}
          </Col>
          <Col>
            <Row>
              <h6>{this.props.event.event_name}</h6>
            </Row>
            <Row>
              Location: {this.props.event.location_name + " at " +
            this.props.event.address + " " + this.props.event.city + ", " + this.props.event.province}
            </Row>
          </Col>
          <Button>Attend</Button>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return {
  }
}
export default connect(mapStateToProps)(Event)