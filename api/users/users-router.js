const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require(`../users/users-model`)
const Posts = require(`../posts/posts-model`)

// The middleware functions also need to be required
const {logger, validateUserId, validateUser, validatePost} = require(`../middleware/middleware`)

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.put('/:id', [validateUserId, validateUser], (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(next)
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id}

  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

// do not forget to export the router
module.exports = router
