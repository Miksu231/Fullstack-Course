import { useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather.js'

const Country = ({ setWeather, country, apiKey, weather }) => {

	useEffect(() => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}`).then(response => {
			setWeather([response.data])
		})
	}, [])

	if (weather.length === 0) {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<b>languages</b>
			<ul>
				{Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
			</ul>
			<img src={country.flags.png} alt='The flag of {country.name.common}' />
			</div>
			)
	} else {
		return(
			<div>
				<h2>{country.name.common}</h2>
				<p>capital {country.capital}</p>
				<p>area {country.area}</p>
				<b>languages</b>
				<ul>
					{Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
				</ul>
				<img src={country.flags.png} alt='The flag of {country.name.common}' />
				<Weather country={country} weather={weather} />
			</div>
		)
	}
}
export default Country