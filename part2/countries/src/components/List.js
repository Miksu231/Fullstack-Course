import Country from './Country.js'
import Button from './Button.js'

const List = ({list, weather, updateWeather, updateState, apiKey }) => {

	const showCountry = (country) => {
		updateState([country])
	}

	if (list.length > 10) {
		return (
			<div>
				<p>Too many countries, specify another filter</p>
			</div>
		)
	} else if (list.length > 1) {
		return (
			<div>
				<ul>
					{list
						.map((country, index) => <li key={index}>{country.name.common}<Button text='show' handleClick={() => showCountry(country)} /> </li>)}
				</ul>

			</div>
		)
	} else if (list.length === 1) {
		return (
			<Country country={list[0]} weather={weather} setWeather={updateWeather} apiKey={apiKey}/>
		)
	} else {
		return (<div><p>No countries found</p></div>)
	}
}
export default List