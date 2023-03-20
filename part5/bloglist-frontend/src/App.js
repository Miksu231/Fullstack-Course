import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')
  const [notificationTone, setTone] = useState('')

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
  const handleLogout = (event) => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setURL(event.target.value)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setURL('')
      setMessage(`A new blog ${title} by ${author} added.`)
      setTone('p')
    } catch (exception) {
      setMessage('Incorrect form input')
      setTone('n')
    } finally {
      setTimeout(() => {
        setMessage(null)
        setTone('')
      }, 5000)
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

  return (
    <div>
      <Notification message={errorMessage} tone={notificationTone} />
      {!user && <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <h2> create new </h2>
        <BlogForm addBlog={addBlog} onTitleChange={handleTitleChange} onAuthorChange={handleAuthorChange} onURLChange={handleURLChange} url={url} author={author} title={title} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App