import React from 'react';
import axios from 'axios';

import Auth from '../auth/Auth.js';

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:3300/api/jokes')
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main-content">
        <h2>Jokes:</h2>
        {this.state.jokes.map(joke => (
          <div className="joke-card" key={joke.id}>
            <p>~ {joke.joke}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Auth(Jokes);
