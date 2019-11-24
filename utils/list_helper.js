const dummy = blogs => 1
const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)
const favoriteBlog = blogs => blogs.reduce((favorite, blog) => {
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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
