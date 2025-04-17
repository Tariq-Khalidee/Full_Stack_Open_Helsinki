import { useState } from 'react'
import ShowPersons from './components/ShowPersons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    )
    

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = (newFilter.trim()
  ? persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.trim().toLowerCase())
    )
  : persons)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown using: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          Name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPersons persons={personsToShow}/>
    </div>
  )
}

export default App