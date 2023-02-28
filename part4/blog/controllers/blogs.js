const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const http = require('http')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  let blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.url || !blog.title) {
    response.status(400).end()
  }
  else {
    const result = await blog.save()
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