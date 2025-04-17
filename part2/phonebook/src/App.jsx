import { useState } from 'react'
import Names from './components/Names'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName
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
      console.log(persons)

  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons}/>
      
    </div>
  )
}

export default App