import authServices from '../services/auth.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
