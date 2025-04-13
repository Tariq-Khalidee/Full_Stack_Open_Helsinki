import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const {good,neutral,bad} = props
  const Total = good + neutral + bad
  const Average = Total === 0 ? 0 : (good - bad) / Total
  const Positive = Total === 0 ? 0 : (good / Total) * 100  

  if (Total === 0) {
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
  }
  return(
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {Total}</p>
      <p>average: {Average}</p>
      <p>positive: {Positive} %</p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad 

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handler={handleGoodClick} text='good'/>
      <Button handler={handleNeutralClick} text='neutral'/>
      <Button handler={handleBadClick} text='bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App