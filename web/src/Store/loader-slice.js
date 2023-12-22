import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
  name: 'loader-slice',
  initialState: { showLoader: false },
  reducers: {
    showLoader(state, action) {
      state.showLoader = true
    },

    hideLoader(state, action) {
      state.showLoader = false
    }
  }
})

export const loaderActions = loaderSlice.actions
export default loaderSlice
