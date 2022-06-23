import { createSlice } from '@reduxjs/toolkit'
import Storage from '../utils/SecureStore'
import axios from "../utils/Axios";

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
		const parsedUser = JSON.parse(user)
		dispatch(setUser(parsedUser))
		console.log("oturum kontrolü", parsedUser.jwt)
		axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.jwt}`
	}
	return user
}

const login = user => async dispatch => {
	dispatch(setUser(user))
	axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwt}`
	return await Storage.setStorage('user', user);
}

const logout = () => async dispatch => {
	dispatch(clearUser())
	axios.defaults.headers.common['Authorization'] = null
	return await Storage.removeStorage('user');
}

export { login, logout, oturumKontrol }
