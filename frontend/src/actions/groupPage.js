import {
    SET_GET_ALL_GROUPS_ERROR,
    SET_GET_ALL_GROUPS_SUCCESS
} from "../constants/actionTypes";
import {axiosGetRequestHelper} from "./webcallUtil";

export function setGetAllGroupsSuccess(data) {
    return {
        type: SET_GET_ALL_GROUPS_SUCCESS,
        payload: data
    }
}

export function setGEtAllGroupsError() {
    return {
        type: SET_GET_ALL_GROUPS_ERROR
    }
}

export function getAllGroups() {
    return function (dispatch) {
        let params = {
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/all", params, setGetAllGroupsSuccess, setGEtAllGroupsError)
    }
}