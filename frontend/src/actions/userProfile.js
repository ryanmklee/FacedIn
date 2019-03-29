import {
    RESET_PROFILE_INFO,
    SEND_FRIEND_REQ_ERROR,
    SEND_FRIEND_REQ_SUCCESS,
    SET_CHANGE_USER_INFO_ERROR,
    SET_CHANGE_USER_INFO_SUCCESS,
    SET_RETRIEVE_USER_INFO_ERROR,
    SET_RETRIEVE_USER_INFO_SUCCESS
} from "../constants/actionTypes";
import {axiosGetRequestHelper, axiosPostRequestHelper} from "./webcallUtil";
import axios from "axios";


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

export function resetProfileInfo () {
    return {
        type: RESET_PROFILE_INFO
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
export function setSendFriendRequestSuccess () {
    return {
        type: SEND_FRIEND_REQ_SUCCESS
    }
}
export function setSendFriendRequestError () {
    return {
        type: SEND_FRIEND_REQ_ERROR
    }
}

export function sendFriendRequest(userId, friendId) {
    return function (dispatch) {
        let config = {
            params: {
                user_id: userId,
                friend_id: friendId
            }
        };
        return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/send_friend_request", config, setSendFriendRequestSuccess, setSendFriendRequestError);
    }
}
export function setUserInfo(age, name, occupation, sex, userId, locationName, address, postalCode, city, province) {
    return function (dispatch) {
        let config = {
            params: {
                age: age,
                name: name,
                occupation: occupation,
                sex: sex,
                user_id: userId,
                location_name: locationName,
                address: address,
                postal_code: postalCode,
                city: city,
                province: province
            }
        };
        console.log(config)
        let url = "http://127.0.0.1:5000/api/user/info";
        return axios.put(url, null,  config)
            .then(response => {
                console.log("Put " + url + " Response:");
                console.log(response);
                dispatch(setChangeUserInfoSuccess())
            })
            .catch(error => {
                console.log("Put " + url+ " Error:");
                console.log(error);
                dispatch(setChangeUserInfoError())
            })
        // return axiosPostRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/info", config, setChangeUserInfoSuccess, setChangeUserInfoError);
    }
}

export function getUserInfo(userId) {
    return function (dispatch) {
        let config = {
            params: {
                user_id: userId
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/info", config, setGetUserInfoSuccess, setGetUserInfoError);
    }
}

