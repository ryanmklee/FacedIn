import React from "react";
import {connect} from "react-redux"
import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";
import {Link, Redirect} from 'react-router-dom'
class Login extends React.Component {

    render() {
        console.log(this.props.user_id)
        // if (this.props.user_id !== -1) {
        //     return <Redirect push to={"/home"}/>
        // }
        return (
            <div>
                <h3>Sign in</h3>
                <input id={USERNAME_INPUT} type="text" ref="username" placeholder="Email"/>
                <input id={PASSWORD_INPUT} type="password" ref="password" placeholder="Password"/>
                <button type="button" onClick={() => {
                    const username = document.getElementById(USERNAME_INPUT).value;
                    const password = document.getElementById(PASSWORD_INPUT).value;
                    this.props.loginButtonClick(username, password)
                }}>Login
                </button>
                <Link to={"/create-user"}>
                    <button type="button">{this.props.user_id}</button>
                </Link>
            </div>
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

