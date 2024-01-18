import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './notification-slice'
import loaderSlice from './loader-slice'

const store = configureStore({
	reducer: {
		notification: notificationSlice.reducer,
		loader: loaderSlice.reducer
	}
})

export default store
