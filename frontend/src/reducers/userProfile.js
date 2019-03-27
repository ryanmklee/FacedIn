import {
    SET_CHANGE_USER_INFO_ERROR,
    SET_CHANGE_USER_INFO_SUCCESS,
    SET_RETRIEVE_USER_INFO_ERROR,
    SET_RETRIEVE_USER_INFO_SUCCESS
} from "../constants/actionTypes";
const initialState = {
    userData: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANGE_USER_INFO_SUCCESS:
            return state;
        case SET_CHANGE_USER_INFO_ERROR:
            return state;
        case SET_RETRIEVE_USER_INFO_SUCCESS:
            console.log(action.payload.data.user_data[0])
            return {
                ...state,
                userData: action.payload.data.user_data[0]
            };
        case SET_RETRIEVE_USER_INFO_ERROR:
            return state;
        default:
            return state
    }
}