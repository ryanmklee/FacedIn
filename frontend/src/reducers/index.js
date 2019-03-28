import { combineReducers } from 'redux';
import login from './login';
import createuser from './createuser'
import individualGroupPage from './individualGroupPage'
import userProfile from "./userProfile";
import home from "./home";
import friendRequests from "./friendRequests";
export default combineReducers({
    login,
    createuser,
    individualGroupPage,
    userProfile,
    home,
    friendRequests
});