import { useState, forwardRef, useImperativeHandle } from 'react'
const BlogForm = forwardRef(({ addBlog }, refs) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setURL(event.target.value)
  }
  const clearURL = () => {
    setURL('')
  }
  const clearTitle = () => {
    setTitle('')
  }
  const clearAuthor = () => {
    setAuthor('')
  }
  useImperativeHandle(refs, () => {
    return {
      handleAuthorChange,
      handleTitleChange,
      handleURLChange,
      getTitle: () => {
        return title
      },
      getAuthor: () => {
        return author
      },
      getURL: () => {
        return url
      },
      clearAuthor,
      clearTitle,
      clearURL
    }
  })
  return(
    <form onSubmit={addBlog}>
      <div>
      title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
      author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
      url:
        <input
          value={url}
          onChange={handleURLChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
})
BlogForm.displayName = 'BlogForm'

export default BlogForm