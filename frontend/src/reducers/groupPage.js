import {
    SET_GET_ALL_GROUPS_SUCCESS
} from "../constants/actionTypes";

const initialState = {
    groups: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_GET_ALL_GROUPS_SUCCESS:
            return {
                ...state,
                groups: action.payload.data.groups
            };
        default:
            return state
    }
}