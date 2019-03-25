import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS} from "../constants/actionTypes";
import fetch from 'cross-fetch'


export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    }
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    }
}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}

export function tryLogin(username, password) {
    return function (dispatch) {
        dispatch(setLoginPending());
        return fetch("http://127.0.0.1:5000/api/login?email=" + username + "&password=" + password)
            .then(response => {
                response.json()
            })
            .then(json => {
                dispatch(setLoginSuccess(true))
            })
            .catch(reason => {
                dispatch(setLoginError(false))
            });
        }
        // return fetch("http://127.0.0.1:5000/api/login",
        //     {
        //         method: "GET",
        //         // headers: {
        //         //     'Accept': 'application/json',
        //         //     'Content-Type': 'application/json'
        //         // },
        //         body: JSON.stringify({
        //             email: username,
        //             password: password
        //         })
        //     })
        //     .then(response => {
        //         response.json()
        //     })
        //     .then(json => {
        //         dispatch(setLoginSuccess(true))
        //     })
        //     .catch(reason => {
        //         dispatch(setLoginError(false))
        //     })};
    }