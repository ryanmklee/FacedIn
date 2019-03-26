import {LOGIN_ACTION, SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS} from "../constants/actionTypes";

const initialState = {
    user_id: "hello",
    loading: true
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_PENDING:
            console.log(SET_LOGIN_PENDING)
            return {
                ...state,
                loading: true
            };
        case SET_LOGIN_SUCCESS:
            console.log(SET_LOGIN_SUCCESS)
            console.log("payload" + action.user_id)
            return {
                ...state,
                user_id: action.payload,
                loading: false
            };
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
}