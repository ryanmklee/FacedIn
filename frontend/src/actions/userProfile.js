import {
    SET_CHANGE_USER_INFO_ERROR,
    SET_CHANGE_USER_INFO_SUCCESS, SET_RETRIEVE_USER_INFO_ERROR,
    SET_RETRIEVE_USER_INFO_SUCCESS
} from "../constants/actionTypes";
import {axiosGetRequestHelper, axiosPostRequestHelper} from "./webcallUtil";
import {setPostToGroupError, setPostToGroupSuccess} from "./individualGroupPage";


export function setChangeUserInfoSuccess () {
    return {
        type: SET_CHANGE_USER_INFO_SUCCESS
    }
}

export function setChangeUserInfoError () {
    return {
        type: SET_CHANGE_USER_INFO_ERROR
    }
}

export function setGetUserInfoSuccess (response) {
    return {
        type: SET_RETRIEVE_USER_INFO_SUCCESS,
        payload: response
    }
}

export function setGetUserInfoError () {
    return {
        type: SET_RETRIEVE_USER_INFO_ERROR
    }
}

export function setUserInfo(age, name, occupation, sex, userId, locationName, address, postalCode, city, province) {
    return function (dispatch) {
        let config = {
            params: {
                age: 18,
                name: "Dr. Strange",
                occupation: "Auditor",
                sex: "Male",
                user_id: 1,
                location_name: "DMP 310",
                address: "234 Computer Science Rd.",
                postal_code: "V2X1G5",
                city: "Vancouver",
                province: "BC",
                // sex: "Male,
                // name: "Gareth Crisp",
                // occupation: "Soccer Player"
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/info", config, setChangeUserInfoSuccess, setChangeUserInfoError);
    }
}

export function getUserInfo(userId) {
    return function (dispatch) {
        let config = {
            params: {
                age: 18,
                name: "Dr. Strange",
                occupation: "Auditor",
                sex: "Male",
                user_id: 1,
                location_name: "DMP 310",
                address: "234 Computer Science Rd.",
                postal_code: "V2X1G5",
                city: "Vancouver",
                province: "BC",
                // sex: "Male,
                // name: "Gareth Crisp",
                // occupation: "Soccer Player"
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/info", config, setGetUserInfoSuccess, setGetUserInfoError);
    }
}