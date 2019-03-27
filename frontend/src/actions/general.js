import axios from "axios";
import {setIGroupRetrievePostsError, setIGroupRetrievePostsSuccess} from "./individualGroupPage";
import {SET_CREATE_USER_ERROR, SET_POST_COMMENT_ERROR, SET_POST_COMMENT_SUCCESS} from "../constants/actionTypes";

/**
  * these actions are used in several places.
 */

export function setPostCommentSuccess() {
    return {
        type: SET_POST_COMMENT_SUCCESS
    }
}

export function setPostCommentError() {
    return {
        type: SET_POST_COMMENT_ERROR
    }
}

export function postCommentOnPost(postId, userId) {
    return function (dispatch) {
        return axios.post("http://127.0.0.1:5000/api/user/comment", null, {
            params: {
                post_id: postId,
                user_id: userId
            }
        })
            .then(response => {
                dispatch(setPostCommentSuccess(response))
            })
            .catch(error => {
                dispatch(setPostCommentError())
            })
    }
}