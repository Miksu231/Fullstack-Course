const BlogDetails = ({ blog }) => {
	return (
		<div>
			{blog.url} <br/>
			likes {blog.likes} <button>like</button>
		</div>
	)
}
export default BlogDetails