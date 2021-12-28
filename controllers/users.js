const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10

    password = body.password 

    if (!password) {
        return response.status(400).json("Error: Must have password").end()
    }

    if (password.length < 3) {
        response.status(400).json("Error: Password minimum length is 3").end()
    }
    
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const result = await user.save()
        response.status(201).json(result).end()
    } catch (err) {
        response.status(400).json(err).end()
    }
})

module.exports = usersRouter
