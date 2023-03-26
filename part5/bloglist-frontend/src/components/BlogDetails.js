const BlogDetails = ({ blog, handleLike }) => {
	return (
		<div>
			{blog.url} <br/>
			likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
			{blog.creator.username}
		</div>
	)
}
export default BlogDetails