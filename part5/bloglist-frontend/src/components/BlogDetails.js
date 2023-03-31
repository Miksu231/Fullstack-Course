const BlogDetails = ({ blog, handleLike, handleRemove, user }) => {
  return (
    <div>
      {blog.url} <br/>
			likes {blog.likes} <button aria-label='like' id='like-button' onClick={handleLike}>like</button> <br/>
      {blog.creator.username} <br/>
      {user === blog.creator.username && <button aria-label='remove' id='remove-button' onClick={handleRemove}>remove</button>}
    </div>
  )
}
BlogDetails.displayName = 'BlogDetails'
export default BlogDetails