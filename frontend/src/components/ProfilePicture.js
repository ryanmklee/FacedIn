import React, { Component } from "react";
import Image from 'react-bootstrap/Image';

// Component used to display profile picture of a given user. Must pass userId as a prop.
// ex) <ProfillePicture userId={32}>
export default class ProfilePicture extends Component {
  getURL() {
    const baseURL = "https:\/\/randomuser.me\/api\/portraits\/men\/";
    const appendix = ".jpg";
    return baseURL + this.props.userId + appendix;
  }
  
  render() {
    return (
      <Image roundedCircle thumbnail className="post-image" src={this.getURL()}></Image>
    );
  }
}