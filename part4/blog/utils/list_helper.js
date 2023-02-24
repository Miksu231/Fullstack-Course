const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(((x, y) => { return x + y.likes }), 0)
}
const favoriteBlog = (blogs) => {
    let mostLikes = -1
    let mostLikedBlog = null
    for(let blog of blogs) {
        if(blog.likes > mostLikes) {
            mostLikedBlog = blog
            mostLikes = blog.likes
        }
    }
    if(mostLikedBlog != null) {
        return mostLikedBlog
    }
    else return {}
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}