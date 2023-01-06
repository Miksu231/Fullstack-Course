import Filter from './components/Filter.js'
import List from './components/List.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [search, changeSearch] = useState('')
  const [countries, setCountries] = useState([])
  const handleSearch = (event) => {
    changeSearch(event.target.value)
  }
  // Delay meant to not overload the API with calls, only calls when user has not typed anything for 1 sec.
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios.get('https://restcountries.com/v3.1/all').then(response => {
        const results = response.data.filter(country => { return country.name.common.toLowerCase().includes(search.toLowerCase()) })
        setCountries(results)
      })
  
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [search])
  
  return (
    <div>
      <Filter value={search} onChange={handleSearch} />
      <List list={countries}/>
    </div>
  );
}

export default App;
