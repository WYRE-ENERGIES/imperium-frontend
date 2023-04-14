import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getItemFromLocalStorage } from '../../utils/helpers'
import { baseQueryWithPermissionCheck } from '../../components/baseQuery'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithPermissionCheck,
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
    'CustomerDetails',
    'shsSchedule',
  ],
  endpoints: (builder) => ({}),
})
