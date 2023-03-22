import {
  removeItemFromLocalStorage,
  saveToLocalStorage,
} from '../../../utils/helpers'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null,
  currentClientId: null,
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
      saveToLocalStorage('userInfo', user_info)
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
      removeItemFromLocalStorage('access')
      removeItemFromLocalStorage('refresh')
      removeItemFromLocalStorage('userInfo')
      removeItemFromLocalStorage('weather_info')
    },
    switchClient: (state, { payload }) => {
      state.currentClientId = payload
      saveToLocalStorage('current_client', payload)
    },
  },
})

export const { loginUser, logOutUser, switchClient } = authSlice.actions
export default authSlice.reducer
