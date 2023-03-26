import BlogDetails from './BlogDetails'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = forwardRef(({ blog, handleLike }, refs) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const likeThis = () => {
    handleLike(blog)
	}
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
      getBlog: () => {
        return blog
      },
    }
  })
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility} style={hideWhenVisible}>view</button><button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      {visible && <BlogDetails blog={blog} handleLike={likeThis} />}
  </div>
  )
})

export default Blog