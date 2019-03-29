import {
    RESET_CREATE_SCREEN,
    SET_CREATE_USER_ERROR,
    SET_CREATE_USER_SUCCESS
} from "../constants/actionTypes";

const initialState = {
    createdUser: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CREATE_USER_SUCCESS:
            return  {
                ...state,
                createdUser: true
            };
        case SET_CREATE_USER_ERROR:
            return state;
        case RESET_CREATE_SCREEN:
            return {
                ...state,
                createdUser: false
            }
        default:
            return state
    }
}