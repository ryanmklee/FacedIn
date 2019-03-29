import {
    GROUP_MEMBERS_SUCCESS, JOIN_GROUP_NO_MATTER,
    SET_ACCEPT_GROUP_REQ_ERROR,
    SET_ACCEPT_GROUP_REQ_SUCCESS, SET_GET_MONTHLY_EVENTS_SUCCESS,
    SET_JOIN_GROUP_SUCCESS,
    SET_RETRIEVE_POSTS_IGROUP_SUCCESS, SET_SEND_GROUP_REQ_ERROR,
    SET_SEND_GROUP_REQ_SUCCESS
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

const initialState = {
    posts: [],
    events:[],
    monthlyEvents: [],
    monthlyEventsCount: 0,
    groupMembers: [],
    groupName: "",
    groupDesc: "",
    acceptedToGroup: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RETRIEVE_POSTS_IGROUP_SUCCESS:
            return {
                ...state,
                posts: action.payload.data.posts
            };
        case SET_RETRIEVE_POSTS_IGROUP_ERROR:
            return state;
        case SET_RETRIEVE_EVENTS_IGROUP_ERROR:
            return state;
        case SET_RETRIEVE_EVENTS_IGROUP_SUCCESS:
            return {
                ...state,
                events: action.payload.data.events
            };
        case SET_POST_GROUP_SUCCESS:
            return state;
        case SET_POST_GROUOP_ERROR:
            return state;
        case SET_RETRIEVE_GROUP_INFO_SUCCESS:
            return {
                ...state,
                groupName: action.payload.data.groups[0].group_name,
                groupDesc: action.payload.data.groups[0].activity
            };
        case SET_RETRIEVE_GROUP_INFO_ERROR:
            return state;
        case SET_CREATE_EVENT_SUCCESS:
            return state;
        case SET_CREATE_EVENT_ERROR:
            return state;
        case SET_SEND_GROUP_REQ_SUCCESS:
            return {
                ...state,
                acceptedToGroup: true
            };
        case JOIN_GROUP_NO_MATTER:
            return {
                ...state,
                acceptedToGroup: false
            };
        case SET_GET_MONTHLY_EVENTS_SUCCESS:
            return {
                ...state,
                monthlyEvents: action.payload.data.events,
                monthlyEventsCount: action.payload.data.count.count
            };
        case GROUP_MEMBERS_SUCCESS:
            return {
                ...state,
                groupMembers: action.payload.data.users
            };
        default:
            return state
    }
}