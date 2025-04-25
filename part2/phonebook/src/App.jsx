import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)   
  const hook = () => {
    console.log('effect function')

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    
  }
  
  useEffect(hook, [])
  
  const handleAddPerson = (event) => {
    event.preventDefault()
    
    const personExists = persons.find(
    (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    )
    console.log(personExists)
    const personObjectNumber = {
      ...personExists, 
      number: newNumber,
    }
    const personObject ={
      name: newName,
      number: newNumber
    }
   
    if (personExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with new one?`
      )
      if (confirmUpdate) {
        personService
          .update(personExists.id, personObjectNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personExists.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotificationMsg({text:`Info with name ${newName} has already been removed from server`, type: 'error' })
            setTimeout(() => setNotificationMsg(null), 5000)
            setPersons(persons.filter(person => person.id !== personExists.id))
          })
        }
        setNotificationMsg({text: `Changed ${newName}'s number`, type: 'success'})
        setTimeout(() => setNotificationMsg(null), 5000)
        return
    }

    
    console.log(personObject)
    personService
      .create(personObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNotificationMsg({text:`Added ${newName}`, type: 'success'})
        setNewName('')
        setNewNumber('')
        setTimeout(() => setNotificationMsg(null), 5000)
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prevPersons => {
            const updated = prevPersons.filter(p => p.id !== id)
            setNotificationMsg({text:`Removed ${name} from server`, type:'success'})
            setTimeout(() => setNotificationMsg(null), 5000)
            return updated
          })          
        })
        .catch(error => {
          setNotificationMsg({text:`Failed to delete ${name}. Maybe already removed`, type: 'error' })
          setTimeout(() => setNotificationMsg(null), 5000)
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg}/>
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
      <Persons persons={personsToShow} deleteHandler={handleDelete}/>
    </div>
  )
}

export default App