import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

{
  /*
export const filterReducer = (state = initialState, action) => {
    console.log("testing action", action)
      switch (action.type) {
        case 'SET_FILTER':
          return action.filter
        default:
          return state
      }
    }

  export const filterChange = filter => {
      return {
        type: 'SET_FILTER',
        filter,
      }
    }

  */
}
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
