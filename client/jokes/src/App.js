import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Signup from './auth/Signup.js';
import Signin from './auth/Signin.js';
import Jokes from './jokes/Jokes.js';

class App extends Component {
  logout = () => {
    localStorage.removeItem('token');
  };

  render() {
    return (
      <div className="App">
        <header>
          <NavLink to="/signup" activeClassName="active">
            Sign Up
          </NavLink>
          <NavLink to="/signin" activeClassName="active">
            Sign In
          </NavLink>
          <NavLink to="/jokes" activeClassName="active">
            Jokes
          </NavLink>
          <NavLink to="/signin" activeClassName="active not-active">
            <button onClick={this.logout}>Log out</button>
          </NavLink>
        </header>
        <div className="main">
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/jokes" component={Jokes} />
        </div>
      </div>
    );
  }
}

export default App;
