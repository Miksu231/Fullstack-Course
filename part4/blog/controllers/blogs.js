const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const http = require('http')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('creator', 'username name id')
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})
  
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    console.log(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token.' })
    }
    const user = await User.findById(decodedToken.id)
    if (!body.likes) {
      body.likes = 0
    }
    if (!body.url || !body.title) {
      response.status(400).end()
    }
    else {
      let blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        creator: user._id
      })
      const result = await blog.save()
      await user.blogs.push(result._id)
      await user.save()
      response.status(201).json(result)
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    if (!body.url || !body.title) {
      response.status(400).end()
    }
    let checkedLikes = body.likes ? body.likes : 0
    let blog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: checkedLikes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(result)
  } catch (exception) {
    next(exception)
  }
})
module.exports = blogsRouter