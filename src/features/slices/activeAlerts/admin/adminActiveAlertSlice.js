import { apiSlice } from '../../../api/apiSlice'

const BASE_URL = 'imperium-admin/active-alert/'

export const activerAlertsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAdminActiveAlerts: build.query({
      query: ({ page, search }) => {
        let url = `${BASE_URL}?page=${page}`

        if (search) {
          url += `&search=${search}`
        }
        return url
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ['ActiveAlerts'],
    }),
    getAdminActiveAlertsAnalytics: build.query({
      query: () => {
        return `${BASE_URL}analytics/`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ['ActiveAlertsAnaylytics'],
    }),
    getAdminActiveAlertsStatistics: build.query({
      query: ({ filter }) => {
        return `${BASE_URL}statistics/?order_by=${filter}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAdminActiveAlertsTable: build.query({
      query: ({ page, search, status }) => {
        let url = `${BASE_URL}table/?page=${page}`
        if (search) {
          url += `&search=${search}`
        }
        if (status) {
          url += `&status=${status}`
        }
        return url
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAdminActiveAlertsLocation: build.query({
      query: ({ page, search }) => {
        let url = `${BASE_URL}location/?page=${page}`
        if (search) {
          url += `&search=${search}`
        }
        return url
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    createAdminActiveAlerts: build.mutation({
      query: (credentials) => {
        return {
          method: 'POST',
          url: `${BASE_URL}create/`,
          body: credentials,
        }
      },
      invalidatesTags: ['ActiveAlerts', 'ActiveAlertsAnaylytics'],
    }),
    updateAdminActiveAlerts: build.mutation({
      query: ({ alertId, values }) => {
        return {
          method: 'PUT',
          url: `${BASE_URL}edit/${alertId}/`,
          body: values,
        }
      },
      invalidatesTags: ['ActiveAlerts', 'ActiveAlertsAnaylytics'],
    }),
    getShsDetails: build.query({
      query: ({ shs_id }) => {
        return {
          url: `${BASE_URL}detail/${shs_id}`,
        }
      },
    }),
    getDeviceList: build.query({
      query: ({ client_id }) => {
        return {
          url: `${BASE_URL}list-devices/${client_id}`,
        }
      },
    }),
  }),
})

export const {
  useGetExportDataQuery,
  useGetAdminActiveAlertsQuery,
  useGetAdminActiveAlertsAnalyticsQuery,
  useGetAdminActiveAlertsStatisticsQuery,
  useGetAdminActiveAlertsTableQuery,
  useCreateAdminActiveAlertsMutation,
  useUpdateAdminActiveAlertsMutation,
  useGetAdminActiveAlertsLocationQuery,
  useGetShsDetailsQuery,
  useGetDeviceListQuery,
} = activerAlertsSlice
