import React from "react";
import {connect} from "react-redux"
import {REGULAR_POST_INPUT, REGULAR_POST_TYPE} from "../constants/actionTypes";
import {getUserPosts, postRegularPost} from "../actions/home";

import Navigator from './Navigator';
import Posts from './Posts';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

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
                <h4 className="mt-3 mb-3">Posts</h4>
                <InputGroup>
                    <FormControl id={REGULAR_POST_INPUT} placeholder="Say what you wanna say"/>
                    <InputGroup.Append>
                        <Button onClick={() => {
                            this.props.makePost(this.props.userId)
                        }}>Post</Button>
                    </InputGroup.Append>
                </InputGroup>
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
    },
    makePost: (userId) => {
        let postText = document.getElementById(REGULAR_POST_INPUT).value;
        dispatch(postRegularPost(userId, postText))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)