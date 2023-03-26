import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [notificationTone, setTone] = useState('')

  const blogFormRef = useRef()
  const togglableRef = useRef()
  const blogsRef = useRef([])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Logged in as ${username}`)
      setTone('p')
    } catch (exception) {
      setMessage('Incorrect username or password')
      setTone('n')
    } finally {
      setTimeout(() => {
        setMessage(null)
        setTone('')
      }, 5000)
    }
  }
  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      togglableRef.current.toggleVisibility()
      const title = blogFormRef.current.getTitle()
      const author = blogFormRef.current.getAuthor()
      const url = blogFormRef.current.getURL()
      await blogService.create({ title, author, url })
      blogFormRef.current.clearURL()
      blogFormRef.current.clearAuthor()
      blogFormRef.current.clearTitle()
      setMessage(`A new blog ${blogFormRef.current.getTitle()} by ${blogFormRef.current.getAuthor()} added.`)
      setTone('p')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.error(exception)
      setMessage('Incorrect form input')
      setTone('n')
    } finally {
      setTimeout(() => {
        setMessage(null)
        setTone('')
      }, 5000)
    }
  }
  const addLike = async (blog) => {
    await blogService.addLike({ user: blog.creator.id, likes: 1, author: blog.author, title: blog.title, url: blog.url }, blog.id)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    blogsRef.current = blogsRef.current.slice(0, blogs.length)
  }, [blogs])

  return (
    <div>
      <Notification message={errorMessage} tone={notificationTone} />
      {!user && <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>
        <h2> create new </h2>
        <Togglable buttonLabel='new note' cancelLabel='cancel' ref={togglableRef}>
          <BlogForm
            addBlog={addBlog}
            ref={blogFormRef}
          />
        </Togglable>
        {blogs.map((blog, i) =>
          <Blog key={blog.id} blog={blog} handleLike={addLike} handleRemove={removeBlog} user={user.username} ref={b => blogsRef.current[i] = b} />
        )}
      </div>
      }
    </div>
  )
}

export default App