import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route , Switch} from 'react-router-dom'


import Login from './components/Login'
import CreateUser from "./components/CreateUser";
import CreateGroup from "./components/CreateGroup";
import Error from "./components/Error"
import Provider from "react-redux/es/components/Provider";
import store from "./store/index";
import Home from "./components/Home";
import GroupPage from "./components/GroupPage";
import CreateEvent from "./components/CreateEvent";
import Profile from "./components/Profile";
import Group from "./components/IndividualGroupPage";
import Event from "./components/Event"
import SearchResult from './components/SearchResult';
import Features from "./components/Features";

class App extends Component {
    render() {
        return (
            <Provider store={store} >
            <BrowserRouter>
                <div>
                <Switch>
                    <Route path = "/" component={Login} exact />
                    <Route path = "/create-user" component={CreateUser}/>
                    <Route path = "/create-group" component={CreateGroup}/>
                    <Route path = "/group-page" component={GroupPage}/>
                    <Route path = "/create-event" component={Event}/>
                    <Route path = "/profile" component={Profile}/>
                    <Route path = "/home" component={Home}/>
                    <Route path = "/search-result" component={SearchResult}/>
                    <Route path = "/ind-group-page" component={Group}/>
                    <Route path = "/features" component={Features}/>
                    <Route component={Error}/>
                </Switch>
                </div>
            </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
