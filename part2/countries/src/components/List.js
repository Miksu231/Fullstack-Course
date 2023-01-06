const List = (props) => {
	if (props.list.length > 10) {
		return (
			<div>
				<p>Too many countries, specify another filter</p>
			</div>
		)
	} else if (props.list.length > 1) {
		return (
			<div>
				<ul>
					{props.list.map((country, index) => <li key={index}>{country.name.common}</li>)}
				</ul>
			</div>
		)
	} else if (props.list.length === 1) {
		const country = props.list[0]
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>capital {country.capital}</p>
				<p>area {country.area}</p>
				<b>languages</b>
				<ul>
					{Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
				</ul>
				<img src={country.flags.png} alt='The flag of {country.name.common}'/>
			</div>
			)
	} else return (<div><p>No countries found</p></div>)
}
export default List