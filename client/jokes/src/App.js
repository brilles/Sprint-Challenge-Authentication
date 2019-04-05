import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Signup from './auth/Signup.js';
import Signin from './auth/Signin.js';
import Jokes from './jokes/Jokes.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/jokes">Jokes</NavLink>
          <button>Log out</button>
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
