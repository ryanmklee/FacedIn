import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/index";
import thunkMiddleware from 'redux-thunk'
const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware));
export default store;