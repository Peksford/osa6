import { filterChange } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './AnecdoteList'

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterWord = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filterWord.toLowerCase())
  )

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const searchedWord = event.target.value
    dispatch(filterChange(searchedWord))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
      <AnecdoteList anecdotes={filteredAnecdotes} />
    </div>
  )
}

export default Filter
