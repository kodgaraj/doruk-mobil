import { createSlice } from '@reduxjs/toolkit'
import Storage from '../utils/secureStore'

export const auth = createSlice({
	name: 'user',
	initialState: {
		user: null
	},
	reducers: {
		setUser: (state, action) => {
			// console.log(action.payload)
			state.user = action.payload;
		},
		clearUser: state => {
			state.user = null;
		},
	}
})

export default auth.reducer

// Actions

const { setUser, clearUser } = auth.actions

const oturumKontrol = () => async dispatch => {
	const user = await Storage.getStorage('user')
	if (user) {
		dispatch(setUser(user))
	}
	return user
}

const login = user => async dispatch => {
	dispatch(setUser(user))
	return await Storage.setStorage('user', user);
}

const logout = () => async dispatch => {
	dispatch(clearUser())
	return await Storage.removeStorage('user');
}

export { login, logout, oturumKontrol }
