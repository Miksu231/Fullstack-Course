import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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
    } catch (exception) {
      setErrorMessage('Incorrect credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedUser')
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
      <Notification message={errorMessage} />
      {!user && <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App