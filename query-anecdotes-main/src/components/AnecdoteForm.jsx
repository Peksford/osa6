import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
        notificationDispatch({
          type: 'CREATE',
          payload: `anecdote '${anecdote.content}' created`,
        })
      setTimeout(
        () =>
          notificationDispatch({
            type: 'HIDE',
          }),
        5000
      )
    },
    onError: () => {
      notificationDispatch({
        type: 'ERROR',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(
        () =>
          notificationDispatch({
            type: 'HIDE',
          }),
        5000
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
