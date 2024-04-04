import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

{
  /*const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'INCREASE':
      return state.map(anecdote => 
        anecdote.id === action.id
        ? { ...anecdote, votes: anecdote.votes + 1}
        : anecdote
        )
    case 'ADD_ANECDOTE':
      return [...state, action.payload]
  }
  return state
}

*/
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    //    createAnecdote(state, action) {
    //      const content = action.payload
    //      console.log("TESTITITTI", content)
    //      state.push({
    //        content: content.content,
    //        votes: 0,
    //        id: content.id
    //      })
    //    },
    increaseLike(state, action) {
      const id = action.payload
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

{
  /*
export const increaseLike = (id) => {
  return {
    type: 'INCREASE',
    id
  }
}
*/
}

{
  /*
export const createAnecdote = (content) => { return {
    type: 'ADD_ANECDOTE',
    payload: {
      content,
      votes: 0,
      id: getId()
    }
  }
}
*/
}
export const { appendAnecdote, setAnecdotes, increaseLike } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const increaseVote = (anecdote) => {
  return async (dispatch) => {
    const voting = await anecdoteService.addVote(anecdote)
    dispatch(increaseLike(voting.id))
  }
}

export default anecdoteSlice.reducer
