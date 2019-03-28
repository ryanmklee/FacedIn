import {SET_GET_USER_POSTS_ERROR, SET_GET_USER_POSTS_SUCCESS} from "../constants/actionTypes";
import {axiosGetRequestHelper} from "./webcallUtil";
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