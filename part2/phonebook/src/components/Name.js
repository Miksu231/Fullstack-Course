import nameService from '../services/nameService.js'

const Name = ({ content, number, stateChange, state, id, setTone, setMessage}) => {
	const deleteName = (event) => {
		event.preventDefault()
		if (window.confirm(`Delete ${content} ?`)) {
			nameService.deleteName(id).then(response => {
				stateChange(state.filter(n => n.id !== id))
				setMessage(`Deleted ${content}`)
				setTone('p')
			})
			.catch(error => {
				setMessage(`${content} was already deleted from the server`)
				setTone('n')
			})
			.finally(() => {
				setTimeout(() => {
					setMessage(null)
					setTone('')
				}, 5000)
			})
		}
	}
	return (
		<div>
			<li>{content + ' ' + number + ' '}<button onClick={deleteName}>delete</button></li>
		</div>
	)
}
export default Name