import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage(state, action) {
      const message = action.payload
      return state = message
    },
    removeMessage(state, action) {
       return state = ''
		}
  }
})
export const { addMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer