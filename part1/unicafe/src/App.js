import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  if (props.all === 0) return <div><p>No feedback given</p></div> 
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {props.good}<br />
        neutral {props.neutral}<br />
        bad {props.bad}<br />
        all {props.all}<br />
        average {props.average}<br />
        positive {props.positive} % <br/>
  
      </p>
    </div>
  )
}
function App() {

  const [responses, give_feedback] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const all = (responses.good + responses.neutral + responses.bad)
  const average = (all !== 0) ? ((responses.good * 1) + (responses.bad * -1)) / all: 0
  const positive = (all !== 0) ? (responses.good / all)*100: 0
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => give_feedback({ ...responses, good: responses.good + 1 })} text='good' />
        <Button handleClick={() => give_feedback({ ...responses, neutral: responses.neutral + 1 })} text= 'neutral' />
        <Button handleClick={() => give_feedback({ ...responses, bad: responses.bad + 1 })} text='bad' />
        <Statistics good={responses.good} neutral={responses.neutral} bad={responses.bad} all={all} average={average} positive={positive} />
      </div>
    </>
  );
}

export default App;
