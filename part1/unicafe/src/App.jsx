import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? `${value} %` : value}</td>
    </tr>
  )
}

const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
const Statistics = (props) => {
  const {good,neutral,bad} = props
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100  

  if (total === 0) {
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average.toFixed(1)}/>
        <StatisticLine text="positive" value={positive.toFixed(1)}/>
      </tbody>
    </table>
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