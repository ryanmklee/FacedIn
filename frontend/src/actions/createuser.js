import {} from "../constants/actionTypes";
import axios from 'axios'
import {SET_CREATE_USER_SUCCESS} from "../constants/actionTypes";
import {SET_CREATE_USER_ERROR} from "../constants/actionTypes";
import {axiosPostRequestHelper} from "./webcallUtil";
import {RESET_CREATE_SCREEN} from "../constants/actionTypes";


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

export function resetCreateScreen () {
    return {
        type: RESET_CREATE_SCREEN
    }
}


export function createUser(username, password) {
    return function (dispatch) {
        let config = {
            params: {
                user: username,
                password: password
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/create", config, setCreateUserSuccess, setCreateUserError);
    }
}