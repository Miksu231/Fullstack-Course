import Country from './Country.js'
import Button from './Button.js'

const List = (props) => {

	const showCountry = (country) => {
		props.updateState([country])
	}

	if (props.list.length > 10) {
		return (
			<div>
				<p>Too many countries, specify another filter</p>
			</div>
		)
	} else if (props.list.length > 1) {
		console.log(props.list)
		return (
			<div>
				<ul>
					{props.list
					.map((country, index) => <li key={index}>{country.name.common}<Button text='show' handleClick={() => showCountry(country)} /> </li>)}
				</ul>

			</div>
		)
	} else if (props.list.length === 1) {
		return (
			<Country country={props.list[0]} />
		)
	} else {
		return (<div><p>No countries found</p></div>)
	}
}
export default List