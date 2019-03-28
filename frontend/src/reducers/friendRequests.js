import {SET_GET_USER_POSTS_SUCCESS, SET_VIEW_FRIEND_REQUESTS_SUCCESS} from "../constants/actionTypes";

const initialState = {
    requests: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_FRIEND_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: action.payload.data.friend_requests
            };
        default:
            return state
    }
}