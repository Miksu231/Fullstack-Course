import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addMessage, removeMessage } from '../reducers/notificationReducer'
const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(addVote(id))
    dispatch(addMessage(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
	)
}
export default AnecdoteList