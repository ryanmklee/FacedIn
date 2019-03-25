import React from "react";
import {connect} from "react-redux"
import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";
import store from "../store/index"
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (username, password) => {
        console.log("Attempting to login.");
        store.dispatch(tryLogin(username, password))
    };

    render() {
    return (
        <form onSubmit={()=>{
            const username = document.getElementById(USERNAME_INPUT).value;
            const password = document.getElementById(PASSWORD_INPUT).value;
            this.handleClick(username, password)
        }}>
          <h3>Sign in</h3>
          <input id = {USERNAME_INPUT} type="text" ref="username" placeholder="enter you username" />
          <input id = {PASSWORD_INPUT} type="password" ref="password" placeholder="enter password" />
          <input type="submit" value="Login" />
        </form>
    );
  }
}

function mapStateToProps(state){
              return {
                  isLoading: state.loading
              }
}
export default connect(mapStateToProps)(Login)

