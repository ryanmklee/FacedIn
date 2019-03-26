import React from "react";
import {connect} from "react-redux"
import {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/login";
import store from "../store/index"
import axios from 'axios'
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        console.log("constructor")
        axios.get('http://127.0.0.1:5000/api/login?email=hello&password=world')
            .then(response => {
                console.log("constructor2" +response.data)
            })
    }

    handleClick = (username, password) => {
        const temp = store.getState();
        console.log("Attempting to login.");
        console.log("Store: " + temp.login.user_id)
        store.dispatch(tryLogin(username, password)).then(() => {
            console.log("Hey")
            const tem2p = store.getState().login.user_id
            console.log(tem2p)
        })
        console.log("UserID: " + this.props.user_id)
    };

    render() {
    return (
        <form onSubmit={()=>{
            const username = document.getElementById(USERNAME_INPUT).value;
            const password = document.getElementById(PASSWORD_INPUT).value;
            this.handleClick(username, password)
        }}>
          <h3>Sign in</h3>
          <input id = {USERNAME_INPUT} type="text" ref="username" placeholder={store.getState().login.user_id} />
          <input id = {PASSWORD_INPUT} type="password" ref="password" placeholder="enter password" />
          <input type="submit" value="Login" />
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

