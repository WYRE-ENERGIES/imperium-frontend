import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './features/slices/auth/authSlice'
import { apiSlice } from './features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
