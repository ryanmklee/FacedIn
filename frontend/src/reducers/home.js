import {
    REGULAR_POST_SUCCESS,
    SET_GET_USER_POSTS_SUCCESS,

} from "../constants/actionTypes";

const initialState = {
    posts: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_GET_USER_POSTS_SUCCESS:
            console.log(action.payload.data.posts)
            return {
                ...state,
                posts: action.payload.data.posts
            };
        case REGULAR_POST_SUCCESS:
            return state;
        default:
            return state
    }
}