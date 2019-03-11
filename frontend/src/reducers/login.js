import {LOGIN_ACTION} from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return {
                result: action.payload
            };
        default:
            return state
    }
}