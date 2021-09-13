const blog = require('../models/blog')
const { mapReduce } = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (!blogs.length) return 0
    return blogs.reduce(
        (previouslikes, currentLikes) => previouslikes + currentLikes.likes,
        0
    )
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) return {}
    return blogs.reduce((previousBlog, currentBlog) =>
        previousBlog.likes > currentBlog.likes ? previousBlog : currentBlog
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
