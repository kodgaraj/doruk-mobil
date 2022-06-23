import { createSlice } from '@reduxjs/toolkit'

export const loading = createSlice({
	name: 'loading',
	initialState: {
		loading: false,
	},
	reducers: {
		loadingStatus: (state, action) => {
			state.loading = action.payload;
		},
	}
})

export const { loadingStatus } = loading.actions

export default loading.reducer