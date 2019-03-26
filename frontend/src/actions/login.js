import {SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS} from "../constants/actionTypes";
import axios from 'axios'
import fetch from 'cross-fetch'


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
        return axios.get(
            // "https://jsonplaceholder.typicode.com/posts/42")
            "http://127.0.0.1:5000/api/login", {
            params: {email: username,
                password: password
            }
        })
            .then(response => {
                const temp = response
                const temp2 = response.data
                console.log("Login success!" + response.data.type + response.data)
                dispatch(setLoginSuccess(response.data))
            })
            .catch(error => {
                console.log("Login Error!" + error)
                setLoginError()
            });
    }
    }