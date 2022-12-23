import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../network'

const initialState = {
	loading: false,
	
 }



export const usersSlice = createSlice({
	name: '	users',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
		

	}
})

export const {  } = usersSlice.actions
export default usersSlice.reducer