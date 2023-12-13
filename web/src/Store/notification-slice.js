import { createSlice, configureStore } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    showNotification: null,
    message: null,
    showLoader: null
  },
  reducers: {
    showNotification(state, action) {
      state.showNotification = true
      state.message = action.payload
    },

    hideNotification(state, action) {
      state.showNotification = null
      state.message = null
    },

    showLoader(state, action) {
      state.showLoader = true
    },

    hideLoader(state, action) {
      state.showLoader = null
    }
  }
})
export const notifcationActions = notificationSlice.actions

export const store = configureStore({
  reducer: notificationSlice.reducer
})
