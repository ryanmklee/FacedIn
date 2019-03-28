import React from "react";
import {connect} from "react-redux"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {getUserInfo, setUserInfo} from "../actions/userProfile";
import ProfilePicture from './ProfilePicture';
import {
    EDIT_ADDRESS,
    EDIT_AGE,
    EDIT_CITY,
    EDIT_NAME,
    EDIT_OCCUPATION,
    EDIT_POSTAL, EDIT_PROVINCE,
    EDIT_SEX
} from "../constants/actionTypes";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { edit: false };
    }

    componentWillMount() {
        this.props.getUserInfo(this.props.userId)
    }
    componentDidMount() {

    }

    render() {
        const { edit } = this.state;

        return (
            <Container className="mt-3 mb-3 group" style={{width: '50%'}}>
                <Jumbotron className="groupTitle">
                    <ProfilePicture userId={this.props.userId}/>
                    <h2>{this.props.user.name}</h2>
                    <Button>Add Friend</Button>
                </Jumbotron>
                <Row className="mb-3">
                    {!edit && <Button onClick={() => this.setState({ edit: !edit })} className="ml-auto">Edit Profile</Button>}
                    {edit && <Button className="ml-auto mr-1" onClick={() => {
                        let name = document.getElementById(EDIT_NAME).value;
                        let age = document.getElementById(EDIT_AGE).value;
                        let sex = document.getElementById(EDIT_SEX).value;
                        let occupation = document.getElementById(EDIT_OCCUPATION).value;
                        let address = document.getElementById(EDIT_ADDRESS).value;
                        let postal = document.getElementById(EDIT_POSTAL).value;
                        let city = document.getElementById(EDIT_CITY).value;
                        let province = document.getElementById(EDIT_PROVINCE).value;
                        this.props.setUserInfo(name, age, sex, this.props.userId, occupation, address, postal, city, province)
                    }}>Save Changes</Button>}
                    {edit && <Button variant="secondary" onClick={() => this.setState({ edit: !edit })}>Cancel</Button>}
                </Row>
                <Form>
                    <Form.Group controlId={EDIT_NAME} as={Row}>
                        <Form.Label column>
                            <h6>Name</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} defaultValue={this.props.user.name} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_AGE} as={Row}>
                        <Form.Label column>
                            <h6>Age</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.age} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_SEX} as={Row}>
                        <Form.Label column>
                            <h6>Sex</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.sex} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_OCCUPATION} as={Row}>
                        <Form.Label column>
                            <h6>Occupation</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.occupation} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_ADDRESS} as={Row}>
                        <Form.Label column>
                            <h6>Address</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.address} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_POSTAL} as={Row}>
                        <Form.Label column>
                            <h6>Postal Code</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.postal_code} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_CITY} as={Row}>
                        <Form.Label column>
                            <h6>City</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.city} style={{textAlign: 'right'}}/>
                        </Col>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId={EDIT_PROVINCE} as={Row}>
                        <Form.Label column>
                            <h6>Province</h6>
                        </Form.Label>
                        <Col className="ml-auto">
                            <Form.Control plaintext readOnly={!edit} value={this.props.user.province} style={{textAlign: 'right'}}/>
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
        user: state.userProfile.userData,
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