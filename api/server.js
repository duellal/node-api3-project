const express = require('express');
const {logger, validateUserId, validatePost, validateUser} = require('./middleware/middleware')

const server = express();

const Users = require(`./users/users-model`)
const Posts = require(`./posts/posts-model`)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
