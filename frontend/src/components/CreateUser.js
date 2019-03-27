import React from "react";
import {connect} from "react-redux"
import {PASSWORD_CREATE_INPUT, USERNAME_CREATE_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import {createUser} from "../actions/createuser";
import {Redirect} from "react-router-dom";

class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.submitUserClick = this.submitUserClick.bind(this);
    }

    submitUserClick = (username, password) => {
        store.dispatch(createUser(username, password)).then(() => {
            if (store.getState().createuser.createdUser) {
                this.props.history.push('/')
            }
        });
    };


    render() {
        return (
            <div>
                <h3>Create User</h3>
                <input id = {USERNAME_CREATE_INPUT} type="text" ref="username" placeholder="Email" />
                <input id = {PASSWORD_CREATE_INPUT} type="password" ref="password" placeholder="Password" />
                <button type="button" onClick={()=> {
                    const username = document.getElementById(USERNAME_CREATE_INPUT).value;
                    const password = document.getElementById(PASSWORD_CREATE_INPUT).value;
                    this.submitUserClick(username, password)
                }}>Submit</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        createdUser: state.login.createdUser
    }
}
export default connect(mapStateToProps)(CreateUser)