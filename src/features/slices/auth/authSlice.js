import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.data.access
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
    },
  },
})

export const { loginUser, logOutUser } = authSlice.actions
export default authSlice.reducer
