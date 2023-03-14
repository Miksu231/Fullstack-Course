const supertest = require('supertest')
const mongoose = require('mongoose')
const blogs = require('../controllers/blogs')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./helper')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let object = new Blog(blog)
    await object.save()
  }
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    let object = new User(user)
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
      expect(item.id).toBeDefined()
	  }
  })
  test('Not being logged in when posting returns 400', async () => {
    let newBlog = {
      title: 'name',
      author: 'user',
      url: 'www.somesite.com/blog',
      likes: 10
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
	})
  test('Posting creates a new blog post', async () => {
    let newBlog = {
      title: 'name',
      author: 'user',
      url: 'www.somesite.com/blog',
      likes: 10
    }
    let auth = {};
    login(auth)
    await api.post('/api/blogs').set('Authorization', 'bearer ' + auth.token).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
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
    let auth = {};
    login(auth)
    await api.post('/api/blogs').set('Authorization', 'bearer ' + auth.token).send(newBlog).expect(201)
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
    await api.post('/api/blogs').set('Authorization', 'bearer ' + auth.token).send(newBlog1).expect(400)
    let newBlog2 = {
      title: 'Interesting title 2',
      author: 'Kyle J. Blogger',
      likes: 10
    }
    await api.post('/api/blogs').set('Authorization', 'bearer ' + auth.token).send(newBlog2).expect(400)
  })

  test('Can delete a blog', async () => {
    let newBlog1 = {
      title: 'Title1',  
      author: 'Kyle J. Blogger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    let auth = {};
    login(auth)
    await api.post('/api/blogs/').set('Authorization', 'bearer ' + auth.token).send(newBlog1).expect(201)
    let response = await api.get('/api/blogs')
    const blogId = response.body.filter(blog => blog.title === 'Title1')[0]._id
    await api.delete(`/api/blogs/${blogId}`).set('Authorization', 'bearer ' + auth.token).expect(204)
    response = await api.get('/api/blogs')
    expect(response.body.map(blog => blog.title)).not.toContainEqual('Title1')
  })

  test('Can update a blog', async () => {
    const newBlog1 = {
      title: 'Title1',
      author: 'Kyle J. Blogger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api.post('/api/blogs').send(newBlog1).expect(201)
    const newBlog2 = {
      title: 'Title1',
      author: 'Kyle J. Blogger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 50
    }
    let auth = {};
    login(auth)
    let response = await api.get('/api/blogs')
    const blogId = response.body.filter(blog => blog.title === 'Title1')[0]._id
    expect(response.body.filter(blog => blog.title === 'Title1')[0].likes).toEqual(5)
    await api.put(`/api/blogs/${blogId}`).set('Authorization', 'bearer ' + auth.token).send(newBlog2)
    response = await api.get('/api/blogs')
    expect(response.body.filter(blog => blog.title === 'Title1')[0].likes).toEqual(50)
  })
})
const login = (auth) => {
  return function (done) {
    api
      .post('/api/login')
      .send({
        username: "user1",
        password: "password1"
      })
      .end(onResponse);

    const onResponse = (error, response) => {
      auth.token = response.body.token;
      return done();
    }
  }
}