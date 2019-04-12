const express = require('express');

const server = express();
const db = require('./data.js');

server.use(express.json());

server.get('/users', async (req, res) => {
  const users = db.getAll();
  res.status(200).json(users);
});

server.post('/users', async (req, res) => {
  const { body: user } = req;
  if (!user.username) {
    res.status(400).json({ error: 'A username is required.' });
  } else {
    const newUser = db.create(user);
    res.status(201).json(newUser);
  }
});

server.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = db.delete(parseInt(id));
  if (!deleted) {
    res.status(404).json({ error: 'No user with that ID.' });
  } else {
    res.status(204).end();
  }
});

module.exports = server;
