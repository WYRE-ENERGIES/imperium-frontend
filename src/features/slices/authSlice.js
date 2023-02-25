import authServices from '../services/auth.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const userToken = localStorage.getItem('tokien')
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  msg: '',
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authServices.loginUSer(email, password)

      console.log('data', data)
    } catch (error) {
      return thunkAPI.rejectWithValue()
    }
  },
)
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = false
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
