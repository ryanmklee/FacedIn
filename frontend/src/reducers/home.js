import {
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

        default:
            return state
    }
}