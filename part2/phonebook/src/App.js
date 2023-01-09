import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Persons from './components/Persons.js'
import nameService from './services/nameService.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [search, changeSearch] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => { nameService.getAll().then(response => {
     setPersons(response)
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
    if (persons.some(person => person.name === newName)) {
      const current = persons.find(person => person.name === newName)
      const newPerson = { name: newName, number: newNumber, id: current.id }
      if (window.confirm(`${current.name} is already added to phonebook, replace the old number with a new one?`)) {
        nameService.updateNumber(current.id, newPerson).then(response => {
          setPersons(persons.map(person => person.id !== current.id ? person : newPerson))
        })
      }
		}
    else {
      const newPerson = { name: newName, number: newNumber }
      nameService.create(newPerson).then(response => {
        setPersons(persons.concat(response))
			})
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearch}/>
      <h2>add a new</h2>
      <Form name={newName} number={newNumber} onSubmit={addName} onNumbChange={handleNumberChange} onNameChange={handleNameChange} />
      <h2>Numbers</h2>
      <Persons search={search} list={persons} stateChange={setPersons} />
    </div>
  )
}

export default App