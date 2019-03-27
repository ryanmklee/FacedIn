import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGOUT} from "../constants/actionTypes";
import axios from 'axios'
import {axiosGetRequestHelper} from "./webcallUtil";


export function setLoginPending() {
    return {
        type: SET_LOGIN_PENDING
    }
}

export function setLoginSuccess(data) {
    return {
        type: SET_LOGIN_SUCCESS,
        payload: data
    }
}

export function setLoginError() {
    return {
        type: SET_LOGIN_ERROR
    }
}

export function setLogout() {
    return {
        type: SET_LOGOUT
    }
}

export function tryLogin(username, password) {
    return function (dispatch) {
        let params = {
            params: {email: username,
                password: password
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/login", params, setLoginSuccess, setLoginError)
    }
}