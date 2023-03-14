const User = require('../models/user')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const http = require('http')
const bcrypt = require('bcrypt')
const middleware = require('../utils/middleware')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    response.status(400).send('Body must contain a username and password').end()
  }
  else if (password.length < 3 || username.length < 3) {
    response.status(400).send('Given password and username must be at least 3 characters long').end()
  }
  else if ((await User.find({ username: username })).length > 0) {
    response.status(400).send('Username must be unique').end()
  }
  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log(passwordHash);
    let user = new User({ username, passwordHash, name })
    const result = await user.save()
    response.status(201).json(result)
  }
})
usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', 'title author url likes')
  return response.json(users)
})
usersRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user
  const databaseUser = await User.findById(request.params.id)
  if (!user._id || user.id.toString() !== databaseUser._id.toString()) {
    return response.status(401).json({ error: 'Only the user can delete themselves.' })
  }
  await databaseUser.remove()
  await Blog.deleteMany({ creator: databaseUser._id })
  return response.status(204).end()
})

module.exports = usersRouter