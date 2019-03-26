import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";
class Profile extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <h3>Profile</h3>
        );
    }
}

function mapStateToProps(Profile){
    return {

    }
}
export default connect(mapStateToProps)(Profile)