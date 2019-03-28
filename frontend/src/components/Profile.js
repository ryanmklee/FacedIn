import React from "react";
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";
import {getUserInfo, setUserInfo} from "../actions/userProfile";
import ProfilePicture from './ProfilePicture';
// TODO: replace mock data
import user from '../mockData/mockUser';

const tempUserId = 1;

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { edit: false };
    }

    componentWillMount() {
        this.props.getUserInfo(tempUserId)
        // this.props.setUserInfo()
    }
    render() {
        const { edit } = this.state;

        return (
            <Container className="mt-3 mb-3 group" style={{width: '50%'}}>
                <Jumbotron className="groupTitle">
                    <ProfilePicture userId={user.user_id}/>
                    <h2>{user.name}</h2>
                    <Button>Add Friend</Button>
                </Jumbotron>
                <Row className="mb-3">
                    {!edit && <Button onClick={() => this.setState({ edit: !edit })} className="ml-auto">Edit Profile</Button>}
                    {edit && <Button className="ml-auto mr-1">Save Changes</Button>}
                    {edit && <Button variant="secondary" onClick={() => this.setState({ edit: !edit })}>Cancel</Button>}
                </Row>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Name</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.name} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Age</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.age} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Sex</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.sex} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Occupation</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.occupation} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Address</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.address} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Postal Code</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.postal_code} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>City</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.city} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row}>
                        <Form.Label column>
                            <h6>Province</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={user.province} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                </Form>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        userInfo: state.userProfile.userData,
        userId: state.login.user_id
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserInfo: (userId) => {
        dispatch(getUserInfo(userId))
    },
    setUserInfo: (age, name, occupation, sex, userId, locationName, address, postalCode, city, province) => {
        dispatch(setUserInfo(age, name, occupation, sex, userId, locationName, address, postalCode, city, province))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)