import axios from 'axios'
import {SET_RETRIEVE_POSTS_IGROUP_SUCCESS} from "../constants/actionTypes";
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

export function createEventForGroup(groupId, eventName, location, timestamp) {
    return function (dispatch) {
        let config = {
            params: {
                group_id: groupId,
                event_name: eventName,
                location: location,
                timestamp: timestamp
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/event/create", config, setCreateEventToGroupSuccess, setCreateEventToGroupError)
    }
}