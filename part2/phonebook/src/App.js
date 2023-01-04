import { useState } from 'react'
import Name from './components/Name.js'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  

  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) alert(`${newName} is already added to phonebook`)
    else {
      setPersons(persons.concat({ name: newName , number: newNumber}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => <Name key={index} content={person.name} number={person.number} />)}
      </ul>
    </div>
  )
}

export default App