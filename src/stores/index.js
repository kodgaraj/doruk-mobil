import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./auth"
import pushTokenReducer from "./pushToken"

export default configureStore({
	reducer: {
		auth: authReducer,
		pushToken: pushTokenReducer,
	},
})