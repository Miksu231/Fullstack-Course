const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const http = require('http')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', 'username name id')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
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
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
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
})
module.exports = blogsRouter