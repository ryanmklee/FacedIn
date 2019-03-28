import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {setLogout, tryLogin} from "../actions/login";
import HomeNavigation from "./HomeNavigation";
import {Link} from "react-router-dom";
import {getUserInfo, setUserInfo} from "../actions/userProfile";
import {getUserPosts} from "../actions/home";
import ListGroup from "react-bootstrap/ListGroup";
import Post from "./post/Post";
import Container from "react-bootstrap/Container";

/**
 * displays the posts and top navigation.
 */
const tempUserId = 1;
class Home extends React.Component {

    componentWillMount() {
        this.props.getUserPosts(tempUserId)//this.props.userId)
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <HomeNavigation/>
                <Link to={"/"}>
                    <button type="button" onClick={this.props.logout}>Logout</button>
                </Link>
                <ListGroup className="mb-3">
                    {
                        this.props.posts.map((postObj) =>
                            <ListGroup.Item>
                                <h2>{postObj.post.post}</h2>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        userId: state.login.user_id,
        posts: state.home.posts
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(setLogout())
    },
    getUserPosts: (userId) => {
        dispatch(getUserPosts(userId))
    }
    // setUserInfo: (age, name, occupation, sex, userId, locationName, address, postalCode, city, province) => {
    //     dispatch(setUserInfo(age, name, occupation, sex, userId, locationName, address, postalCode, city, province))
    // }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)