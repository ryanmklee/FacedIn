import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS} from "../constants/actionTypes";

const initialState = {
    user_id: -1,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            return state;
        case SET_LOGIN_SUCCESS:
            console.log(action.payload.user_id)
            state.user_id = action.payload.user_id;
            return state;
        case SET_LOGIN_ERROR:
            return state;
        default:
            return state
    }
}