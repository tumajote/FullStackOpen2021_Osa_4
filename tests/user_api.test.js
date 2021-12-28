const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const {
    correctUser,
    incorrectUserNoUsername,
    incorrectUserNoPassword,
    incorrectUserTooShortPassword,
    incorrectUserTooShortUsername,
} = require('./mockUsers')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})


test('only correct user can be created', async () => {
    const noPasswordError = "Error: Must have password"

    await api.post('/api/users').send(correctUser).expect(201)

    const response1 =await api.post('/api/users').send(incorrectUserNoPassword).expect(400)
    expect(response1.body).toEqual(noPasswordError)

    await api.post('/api/users').send(incorrectUserNoUsername).expect(400)

    await api.post('/api/users').send(incorrectUserTooShortPassword).expect(400)

    await api.post('/api/users').send(incorrectUserTooShortUsername).expect(400)
})

afterAll(async () => {
    await mongoose.disconnect()
})
