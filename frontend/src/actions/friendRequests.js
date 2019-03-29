import {
    SET_ACCEPT_FRIEND_REQUEST_ERROR,
    SET_ACCEPT_FRIEND_REQUEST_SUCCESS, SET_DECLINE_FRIEND_REQUEST_ERROR, SET_DECLINE_FRIEND_REQUEST_SUCCESS,
    SET_VIEW_FRIEND_REQUESTS_ERROR,
    SET_VIEW_FRIEND_REQUESTS_SUCCESS
} from "../constants/actionTypes";
import {axiosDeleteRequestHelper, axiosGetRequestHelper, axiosPostRequestHelper} from "./webcallUtil";
import {setAcceptGroupRequestErrpr, setAcceptGroupRequestSuccess} from "./general";
import axios from "axios";

export function setViewFriendRequestsSuccess (response) {
    return {
        type: SET_VIEW_FRIEND_REQUESTS_SUCCESS,
        payload: response
    }
}

export function setViewFriendRequestsError () {
    return {
        type: SET_VIEW_FRIEND_REQUESTS_ERROR
    }
}

export function setAcceptFRSuccess () {
    return {
        type: SET_ACCEPT_FRIEND_REQUEST_SUCCESS
    }
}

export function setAcceptFRError () {
    return {
        type: SET_ACCEPT_FRIEND_REQUEST_ERROR
    }
}

export function setDeclineFRSuccess () {
    return {
        type: SET_DECLINE_FRIEND_REQUEST_SUCCESS
    }
}

export function setDeclineFRError () {
    return {
        type: SET_DECLINE_FRIEND_REQUEST_ERROR
    }
}


export function getFriendRequests(userId) {
    return function (dispatch) {
        let params = {
            params: {user_id: userId
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/view_friend_requests", params, setViewFriendRequestsSuccess, setViewFriendRequestsError)
    }
}

export function acceptFriendRequest(friendId, userId) {
    return function (dispatch) {
        let config = {
                user_id: userId,
                friend_id: friendId
        };
        let url = "http://127.0.0.1:5000/api/user/friend_request";
        return axios.post(url, config)
            .then(response => {
                console.log("Post " + url + " Response:");
                console.log(response);
                dispatch(setAcceptFRSuccess(response))
            })
            .catch(error => {
                console.log("Post " + url + " Error:");
                console.log(error);
                dispatch(setAcceptFRError())
            })
    }
}

export function declineFriendRequest(userId, friendId) {
    return function (dispatch) {
        let config = {
                user_id: userId,
                friend_id: friendId
        };
        let url = "http://127.0.0.1:5000/api/user/friend_request";
        return axios.delete(url, config)
            .then(response => {
                console.log("Delete " + url + " Response:");
                console.log(response);
                dispatch(setDeclineFRSuccess())
            })
            .catch(error => {
                console.log("Delete " + url + " Error:");
                console.log(error);
                dispatch(setDeclineFRError())
            })
    }
}
