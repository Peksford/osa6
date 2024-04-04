import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  notificationHide,
  notificationShow,
  setNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    //dispatch(notificationShow(`you created an anecdote '${content}'`))

    //setTimeout(() => dispatch(notificationHide('')), 5000)
    dispatch(setNotification(`new anecdote '${content}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
      <div style={{ margin: '16px 0' }}></div>
    </div>
  )
}

export default AnecdoteForm
