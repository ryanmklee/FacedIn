import axios from "axios";
import {setIGroupRetrievePostsError, setIGroupRetrievePostsSuccess} from "./individualGroupPage";
import {
    SET_ACCEPT_GROUP_REQ_ERROR,
    SET_ACCEPT_GROUP_REQ_SUCCESS,
    SET_CREATE_USER_ERROR,
    SET_POST_COMMENT_ERROR,
    SET_POST_COMMENT_SUCCESS, SET_SEND_GROUP_REQ_ERROR,
    SET_SEND_GROUP_REQ_SUCCESS
} from "../constants/actionTypes";
import {axiosPostRequestHelper} from "./webcallUtil";

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
        let config = {
            params: {
                post_id: postId,
                user_id: userId
            }
        };
        return axiosPostRequestHelper(dispatch,"http://127.0.0.1:5000/api/user/comment", config, setPostCommentSuccess, setPostCommentError)
    }
}

export function setSendGroupRequestSuccess () {
    return {
        type: SET_SEND_GROUP_REQ_SUCCESS
    }
}

export function setSendGroupRequestError () {
    return {
        type: SET_SEND_GROUP_REQ_ERROR
    }
}

export function sendGroupRequest(userId, friendId, groupId) {
    return function (dispatch) {
        let config = {
            params: {
                user_id: userId,
                friend_id: friendId,
                group_id: groupId
            }
        };
        return axiosPostRequestHelper(dispatch,"http://127.0.0.1:5000/api/groups/send_request", config, setSendGroupRequestSuccess, setSendGroupRequestError)
    }
}

export function setAcceptGroupRequestSuccess () {
    return {
        type: SET_ACCEPT_GROUP_REQ_SUCCESS
    }
}

export function setAcceptGroupRequestErrpr () {
    return {
        type: SET_ACCEPT_GROUP_REQ_ERROR
    }
}

export function acceptGroupRequest(friendId, groupId) {
    return function (dispatch) {
        let config = {
            params: {
                friend_id: friendId,
                group_id: groupId
            }
        };
        return axiosPostRequestHelper(dispatch,"http://127.0.0.1:5000/api/user/group_request", config, setAcceptGroupRequestSuccess, setAcceptGroupRequestErrpr)
    }
}

