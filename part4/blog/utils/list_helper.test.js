const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithNoBlogs = []
  const listWithBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'The Lord of the Rings',
        author: 'J. R. R. Tolkien',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1000,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f0',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
  ]
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('when list is empty should return 0', () => {
        const test = listHelper.totalLikes(listWithNoBlogs)
        expect(test).toBe(0)
    })
    test('when list has several items should return the sum of all likes', () => {
        const test = listHelper.totalLikes(listWithBlogs)
        expect(test).toBe(1010)
    })
  })
describe('most liked blog', () => {

    test('Should return empty object on no blogs', () => {
        const test = listHelper.favoriteBlog(listWithNoBlogs)
        expect(test).toEqual({})
    })
    test('Should return only blog with 1 blog', () => {
        const test = listHelper.favoriteBlog(listWithOneBlog)
        expect(test).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          })
    })
    test('Should return the most liked if there are several blogs', () => {
        const test = listHelper.favoriteBlog(listWithBlogs)
        expect(test).toEqual({
            _id: '5a422aa71b54a676234d17f9',
            title: 'The Lord of the Rings',
            author: 'J. R. R. Tolkien',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1000,
            __v: 0
        })
    })
})
describe('author with most blogs', () => {

    test('Should return Dijkstra when there are multiple', () => {
        const test = listHelper.mostBlogs(listWithBlogs)
        expect(test).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 2
          })
    })
    test('Should return Robert C. Martin with one blog', () => {
        const test = listHelper.mostBlogs(listWithOneBlog)
        expect(test).toEqual({
            author: "Robert C. Martin",
            blogs: 1
          })
    })
    test('Should return nobody if there are no blogs', () => {
        const test = listHelper.mostBlogs(listWithNoBlogs)
        expect(test).toEqual({
            author: undefined,
            blogs: undefined
          })
    })
})
describe('author with most likes', () => {

  test('Should return J. R. R. Tolkien when there are multiple', () => {
    const test = listHelper.mostLikes(listWithBlogs)
    expect(test).toEqual({
      author: "J. R. R. Tolkien",
      likes: 1000
    })
  })
  test('Should return Robert C. Martin with one blog', () => {
    const test = listHelper.mostLikes(listWithOneBlog)
    expect(test).toEqual({
      author: "Robert C. Martin",
      likes: 5
    })
  })
  test('Should return nobody if there are no blogs', () => {
    const test = listHelper.mostLikes(listWithNoBlogs)
    expect(test).toEqual(undefined)
  })
})