import { useState } from 'react'

const genRandom = (size) => {
  return Math.floor(Math.random() * size)
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState({
    quote: 0, votes: [0, 0, 0, 0, 0, 0, 0]
  })

  const mostPopular = selected.votes.indexOf(Math.max.apply(Math, selected.votes)) 

  const addVote = (number) => {
    const newVoteArray = selected.votes
    newVoteArray[number] = newVoteArray[number] + 1
    const newVotes = { ...selected, votes: newVoteArray}
    setSelected(newVotes)
  }

  const number = genRandom(7)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[number]}<br />
      has {selected.votes[number]} votes <br />
      <Button handleClick={() => addVote(number)} text='vote' />
      <Button handleClick={() => setSelected({ ...selected, quote: number })} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostPopular]}<br />
      {selected.votes[mostPopular]}
    </div>
  )
}

export default App