import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS} from "../constants/actionTypes";
import axios from 'axios'


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

export function tryLogin(username, password) {
    return function (dispatch) {
        dispatch(setLoginPending());
        return axios({
            method:'get',
            url:"http://127.0.0.1:5000/api/login",
            params: {email: username,
                password: password
            }
        })
            .then(response => {
                console.log("Login success!")
                dispatch(setLoginSuccess(response))
            })
            .catch(error => {
                console.log("Login Error!")
                setLoginError()
            });
    }
    }