import { createSlice } from '@reduxjs/toolkit'

export const pushToken = createSlice({
	name: 'pushToken',
	initialState: {
		pushToken: null
	},
	reducers: {
		setPushToken: (state, action) => {
			state.pushToken = action.payload;
		},
		getPushToken: state => {
			state.pushToken = null;
		},
	}
})

export default pushToken.reducer

// Actions

export const { setPushToken, getPushToken } = pushToken.actions

