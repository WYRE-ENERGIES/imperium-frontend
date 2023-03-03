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
      const {
        email,
        tokens: { access, refresh },
      } = action.payload
      state.isLoggedIn = true
      state.token = access
      saveToLocalStorage('access', access)
      saveToLocalStorage('refresh', refresh)
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
