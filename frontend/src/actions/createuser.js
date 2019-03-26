import {} from "../constants/actionTypes";
import axios from 'axios'
import {SET_CREATE_USER_SUCCESS} from "../constants/actionTypes";
import {SET_CREATE_USER_ERROR} from "../constants/actionTypes";


export function setCreateUserSuccess() {
    return {
        type: SET_CREATE_USER_SUCCESS,
    }
}

export function setCreateUserError() {
    return {
        type: SET_CREATE_USER_ERROR
    }
}

export function createUser(username, password) {
    return function (dispatch) {
        return axios.post("http://127.0.0.1:5000/api/create", null, {
            params: {
                user: username,
                password: password
            }
        })
            .then(response => {
                dispatch(setCreateUserSuccess())
            })
            .catch(error => {
                console.log("Create User Error!" + error)
                dispatch(setCreateUserError())
            })
    }
}