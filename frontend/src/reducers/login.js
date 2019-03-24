import {LOGIN_ACTION} from "../constants/actionTypes";

const initialState = {
    username: "",
    password: ""
};
export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            initialState.username = action.text;
            initialState.password = action.text;
            return {
                result: action.payload
            };
        default:
            return state
    }
}