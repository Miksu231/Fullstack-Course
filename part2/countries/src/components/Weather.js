const Weather = (props) => {
	return (
		<div>
			<h3>Weather in {props.country.capital}</h3>
			temperature {(props.weather[0].main.temp - 273.15).toFixed(2)} Celsius
			<img src={`http://openweathermap.org/img/wn/${props.weather[0].weather[0].icon}@2x.png`} alt='Current weather icon' />
			<br />
			wind {props.weather[0].wind.speed} m/s
		</div>
	)
}
export default Weather