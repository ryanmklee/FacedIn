import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGOUT} from "../constants/actionTypes";

const initialState = {
    user_id: 1,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            return state;
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                user_id: action.payload.data.user_id
            };
        case SET_LOGIN_ERROR:
            return state;
        case SET_LOGOUT:
            console.log("Setting uid to -1");
            return {
                ...state,
                user_id: -1
            };
        default:
            return state
    }
}