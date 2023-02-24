import authReducer from './features/slices/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import supportReducer from './features/slices/supportSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    support: supportReducer,
  },
})
