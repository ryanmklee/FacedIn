import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {setLogout, tryLogin} from "../actions/login";
import HomeNavigation from "./HomeNavigation";
import {Link} from "react-router-dom";

/**
 * displays the posts and top navigation.
 */
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.logoutOnClick = this.logoutOnClick.bind(this);
    }

    logoutOnClick() {
        store.dispatch(setLogout())
    }
    render() {
        return (
            <div>
                <h3>Home</h3>
                <HomeNavigation/>
                <Link to={"/"}>
                    <button type="button" onClick={this.logoutOnClick}>Logout</button>
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
export default connect(mapStateToProps)(Home)