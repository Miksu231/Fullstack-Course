const supertest = require('supertest')
const mongoose = require('mongoose')
const users = require('../controllers/users')
const app = require('../app')
const User = require('../models/user')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    let object = new User(user)
    await object.save()
  }
})

describe('User API tests', () => {

  test('The amount of users in the test DB is correct', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('Can not create an invalid user', async () => {
    let newUser = {
      name: 'User Name',
      password: 'password'
    }
    let newUser2 = {
      username: 'username',
      name: 'User Name'
    }
    let newUser3 = {
      username: 'username',
      name: 'User Name',
      password: 'pa'
    }
    await api.post('/api/users').send(newUser).expect(400)
    await api.post('/api/users').send(newUser2).expect(400)
    await api.post('/api/users').send(newUser3).expect(400)
  })

})