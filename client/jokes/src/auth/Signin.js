import React from 'react';
import axios from 'axios';

export default class Signin extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3300/api/login',
        this.state
      );
      localStorage.setItem('token', res.data.token);
      this.props.history.push('/jokes');
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </>
    );
  }
}
