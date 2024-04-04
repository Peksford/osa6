import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContextProvider } from './NotificationContext'
import { getAnecdotes, updateVote } from './requests'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'VOTE',
        payload: `anecdote '${anecdote.content}' voted`,
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

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  {
    /*const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]
*/
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationContextProvider></NotificationContextProvider>
      <Notification />
      <AnecdoteForm />

      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App