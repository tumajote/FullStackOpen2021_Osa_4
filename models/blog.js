const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document ,returnedOject) => {
    returnedOject.id = returnedOject._id.toString()
    delete returnedOject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)