const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        response.status(201).json(result).end()
    } catch (err) {
        response.status(400).json(err).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = {
        likes: request.body.likes
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(result)
 })

module.exports = blogsRouter
