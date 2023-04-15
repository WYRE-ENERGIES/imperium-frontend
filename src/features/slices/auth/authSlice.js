import { emptyLocalStorage, saveToLocalStorage } from '../../../utils/helpers'
import jwt_decode from 'jwt-decode'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null,
  currentClientId: null,
  user_role: null,
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
      saveToLocalStorage('user_role', jwt_decode(token?.user_role))

      if (action.payload.client) {
        const { client } = action.payload
        state.currentClientId = Object.values(client)[0]
        saveToLocalStorage('current_client', Object.values(client)[0])
      }
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.token = null
      emptyLocalStorage()
    },
    switchClient: (state, { payload }) => {
      state.currentClientId = payload
      saveToLocalStorage('current_client', payload)
    },
  },
})

export const { loginUser, logOutUser, switchClient } = authSlice.actions
export default authSlice.reducer
