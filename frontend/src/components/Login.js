import React from "react";
import {connect} from "react-redux"
import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";
import store from "../store/index"
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.loginButtonClick = this.loginButtonClick.bind(this)
    }

    loginButtonClick = (username, password) => {
        const temp = store.getState();
        console.log("Attempting to login.");
        console.log("Store: " + temp.login.user_id)
        store.dispatch(tryLogin(username, password)).then(() => {
            console.log("Hey")
            const tem2p = store.getState().login.user_id
            console.log("Store2: "+tem2p.toString())


        })
        console.log("UserID: " + this.props.user_id)
    };

    render() {
        if (store.getState().login.user_id !== -1) {
            return <Redirect push to="/home"/>
        }
    return (
        <form onSubmit={()=>{
            const username = document.getElementById(USERNAME_INPUT).value;
            const password = document.getElementById(PASSWORD_INPUT).value;
            this.loginButtonClick(username, password)
        }}>
          <h3>Sign in</h3>
          <input id = {USERNAME_INPUT} type="text" ref="username" placeholder={store.getState().login.user_id} />
          <input id = {PASSWORD_INPUT} type="password" ref="password" placeholder="enter password" />
          <input type="submit" value="Login" />
            <Link to={"/create-user"}>
                <button type="button">Create New User</button>
            </Link>
        </form>
    );
  }
}

function mapStateToProps(state){
              return {
                  user_id: state.user_id,
                  isLoading: state.loading
              }
}
export default connect(mapStateToProps)(Login)

