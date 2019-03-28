import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {setLogout, tryLogin} from "../actions/login";
import {Link} from "react-router-dom";

import Navigator from './Navigator';
import Posts from './Posts';

import posts from '../mockData/mockPosts';

console.log(posts);

/**
 * displays the posts and top navigation.
 */
class Home extends React.Component {
    render() {
        return (
            <div>
                <Navigator/>
                <Posts posts={posts}/>
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