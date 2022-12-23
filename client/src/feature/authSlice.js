import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from '../network'

const localUser = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
	user: localUser ? localUser : null,
	isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  searchedUser: {},
  users: []
}

// user register
export const registerUser = createAsyncThunk('auth/registerUser', async(userData, thunkAPI)=>{
  console.log(userData)
  try{
		const { data } = await url.post('/api/auth/register', userData)
		return data
	} catch(error) {
		 const message = error.response.data
     console.log(error)
     return thunkAPI.rejectWithValue(message)
	}
})

// user login
export const loginUser = createAsyncThunk('auth/loginUser', async(userData, thunkAPI)=>{
  try{
		const { data } = await url.post('/api/auth/login', userData)
		return data
	} catch(error) {
		const message = error.response.data

    return thunkAPI.rejectWithValue(message)
	}
})

export const refreshToken = createAsyncThunk('/auth/refreshToken', async(tokenData, thunkAPI)=>{
  try{
    const { data } = await url.post('/api/auth/refreshtoken', tokenData)
    console.log(data)
    return data
  }catch(error){
    const message = error.response.data

    return thunkAPI.rejectWithValue(message)
  }
})

// search user
export const searchuser = createAsyncThunk('users/searchUser', async({users, id, token}, thunkAPI)=>{
  try{    
    const { data } = await url.get(`/api/search/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })           
      
    return data
  } catch(error) {
    const message = error.response.data
    console.log(error)
    return thunkAPI.rejectWithValue(message)
  }
 
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut(){
			localStorage.removeItem('userInfo')
      window.location.replace('/')
		},
    resetSearchUser(state){
      state.searchedUser = {}
    },
    followUser(state, {payload}){
      const newUser = { ...state.searchedUser, followers: [...state.searchedUser.followers, payload.user] }   
      state.searchedUser = newUser
      //state.searchedUser.followers.push(payload.user)
      state.user.following.push(payload.searchedUser)                              
    },
    unFollowUser(state, {payload}){        
      state.searchedUser.followers.pop(payload.user)                
      state.user.following.pop(payload.searchedUser)              
    }
	},
	extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
        if(payload) localStorage.setItem('userInfo', JSON.stringify(payload))      
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = payload
      })
      .addCase(loginUser.pending, (state)=>{
      	state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
        if(payload) {
          localStorage.setItem('userInfo', JSON.stringify(payload))
        }
      })
      .addCase(loginUser.rejected, (state, {payload})=>{
      	state.isLoading = false
        state.isError = true
        state.user = null
        state.message = payload
      })  
      .addCase(refreshToken.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
        if(payload) localStorage.setItem('userInfo', JSON.stringify(payload))
      })
      .addCase(searchuser.pending, (state)=>{
        state.loading = true
      })
      .addCase(searchuser.fulfilled, (state, { payload })=>{          
        state.loading = false     
        state.searchedUser = payload
        if(state.users.every(user=>user._id !== payload._id)){                  
          state.users.push(payload)     
        }
      })
    }
})

export const { logOut, followUser, unFollowUser, resetSearchUser } = authSlice.actions
export default authSlice.reducer