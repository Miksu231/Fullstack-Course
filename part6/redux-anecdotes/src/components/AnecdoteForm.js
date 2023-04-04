import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { addMessage, removeMessage } from '../reducers/notificationReducer'
const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.text.value
		event.target.text.value = ''
		dispatch(addNew(content))
		dispatch(addMessage(`Created new anecdote ${content}`))
		setTimeout(() => {
			dispatch(removeMessage())
		}, 5000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='text'/></div>
				<button type='submit' >create</button>
			</form>
		</div>
	)
}
export default AnecdoteForm