import React from "react";
import {connect} from "react-redux"
import {LOGIN_ACTION, PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import {tryLogin} from "../actions/actions";
class Login extends React.Component {

    render() {
    return (
        <form onSubmit={()=>{
            const temp = document.getElementById(USERNAME_INPUT).value;
            const temp2 = document.getElementById(PASSWORD_INPUT).value;
            tryLogin(temp, temp2);
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
                  username: state.username,
                  password: state.password
              }
}
function mapDispatchToProps (dispatch) {
    return {
        changeUsername: (text) => dispatch({type:'CHANGE_USERNAME', text}),
        changePassword: (text) => dispatch({type:'CHANGE_PASSWORD', text}),
        tryLogin: () => {
            dispatch({type:LOGIN_ACTION})
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)

