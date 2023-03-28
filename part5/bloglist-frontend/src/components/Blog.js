import BlogDetails from './BlogDetails'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = forwardRef(({ blog, handleLike, handleRemove, user }, refs) => {
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
  const removeThis = () => {
    handleRemove(blog)
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
      {blog.title} {blog.author} <button aria-label='open' onClick={toggleVisibility} style={hideWhenVisible}>view</button><button aria-label='close' onClick={toggleVisibility} style={showWhenVisible}>hide</button>
      {visible && <BlogDetails aria-label='details' blog={blog} handleLike={likeThis} handleRemove={removeThis} user={user} />}
    </div>
  )
})
Blog.displayName = 'Blog'
export default Blog