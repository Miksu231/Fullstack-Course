import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteVoted = state.find(n => n.id === id)
      const newAnecdote = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote).sort((a, b) => { return b.votes - a.votes })
    },
    addNew(state, action) {
      state.push(asObject(action.payload))
    }
	}
})
export const { addVote, addNew } = anecdoteSlice.actions
export default anecdoteSlice.reducer