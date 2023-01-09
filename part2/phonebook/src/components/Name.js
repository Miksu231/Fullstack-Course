import nameService from '../services/nameService.js'

const Name = ({ content, number, stateChange, state, id}) => {
	const deleteName = (event) => {
		event.preventDefault()
		if (window.confirm(`Delete ${content} ?`)) {
			nameService.deleteName(id).then(response => {
				stateChange(state.filter(n => n.id !== id))
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