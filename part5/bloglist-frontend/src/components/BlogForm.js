const BlogForm = ({ addBlog, onTitleChange, onAuthorChange, onURLChange, author, title, url }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        value={title}
        onChange={onTitleChange}
      />
    </div>
    <div>
      author:
      <input
        value={author}
        onChange={onAuthorChange}
      />
    </div>
    <div>
      url:
      <input
        value={url}
        onChange={onURLChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
)
export default BlogForm