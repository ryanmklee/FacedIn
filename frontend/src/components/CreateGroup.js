import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";

import Navigator from './Navigator';
import {createGroup} from "../actions/general";

export default class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    submit(event) {
        event.preventDefault();
        const groupName = document.getElementById('groupName').value;
        const groupActivity = document.getElementById('groupActivity').value;
        store.dispatch(createGroup(store.getState().login.user_id, groupActivity, groupName))
    }

    render() {
        return (
            <div>
                <Navigator/>
                <Container style={{width: "50%"}} className="mt-3">
                    <h5 style={{textAlign: 'center'}}>Create a Group</h5>
                    <hr/>
                    <Form className="mt-3 mb-3" onSubmit={this.submit.bind(this)}>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control id="groupName" type="text" placeholder="Enter group name" />
                        <Form.Label className="mt-3">Activity</Form.Label>
                        <Form.Control id="groupActivity" type="text" placeholder="What does your group do?" />
                        <Button variant="primary" type="submit" className="mt-4">Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}