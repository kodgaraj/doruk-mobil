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
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwt}`

			const sonuc = await axios.post('/api/oturumKontrol', {
				user: user
			});

			if (sonuc.data.durum) {
				dispatch(setUser(user))
			}
			else {
				logout()
			}
		} catch (e) {
			console.log(e, 'error')
			logout()
		}
	}
	return user
}

const login = user => async dispatch => {
	dispatch(setUser(user))
	axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwt}`
	return await Storage.setStorage('user', user);
}

const logout = () => async (dispatch, getState) => {
	const { user } = getState().auth;
	if (user) {
		try {
			await axios.post("/api/cikis", {
				kullaniciId: user.id
			});
		}
		catch (e) {
			console.log(e, 'error')
			console.log(e.response.data)
		}
	}
	dispatch(clearUser())
	axios.defaults.headers.common['Authorization'] = null
	return await Storage.removeStorage('user');
}

export { login, logout, oturumKontrol }
