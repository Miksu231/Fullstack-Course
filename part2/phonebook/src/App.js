import { useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Persons from './components/Persons.js'
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearch}/>
      <h2>add a new</h2>
      <Form name={newName} number={newNumber} onSubmit={addName} onNumbChange={handleNumberChange} onNameChange={handleNameChange} />
      <h2>Numbers</h2>
      <Persons search={search} list={persons} />
    </div>
  )
}

export default App