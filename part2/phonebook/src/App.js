import { useState } from 'react'
import Name from './components/Name.js'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')

  const [search, changeSearch] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    changeSearch(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
    }
  }
  let list = (search === '') ? persons : persons.filter(person => {
    return person.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with a <input value={search} onChange={handleSearch} /></div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {list.map(person => <Name key={person.id} content={person.name} number={person.number}/>)}
      </ul>
    </div>
  )
}

export default App