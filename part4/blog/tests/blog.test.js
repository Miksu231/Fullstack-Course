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
describe('API tests', () => {
  test('The amount of blogs in the test DB is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Each item returned from the DB has an ID', async () => {
    const response = await api.get('/api/blogs')
    for (let item of response.body) {
      expect(item._id).toBeDefined()
	  }
  })

  test('Posting creates a new blog post', async () => {
    let newBlog = {
      title: 'name',
      author: 'user',
      url: 'www.somesite.com/blog',
      likes: 10
	  }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const blogAuthors = response.body.map(blog => blog.author)
    expect(blogAuthors).toContainEqual('user')
  })
  test('Missing likes value defaults to zero', async () => {
    let newBlog = {
      title: 'Interesting title 2',
      author: 'Kyle J. Blogger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    const faultyItem = response.body.filter(blog => blog.title === 'Interesting title 2')[0]
    expect(faultyItem.likes).toEqual(0)
  })
  test('Missing title or URL returns response 400', async () => {
    let newBlog1 = {
      author: 'Kyle J. Blogger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs').send(newBlog1).expect(400)
    let newBlog2 = {
      title: 'Interesting title 2',
      author: 'Kyle J. Blogger',
      likes: 10
    }
    await api.post('/api/blogs').send(newBlog2).expect(400)
	})
})