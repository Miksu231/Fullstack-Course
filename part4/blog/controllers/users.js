const User = require('../models/user')
const usersRouter = require('express').Router()
const http = require('http')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    response.status(400).send('Body must contain a username and password').end()
  }
  else if (password.length < 3) {
    response.status(400).send('Given password must be at least 3 characters long').end()
	}
  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    let user = new User({ username, name, passwordHash })
    const result = await user.save()
    response.status(201).json(result)
  }
})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

module.exports = usersRouter