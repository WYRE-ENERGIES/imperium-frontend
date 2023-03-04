import {
  removeItemFromLocalStorage,
  saveToLocalStorage,
} from '../../../utils/helpers'

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
      const { user_info, token } = action.payload
      state.isLoggedIn = true
      state.token = token
      saveToLocalStorage('access', token)
      // There's no refresh token from the swagger doc and the response object keys were changed
      // saveToLocalStorage('refresh', refresh)
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
      removeItemFromLocalStorage('access')
      removeItemFromLocalStorage('refresh')
    },
  },
})

export const { loginUser, logOutUser } = authSlice.actions
export default authSlice.reducer
