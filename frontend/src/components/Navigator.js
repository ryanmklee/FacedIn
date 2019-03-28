import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import {setLogout} from "../actions/login";
import store from "../store/index";
import RequestsButton from './request/RequestsButton';

export default class Navigator extends Component {
  logoutOnClick() {
    store.dispatch(setLogout())
  }
  
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>FacedIn</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/group-page">Groups</Nav.Link>
          <Nav.Link href="/profile">My Profile</Nav.Link>
          <RequestsButton/>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
          <Button href="/search-result" variant="outline-light">Search</Button>
        </Form>
        <Nav>
          <Nav.Link href="/" onClick={this.logoutOnClick.bind(this)} className="ml-3">Logout</Nav.Link>
        </Nav>
      </Navbar>
    );
  } 
}