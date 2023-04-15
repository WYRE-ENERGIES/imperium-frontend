import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithPermissionCheck } from './baseQuery'

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
