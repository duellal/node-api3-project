const Users = require(`../users/users-model`)
const Posts = require(`../posts/posts-model`)


function logger(req, res, next) {
  console.log(`The request method is ${req.method}, the request url is ${req.url}, and the time is ${Date.now()}`)
  next()
}

async function validateUserId(req, res, next) {
  try{
  const {id} = req.params
  const user = await Users.getById(id)

  if(id){
    req.user = user
    next()
  }
  else{
    next({status: 404,
    message: `user not found`})
  }}
  catch(err){
    next(err)
  }}

function validateUser(req, res, next) {
}

function validatePost(req, res, next) {
  
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser, 
  validatePost
}