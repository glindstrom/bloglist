const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let body = request.body
  body.likes = body.likes || 0
  const blog = new Blog(body)
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

module.exports = blogsRouter
