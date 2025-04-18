import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect function')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
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

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter.trim()
  ? persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.trim().toLowerCase())
    )
  : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={newFilter} handler={handleFilterChange}/>
      <h2>Add a new person</h2>
      <PersonForm 
      submitHandler={handleAddPerson} 
      name={newName} 
      number={newNumber} 
      nameChangeHandler={handlePersonChange} 
      numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App