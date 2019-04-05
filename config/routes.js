const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const Users = require('../users/users-model.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  let user = req.body;
  const hashedPassword = bcrypt.hashSync(user.password, 8);
  user.password = hashedPassword;

  try {
    const addedUser = await Users.add(user);
    res.status(201).json(addedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User could not be added.' });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
