import {
    FRIEND_LOCATIONS_SUCCESS,
    MOST_JOINED_SUCCESS,
    SET_CREATE_USER_ERROR,
    SET_CREATE_USER_SUCCESS
} from "../constants/actionTypes";

const initialState = {
    mostJoined: [],
    friendLocations: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case MOST_JOINED_SUCCESS:
            return  {
                ...state,
                mostJoined: action.payload.data.users
            };
        case FRIEND_LOCATIONS_SUCCESS:
            return {
                ...state,
                friendLocations: action.payload.data.friends
            };
        default:
            return state
    }
}