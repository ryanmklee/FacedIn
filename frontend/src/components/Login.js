import React, { Component } from "react";
import {connect} from "react-redux"
import {Link, Redirect} from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";

class Login extends Component {
    submit(event) {
        event.preventDefault();
        const username = document.getElementById(USERNAME_INPUT).value;
        const password = document.getElementById(PASSWORD_INPUT).value;
        this.props.loginButtonClick(username, password);
    }

    render() {
        if (this.props.user_id !== -1) {
            return <Redirect push to={"/home"}/>
        }
        return (
            <Container style={{width: "50%"}} className="mt-3">
                <h1 style={{textAlign: "center"}}>FacedIn</h1>
                <h5 className="mt-3">Sign in</h5>
                <Form className="mb-3" onSubmit={this.submit.bind(this)}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id={USERNAME_INPUT} type="email" placeholder="Enter email" />
                    <Form.Label className="mt-3">Password</Form.Label>
                    <Form.Control id={PASSWORD_INPUT} type="password" placeholder="Password" />
                    <Button variant="primary" type="submit" className="mt-3">Login</Button>
                </Form>
                <hr/>
                <Row>
                    <Col md="auto" style={{paddingRight: "0.3em"}}>If you are not a member yet, </Col>
                    <Col style={{paddingLeft: 0}}>
                        <Link to={"/create-user"} className="mt-3">
                            create an account.
                        </Link>
                    </Col>
                </Row>
                
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user_id: state.login.user_id,
});

const mapDispatchToProps = (dispatch) => ({
    loginButtonClick: (username, password) => {
        dispatch(tryLogin(username, password))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login)

