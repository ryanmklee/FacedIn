import React from "react";
import {connect} from "react-redux"
import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";
import store from "../store/index"
import {Link, Redirect} from 'react-router-dom'
class Login extends React.Component {


    constructor(props) {
        super(props);
        this.loginButtonClick = this.loginButtonClick.bind(this);
    }

    loginButtonClick = (username, password) => {
        store.dispatch(tryLogin(username, password)).then(() => {
            this.render()
        });
    };

    render() {
        if (this.props.user_id !== -1) {
            return <Redirect push to="/home"/>
        }
    return (
        <div>
          <h3>Sign in</h3>
          <input id = {USERNAME_INPUT} type="text" ref="username" placeholder="Email" />
          <input id = {PASSWORD_INPUT} type="password" ref="password" placeholder="Password" />
            <button type="button" onClick={()=> {
                const username = document.getElementById(USERNAME_INPUT).value;
                const password = document.getElementById(PASSWORD_INPUT).value;
                this.loginButtonClick(username, password)
            }}>Login</button>
            <Link to={"/create-user"}>
                <button type="button">Create New User</button>
            </Link>
        </div>
    );
  }
}

function mapStateToProps(state){
              return {
                  user_id: state.user_id,
              }
}
export default connect(mapStateToProps)(Login)

