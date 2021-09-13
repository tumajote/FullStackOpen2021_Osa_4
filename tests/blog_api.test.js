const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { deleteOne } = require('../models/blog')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('t', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
})

afterAll(async () => {
    await mongoose.connection.close()
})