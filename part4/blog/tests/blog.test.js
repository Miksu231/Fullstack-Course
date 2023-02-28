const supertest = require('supertest')
const mongoose = require('mongoose')
const blogs = require('../controllers/blogs')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let object = new Blog(blog)
    await object.save()
	}
})

test('The amount of blogs in the test DB is correct', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body).toHaveLength(helper.initialBlogs.length)
})