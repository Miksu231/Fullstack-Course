import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.text.value
		event.target.text.value = ''
		dispatch(addNew(content))
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