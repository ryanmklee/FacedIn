import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CommentSection from './CommentSection';

import './GroupPost.css';

export default class GroupPost extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
  }
 
  render() {
    return (
      <Container>
        <Row className="mt-2 flex-nowrap">
          <Col md="auto" className="no-padding">
            <Image roundedCircle thumbnail className="post-image" src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"></Image>
          </Col>
          <Col>
            <Row className="name"><h6>{this.props.post[0].name}</h6></Row>
            <Row className="date">{this.props.post[0].time_posted}</Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <p>{this.props.post.group_post}</p>
        </Row>
        <hr/>
        <CommentSection post={this.props.post}/>
      </Container>
    );
  }
}
