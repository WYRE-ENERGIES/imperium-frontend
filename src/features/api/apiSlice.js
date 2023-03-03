import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getItemFromLocalStorage } from '../../utils/helpers'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getItemFromLocalStorage('access')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'Support',
    'SupportAnalytics',
    'Users',
    'Customers',
    'CustomersAnalytics',
  ],
  endpoints: (builder) => ({}),
})
