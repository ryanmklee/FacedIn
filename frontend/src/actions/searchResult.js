import {
    SEARCH_ERROR,
    SEARCH_SUCCESS,
    SET_GET_ALL_GROUPS_ERROR,
    SET_GET_ALL_GROUPS_SUCCESS
} from "../constants/actionTypes";
import {axiosGetRequestHelper} from "./webcallUtil";

export function setSearchSuccess(data) {
    return {
        type: SEARCH_SUCCESS,
        payload: data
    }
}

export function setSearchError() {
    return {
        type: SEARCH_ERROR
    }
}

export function searchPhrase(phrase) {
    return function (dispatch) {
        let params = {
            params: {
                phrase: phrase
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/search", params, setSearchSuccess, setSearchError)
    }
}