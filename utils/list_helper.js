const _ = require('lodash')

const dummy = blogs => 1
const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)
const favoriteBlog = blogs =>
  blogs.reduce((favorite, blog) => {
    if (!favorite.likes || blog.likes > favorite.likes) {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    } else {
      return favorite
    }
  }, {})
const mostBlogs = blogs =>
  _(blogs)
    .groupBy('author')
    .toPairs()
    .orderBy(kvArray => kvArray[1].length, ["desc"])
    .map(kvArray => {
      return { author: kvArray[0], blogs: kvArray[1].length }
    }).value()[0]

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
