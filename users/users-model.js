const db = require('../database/dbConfig.js');

module.exports = {
  add,
  findById,
  findByUsername
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}
