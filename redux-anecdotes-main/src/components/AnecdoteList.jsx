import { increaseLike, increaseVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  notificationShow,
  notificationHide,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes }) => {
  console.log('testing anecdotes', anecdotes)

  if (!anecdotes) {
    return null
  }

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
