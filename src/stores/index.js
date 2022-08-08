import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./auth"
import pushTokenReducer from "./pushToken"
import webViewUrlReducer from "./webViewUrl"

export default configureStore({
	reducer: {
		auth: authReducer,
		pushToken: pushTokenReducer,
		webViewUrl: webViewUrlReducer,
	},
})