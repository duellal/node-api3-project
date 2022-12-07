const express = require('express');
const {logger, validateUserId, validatePost, validateUser} = require('./middleware/middleware')
const usersRouter = require(`./users/users-router`)

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(`/api/users`, usersRouter)

// global middlewares and the user's router need to be connected here
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || `internal server error`
  })
})

module.exports = server;
