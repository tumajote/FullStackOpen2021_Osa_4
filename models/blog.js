const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedOject) => {
        returnedOject.id = returnedOject._id.toString()
        delete returnedOject._id
        if (!returnedOject.likes) {
            returnedOject.likes = 0
        }
    },
})

Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
