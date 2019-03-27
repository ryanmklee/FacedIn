import { combineReducers } from 'redux';
import login from './login';
import createuser from './createuser'
import individualGroupPage from './individualGroupPage'
export default combineReducers({
    login,
    createuser,
    individualGroupPage
});