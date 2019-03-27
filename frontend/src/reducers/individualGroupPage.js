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

const initialState = {
    posts: [],
    events:[],
    shouldReloadPage: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RETRIEVE_POSTS_IGROUP_SUCCESS:
            let posts = action.payload.data.posts;
            console.log(posts);
            return state;
        case SET_RETRIEVE_POSTS_IGROUP_ERROR:
            return state;
        case SET_RETRIEVE_EVENTS_IGROUP_ERROR:
            return state;
        case SET_RETRIEVE_EVENTS_IGROUP_SUCCESS:
            let events = action.payload.data.events
            console.log(events)
            state.events = events
            console.log(state)
            return state;
        case SET_POST_GROUP_SUCCESS:
            return state;
        case SET_POST_GROUOP_ERROR:
            return state;
        case SET_RETRIEVE_GROUP_INFO_SUCCESS:
            return state;
        case SET_RETRIEVE_GROUP_INFO_ERROR:
            return state;
        case SET_CREATE_EVENT_SUCCESS:
            return state;
        case SET_CREATE_EVENT_ERROR:
            return state;
        default:
            return state
    }
}