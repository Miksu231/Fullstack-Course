import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Persons from './components/Persons.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [search, changeSearch] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => { axios.get('http://localhost:3001/persons').then(response => {
     setPersons(response.data)
    })
  }, [])
  
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