import { combineReducers } from 'redux';
import login from './login';
import createuser from './createuser'
export default combineReducers({
    login,
    createuser
});