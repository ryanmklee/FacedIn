import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGOUT} from "../constants/actionTypes";

const initialState = {
    user_id: -2,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            return state;
        case SET_LOGIN_SUCCESS:
            state.user_id = action.payload.user_id;
            return state;
        case SET_LOGIN_ERROR:
            return state;
        case SET_LOGOUT:
            state.user_id = -1;
            return state;
        default:
            return state
    }
}