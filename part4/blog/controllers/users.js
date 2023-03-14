const User = require('../models/user')
const usersRouter = require('express').Router()
const http = require('http')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
  try {
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
  } catch (exception) {
    next(exception)
  }
})
usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', 'title author url likes')
    return response.json(users)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter