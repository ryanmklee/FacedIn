import React from "react";
import {connect} from "react-redux"
import {REGULAR_POST_TYPE} from "../constants/actionTypes";
import {getUserPosts} from "../actions/home";

import Navigator from './Navigator';
import Posts from './Posts';

/**
 * displays the posts and top navigation.
 */
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
    getUserPosts: (userId) => {
        dispatch(getUserPosts(userId))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)