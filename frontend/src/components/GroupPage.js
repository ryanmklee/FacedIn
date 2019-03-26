import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";
class GroupPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <h3>Group Page</h3>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(GroupPage)