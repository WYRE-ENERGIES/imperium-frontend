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
      const { access, refresh } = action.payload
      state.isLoggedIn = true
      state.token = access
      localStorage.setItem('access', JSON.stringify(access))
      localStorage.setItem('refresh', JSON.stringify(refresh))
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
    },
  },
})

export const { loginUser, logOutUser } = authSlice.actions
export default authSlice.reducer
