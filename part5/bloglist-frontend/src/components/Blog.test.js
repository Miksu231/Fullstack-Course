import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('Renders title and author, but not url or likes', () => {

  const user = {
    username: "User",
    token: "abcdefghijklmnopqrstuvwxyz"
  }
  const blog = {
    title: 'Testing blog title',
    author: 'Test author',
    url: 'someTestURL',
    likes: 10,
    creator: user
  }

  const likeButton = jest.fn()
  const removeButton = jest.fn()

  render(<Blog blog={blog} handleLike={likeButton} handleRemove={removeButton} user={user} />)
  const title = screen.queryByText('Testing blog')
  const author = screen.queryByText('Test author')
  const details = screen.findByLabelText('details').blog
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(details).not.toBeDefined()
  
})
test('Likes and url are shown after opening', async () => {

  const user = {
    username: "User",
    token: "abcdefghijklmnopqrstuvwxyz"
  }
  const blog = {
    title: 'Testing blog title',
    author: 'Test author',
    url: 'someTestURL',
    likes: 10,
    creator: user
  }

  const likeButton = jest.fn()
  const removeButton = jest.fn()

  const event = userEvent.setup()

  render(<Blog blog={blog} handleLike={likeButton} handleRemove={removeButton} user={user} />)
  const title = screen.queryByText('Testing blog')
  const author = screen.queryByText('Test author')
  const open = await screen.findByLabelText('open')
  await event.click(open) 
  const url = screen.queryByText('someTestURL')
  const likes = screen.queryByText('likes 10')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  
})
test('Liking twice updates event handler twice', async () => {

  const user = {
    username: "User",
    token: "abcdefghijklmnopqrstuvwxyz"
  }
  const blog = {
    title: 'Testing blog title',
    author: 'Test author',
    url: 'someTestURL',
    likes: 10,
    creator: user
  }

  const likeButton = jest.fn()
  const removeButton = jest.fn()

  const event = userEvent.setup()

  render(<Blog blog={blog} handleLike={likeButton} handleRemove={removeButton} user={user} />)

  const open = await screen.findByLabelText('open')
  await event.click(open)
  const like = await screen.findByLabelText('like')
  await event.click(like)
  await event.click(like)
  expect(likeButton.mock.calls).toHaveLength(2)
})