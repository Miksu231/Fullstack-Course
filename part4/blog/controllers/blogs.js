const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const http = require('http')
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
    const user = request.user
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
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (!user._id || user.id.toString() !== blog.creator.toString()) {
      return response.status(401).json({ error: 'Only the creator can delete the blog.' })
    }
    await blog.remove()
    await User.updateOne({ _id: user._id }, {
      $pullAll: {
        blogs: [{ _id: request.params.id }],
      },
		})
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