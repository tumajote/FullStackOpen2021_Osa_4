const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {
    allBlogs,
    listWithOneBlog,
    mostLikedBlog,
    blogWithoutLikes,
    blogsWithoutFields,
} = require('./mockBlogs')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(allBlogs[0])
    await blogObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body).toHaveLength(1)
})

test('the identifier is named correctly', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('adding a blog increases the total amount by one', async () => {
    const newBlog = allBlogs[1]
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('Adding a blog without likes defaults to 0 likes', async () => {
    await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[1].likes).toBe(0)
})

test('Adding a blog without fiels gets 400', async () => {
    const newBlog1 = new Blog(blogsWithoutFields[0])
    const newBlog2 = new Blog(blogsWithoutFields[1])

    await api.post('/api/blogs').send(newBlog1).expect(400)

    await api.post('/api/blogs').send(newBlog2).expect(400)
})

afterAll(async () => {
    await mongoose.disconnect()
})
