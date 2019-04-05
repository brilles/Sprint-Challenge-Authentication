const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const Users = require('../users/users-model.js');
const secret = require('../auth/authenticate').jwtSecret;

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

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await Users.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Successful login, ${user.username}!`,
        token
      });
    } else {
      res.status(401).json({ message: 'Failed login.' });
    }
  } catch (error) {
    res.status(500).json(user);
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
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
