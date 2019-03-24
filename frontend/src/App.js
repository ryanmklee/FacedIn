import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Login from './components/Login'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Login />
        </div>
    );
  }
}

export default App;
