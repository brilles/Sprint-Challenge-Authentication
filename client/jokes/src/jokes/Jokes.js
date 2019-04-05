import React from 'react';
import axios from 'axios';

import Auth from '../auth/Auth.js';

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    (async function retrieveJokes() {
      try {
        const jokes = await axios.get('http://localhost:3300/api/jokes');
        console.log(jokes);
        // this.setState({ jokes: jokes });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  render() {
    return (
      <div className="main-content">
        <h2>Jokes:</h2>
        {this.state.jokes.map(joke => (
          <div key={joke.id}>
            <p>{joke}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Auth(Jokes);
