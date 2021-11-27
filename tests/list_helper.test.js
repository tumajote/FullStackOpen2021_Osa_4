const listHelper = require('../utils/list_helper')
const mockBlogs = require('./mockBlogs')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(mockBlogs.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(mockBlogs.allBlogs)
        expect(result).toBe(36)
    })
})

describe('most liked blog', () => {
    test('of empty list is empty object', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({})
    })
    test('of the list is chosen correctly', () => {
        const result = listHelper.favoriteBlog(mockBlogs.allBlogs)
        expect(result).toEqual(mockBlogs.mostLikedBlog)
    })
})