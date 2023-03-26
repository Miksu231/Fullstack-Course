const BlogDetails = ({ blog }) => {
	return (
		<div>
			{blog.url} <br/>
			likes {blog.likes} <button>like</button> <br/>
			{blog.creator.username}
		</div>
	)
}
export default BlogDetails