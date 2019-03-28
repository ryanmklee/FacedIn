import {
    REGULAR_POST_ERROR,
    REGULAR_POST_SUCCESS,
    SET_GET_USER_POSTS_ERROR,
    SET_GET_USER_POSTS_SUCCESS
} from "../constants/actionTypes";
import {axiosGetRequestHelper, axiosPostRequestHelper} from "./webcallUtil";
import {setGetUserInfoError, setGetUserInfoSuccess} from "./userProfile";

export function setGetUserPostsSuccess (response) {
    return {
        type: SET_GET_USER_POSTS_SUCCESS,
        payload: response
    }
}

export function setGetUserPostsError () {
    return {
        type: SET_GET_USER_POSTS_ERROR
    }
}

export function setRegularPostSuccess () {
    return {
        type: REGULAR_POST_SUCCESS
    }
}
export function setRegularPostsError () {
    return {
        type: REGULAR_POST_ERROR
    }
}

export function getUserPosts(userId) {
    return function (dispatch) {
        let config = {
            params: {
                user_id: userId,
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/view_posts", config, setGetUserPostsSuccess, setGetUserPostsError);
    }
}

export function postRegularPost(userId, postText) {
    return function (dispatch) {
        let config = {
            params: {
                user_id: userId,
                post: postText
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/post", config, setRegularPostSuccess, setRegularPostsError);
    }
}