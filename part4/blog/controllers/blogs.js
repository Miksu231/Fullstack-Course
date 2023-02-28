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

module.exports = blogsRouter