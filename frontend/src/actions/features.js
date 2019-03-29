
// GET: /api/groups/most_joined
//
// GET: /api/user/friend_locations


import {FRIEND_LOCATIONS_SUCCESS, MOST_JOINED_SUCCESS} from "../constants/actionTypes";
import {axiosGetRequestHelper} from "./webcallUtil";
import {tooLazyToMakeAnActualActionReducer} from "./general";

export function setMostJoinedSuccess (response) {
    return {
        type: MOST_JOINED_SUCCESS,
        payload: response
    }
}

export function setFriendsLocationSuccess (response) {
    return {
        type: FRIEND_LOCATIONS_SUCCESS,
        payload: response
    }
}

export function getMostJoined() {
    return function (dispatch) {
        let params = {};
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/groups/most_joined", params, setMostJoinedSuccess, tooLazyToMakeAnActualActionReducer)
    }
}

export function getFriendLocations(userId) {
    return function (dispatch) {
        let params = {
            params: {user_id: userId
            }
        };
        return axiosGetRequestHelper(dispatch, "http://127.0.0.1:5000/api/user/friend_locations", params, setFriendsLocationSuccess, tooLazyToMakeAnActualActionReducer)
    }
}