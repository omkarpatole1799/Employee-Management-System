import { createSlice, configureStore } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: { showNotification: null },
  reducers: {
    showNotification(state, action) {
      state.showNotification = {
        show: true
        // status: action.payload.status,
        // message: action.payload.message
      }
      setTimeout(() => {
        state.showNotification = null
      }, 1500)
    }
  }
})
export const notifcationActions = notificationSlice.actions

export const store = configureStore({
  reducer: notificationSlice.reducer
})
