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
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button aria-label='open' id='open-button' onClick={toggleVisibility} style={hideWhenVisible} className='openButton'>view</button><button aria-label='close' id='close-button' onClick={toggleVisibility} style={showWhenVisible} className='closeButton'>hide</button>
      {visible && <BlogDetails aria-label='details' blog={blog} handleLike={likeThis} handleRemove={removeThis} user={user} />}
    </div>
  )
})
Blog.displayName = 'Blog'
export default Blog