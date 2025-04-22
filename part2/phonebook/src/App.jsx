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

  const baseURL = 'http://localhost:3002/persons'
  const hook = () => {
    console.log('effect function')
  
    axios
      .get(baseURL)
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
    
  }
  useEffect(hook, [])
  const handleAddPerson = (event) => {
    event.preventDefault()
    const personExists = persons.some(
    (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    )
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    axios
      .post(baseURL, personObject)
      .then(response => {
        console.log('Post response: ',response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        })
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