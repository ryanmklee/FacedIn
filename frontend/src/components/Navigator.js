import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import {setLogout} from "../actions/login";
import store from "../store/index";
import RequestsButton from './request/RequestsButton';
import {Link, NavLink} from "react-router-dom";
import {EDIT_NAME, SEARCH_BAR_INPUT} from "../constants/actionTypes";
import Row from "react-bootstrap/Row";

export default class Navigator extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
  }
    // handleSearchInputChange(e) {
    //     this.setState({searchText: e.target.value});
    // }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>FacedIn</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link>
                <Link to="/home" style={{ color: 'white' }}>Home</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/group-page" style={{ color: 'white' }}>Groups</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to={{pathname: "/profile", state:{userId: store.getState().login.user_id}}} style={{ color: 'white' }}>My Profile</Link>
            </Nav.Link>
          <RequestsButton/>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.value} onChange={this.handleChange}/>
            <Button variant="light">
                <Link to={{pathname:"/search-result", state:{searchText: this.state.value}}}>Search</Link>
            </Button>
        </Form>
        <Nav>
          <Nav.Link href="/" onClick={()=> {
              store.dispatch(setLogout())
          }} className="ml-3">Logout</Nav.Link>
        </Nav>
      </Navbar>
    );
  } 
}