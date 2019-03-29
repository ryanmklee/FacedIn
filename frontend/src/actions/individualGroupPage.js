import axios from 'axios'
import {
    GROUP_MEMBERS_SUCCESS, JOIN_GROUP_NO_MATTER,
    SET_COMMENT_GROUP_POST_ERROR,
    SET_COMMENT_GROUP_POST_SUCCESS,
    SET_GET_MONTHLY_EVENTS_ERROR,
    SET_GET_MONTHLY_EVENTS_SUCCESS,
    SET_RETRIEVE_POSTS_IGROUP_SUCCESS
} from "../constants/actionTypes";
import {SET_RETRIEVE_POSTS_IGROUP_ERROR} from "../constants/actionTypes";
import {SET_RETRIEVE_EVENTS_IGROUP_ERROR} from "../constants/actionTypes";
import {SET_RETRIEVE_EVENTS_IGROUP_SUCCESS} from "../constants/actionTypes";
import {SET_POST_GROUP_SUCCESS} from "../constants/actionTypes";
import {SET_POST_GROUOP_ERROR} from "../constants/actionTypes";
import {SET_RETRIEVE_GROUP_INFO_SUCCESS} from "../constants/actionTypes";
import {SET_RETRIEVE_GROUP_INFO_ERROR} from "../constants/actionTypes";
import {SET_CREATE_EVENT_SUCCESS} from "../constants/actionTypes";
import {SET_CREATE_EVENT_ERROR} from "../constants/actionTypes";
import {axiosGetRequestHelper, axiosPostRequestHelper} from "./webcallUtil";
import {setPostCommentError, setPostCommentSuccess, tooLazyToMakeAnActualActionReducer} from "./general";


export function setIGroupRetrievePostsSuccess(response) {
    return {
        type: SET_RETRIEVE_POSTS_IGROUP_SUCCESS,
        payload: response
    }
}

export function setIGroupRetrievePostsError() {
    return {
        type: SET_RETRIEVE_POSTS_IGROUP_ERROR
    }
}

export function setIGroupRetrieveEventsSuccess(response) {
    return {
        type: SET_RETRIEVE_EVENTS_IGROUP_SUCCESS,
        payload: response
    }
}

export function setIGroupRetrieveEventsError() {
    return {
        type: SET_RETRIEVE_EVENTS_IGROUP_ERROR
    }
}

export function setIGroupGetInformationSuccess(response) {
    return {
        type: SET_RETRIEVE_GROUP_INFO_SUCCESS,
        payload: response
    }
}

export function setIGroupGetInformationError() {
    return {
        type: SET_RETRIEVE_GROUP_INFO_ERROR
    }
}

export function setPostToGroupSuccess() {
    return {
        type: SET_POST_GROUP_SUCCESS
    }
}

export function setPostToGroupError() {
    return {
        type: SET_POST_GROUOP_ERROR
    }
}

export function setCreateEventToGroupSuccess() {
    return {
        type: SET_CREATE_EVENT_SUCCESS
    }
}

export function setCreateEventToGroupError() {
    return {
        type: SET_CREATE_EVENT_ERROR
    }
}

export function getMonthlyEventSuccess (response) {
    return {
        type: SET_GET_MONTHLY_EVENTS_SUCCESS,
        payload: response
    }
}

export function getMonthlyEventError () {
    return {
        type: SET_GET_MONTHLY_EVENTS_ERROR
    }
}

export function setCommentGPostSuccess () {
    return {
        type: SET_COMMENT_GROUP_POST_SUCCESS
    }
}

export function setCommentGPostError () {
    return {
        type: SET_COMMENT_GROUP_POST_ERROR
    }
}

export function setGetGroupMembersSuccess(response) {
    return {
        type: GROUP_MEMBERS_SUCCESS,
        payload: response

    }
}

export function setJoinGroupSuccess () {
    return {
        type: JOIN_GROUP_NO_MATTER
    }
}

export function joinGroup(groupId, userId) {
    return function (dispatch) {
        let config = {
            params: {
                group_id: groupId,
                user_id: userId
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/join", config, setJoinGroupSuccess, tooLazyToMakeAnActualActionReducer);
    }
}

export function getGroupMembers(groupId) {
    return function (dispatch) {
        let config = {
            params: {group_id: groupId}
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/users", config, setGetGroupMembersSuccess, tooLazyToMakeAnActualActionReducer)
    }
}

export function getIGroupPosts(groupId) {
    return function (dispatch) {
        let config = {
            params: {group_id: groupId}
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/post", config, setIGroupRetrievePostsSuccess, setIGroupRetrievePostsError)
    }
}

export function getIGroupEvents(groupId) {
    return function (dispatch) {
        let config = {
            params: {group_id: groupId}
        };
        return axiosGetRequestHelper(dispatch,"http://127.0.0.1:5000/api/groups/event/view", config, setIGroupRetrieveEventsSuccess, setIGroupRetrieveEventsError);
    }
}

export function getIGroupInformation(groupId) {
    return function (dispatch) {
        let config = {
            params: {group_id: groupId}
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/info", config, setIGroupGetInformationSuccess, setIGroupGetInformationError)
    }
}

export function postToGroup(groupId, userId, postText) {
    return function (dispatch) {
        let config = {
            params: {
                group_id: groupId,
                user_id: userId,
                group_post: postText
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/post", config, setPostToGroupSuccess, setPostToGroupError);
    }
}

export function createEventForGroup(groupId, eventName, locationName, address, postalCode, city, province, timestamp) {
    return function (dispatch) {
        let config = {
            params: {
                group_id: groupId,
                event_name: eventName,
                location_name: locationName,
                address: address,
                postal_code: postalCode,
                city: city,
                province: province,
                timestamp: timestamp
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/event/create", config, setCreateEventToGroupSuccess, setCreateEventToGroupError)
    }
}

export function getGroupMonthlyEvent(groupId) {
    return function (dispatch) {
        let config = {
            params: {group_id: groupId}
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/monthly_events", config, getMonthlyEventSuccess, getMonthlyEventError)
    }
}

export function postCommentOnGroupPost(groupId, gPostId, userId, commentText) {
    return function (dispatch) {
        let config = {
            params: {
                group_id: groupId,
                gpost_id: gPostId,
                user_id: userId,
                comment_text: commentText
            }
        };
        return axiosPostRequestHelper(dispatch,"http://127.0.0.1:5000/api/groups/insert_comment", config, setCommentGPostSuccess, setCommentGPostError)
    }
}


