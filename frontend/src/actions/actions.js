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
            .then(response => response.json())
            .then(json => {
                const temp2 = json.body;
                dispatch(setLoginSuccess(true))
            })
            .catch(reason => {
                console.log("INVALID")
                dispatch(setLoginError(false))
            });
        }
}

// export const attemptLogin = () => {
//     return async dispatch => {
//         try {
//             const loginPromise = await fetch("http://127.0.0.1:5000/api/login")
//         }
//     }
// }