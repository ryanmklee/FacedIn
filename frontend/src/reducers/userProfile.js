import {
    RESET_PROFILE_INFO,
    SEND_FRIEND_REQ_SUCCESS,
    SET_CHANGE_USER_INFO_ERROR,
    SET_CHANGE_USER_INFO_SUCCESS,
    SET_RETRIEVE_USER_INFO_ERROR,
    SET_RETRIEVE_USER_INFO_SUCCESS
} from "../constants/actionTypes";
const initialState = {
    userData: {},
    addedFriend: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_PROFILE_INFO:
            return initialState;
        case SET_CHANGE_USER_INFO_SUCCESS:
            return state;
        case SET_CHANGE_USER_INFO_ERROR:
            return state;
        case SET_RETRIEVE_USER_INFO_SUCCESS:
            console.log(action.payload.data.user_data[0])
            return {
                ...state,
                userData: action.payload.data.user_data[0]
            };
        case SET_RETRIEVE_USER_INFO_ERROR:
            return state;
        case SEND_FRIEND_REQ_SUCCESS:
            return {
                ...state,
                addedFriend: true
            };
        default:
            return state
    }
}