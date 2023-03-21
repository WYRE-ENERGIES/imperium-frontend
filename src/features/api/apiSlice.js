import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getItemFromLocalStorage } from '../../utils/helpers'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getItemFromLocalStorage('access')
      if (token) {
        headers.set(
          'authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwMTYyMDI2LCJpYXQiOjE2NzkyOTgwMjYsImp0aSI6IjFiZmYzMjE3NzU4MTQxNzc5YjFmN2E2MTQ3NjhmMzQyIiwidXNlcl9pZCI6IjVjYjhmMDIxLTU2MzEtNDNkNy05ZjgxLWExOTMwZjhlNzdiZSJ9.FBmROrDc_crXGVtMG_D7iDk6JVYZWuVAyinHTrtycpY`,
        )
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
    'ActiveAlerts',
    'ShsList',
    'ActiveAlertsAnaylytics',
    'ClientSupport',
  ],
  endpoints: (builder) => ({}),
})
