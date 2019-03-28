import React from "react";
import {connect} from "react-redux"
import {REGULAR_POST_TYPE} from "../constants/actionTypes";
import {setLogout} from "../actions/login";
import {getUserPosts} from "../actions/home";

import Navigator from './Navigator';
import Posts from './Posts';

/**
 * displays the posts and top navigation.
 */
const tempUserId = 1;
class Home extends React.Component {

    componentWillMount() {
        this.props.getUserPosts(this.props.userId)
    }

    render() {
        return (
            <div>
                <Navigator/>
                <Posts posts={this.props.posts} type={REGULAR_POST_TYPE}/>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        userId: state.login.user_id,
        posts: state.home.posts,
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