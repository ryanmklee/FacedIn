import {
    SEARCH_SUCCESS,
    SET_LOGIN_ERROR,
    SET_LOGIN_PENDING,
    SET_LOGIN_SUCCESS,
    SET_LOGOUT
} from "../constants/actionTypes";

const initialState = {
    results: {
        events: [],
        groups: [],
        users: [],
    },
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                results: action.payload.data.res
            };
        default:
            return state
    }
}