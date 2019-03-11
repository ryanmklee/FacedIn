import {LOGIN_ACTION} from "../constants/actionTypes";

export function tryLogin(payload) {
    return {type: LOGIN_ACTION, payload}
};