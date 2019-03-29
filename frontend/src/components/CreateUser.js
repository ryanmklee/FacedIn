import React from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {PASSWORD_CREATE_INPUT, USERNAME_CREATE_INPUT} from "../constants/actionTypes";
import {createUser, resetCreateScreen} from "../actions/createuser";


class CreateUser extends React.Component {

    submit(event) {
        event.preventDefault();
        const username = document.getElementById(USERNAME_CREATE_INPUT).value;
        const password = document.getElementById(PASSWORD_CREATE_INPUT).value;
        this.props.submitUserClick(username, password)
    }

    render() {
        if (this.props.createdUser) {
            this.props.resetScreen()
            return <Redirect push to={"/"}/>
        }
        return (
            <Container style={{width: "50%"}} className="mt-3">
                <h5 style={{textAlign: "center"}} className="mt-3">Create an account</h5>
                <Form className="mb-3" onSubmit={this.submit.bind(this)}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id={USERNAME_CREATE_INPUT} type="email" placeholder="Enter email" />
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control id={PASSWORD_CREATE_INPUT} type="password" placeholder="Password" />
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    createdUser: state.createuser.createdUser
});

const mapDispatchToProps = (dispatch) => ({
    submitUserClick: (username, password) => {
        dispatch(createUser(username, password))
    },
    resetScreen: () => {
        resetCreateScreen()
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)