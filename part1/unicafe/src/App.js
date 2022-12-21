import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>
          good {props.good}<br />
          neutral {props.neutral}<br />
          bad {props.bad}<br />
      </p>
    </div>
  )
}
function App() {

  const [responses, give_feedback] = useState({
    good: 0, neutral: 0, bad: 0
  })

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => give_feedback({ ...responses, good: responses.good + 1 })} text='good' />
        <Button handleClick={() => give_feedback({ ...responses, neutral: responses.neutral + 1 })} text= 'neutral' />
        <Button handleClick={() => give_feedback({ ...responses, bad: responses.bad + 1 })} text= 'bad' />
        <Statistics good={responses.good} neutral={responses.neutral} bad={responses.bad}/>
      </div>
    </>
  );
}

export default App;
