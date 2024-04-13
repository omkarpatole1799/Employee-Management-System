import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    showNotification: null,
    message: null
  },
  reducers: {
    showNotification(state, action) {
      console.log(action.payload)
      state.showNotification = true
      state.message = action.payload
    },

    hideNotification(state, action) {
      state.showNotification = null
      state.message = null
    }
  }
})
export const notifcationActions = notificationSlice.actions

export default notificationSlice
