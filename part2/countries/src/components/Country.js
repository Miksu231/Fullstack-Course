const Country = (props) => {
	return (
		<div>
			<h2>{props.country.name.common}</h2>
			<p>capital {props.country.capital}</p>
			<p>area {props.country.area}</p>
			<b>languages</b>
			<ul>
				{Object.values(props.country.languages).map((language, index) => <li key={index}>{language}</li>)}
			</ul>
			<img src={props.country.flags.png} alt='The flag of {props.country.name.common}' />
		</div>
	)
}
export default Country