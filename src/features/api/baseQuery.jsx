import React from 'react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItemFromLocalStorage } from '../../utils/helpers'
import { logOutUser } from '../slices/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getItemFromLocalStorage('access')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithPermissionCheck = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions)
  if (response?.error?.status === 403) {
    api.dispatch(logOutUser())
    window.location.reload()
  } else {
    return response
  }
}
