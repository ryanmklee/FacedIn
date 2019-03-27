import {
    SET_CREATE_USER_ERROR,
    SET_CREATE_USER_SUCCESS
} from "../constants/actionTypes";

const initialState = {
    createdUser: false
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CREATE_USER_SUCCESS:
            console.log("User created");
            state.createdUser = true;
            return  {
                ...state,
                createdUser: true
            };
        case SET_CREATE_USER_ERROR:
            return state;
        default:
            return state
    }
}