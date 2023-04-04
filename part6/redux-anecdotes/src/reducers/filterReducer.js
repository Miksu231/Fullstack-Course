import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      const filterTerm = action.payload
      return state = filterTerm
		}
	}
})
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer