import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const userFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')) : null

const preloadedState = {	
	auth: {
		user: userFromLocal,
		searchedUser: {},
  	users: []
	}
}

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState
})

export default store