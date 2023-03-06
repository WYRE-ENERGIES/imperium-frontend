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
        const results = response.results.slice(0, 3).map((alerts) => ({
          ...alerts,
          key: alerts.id,
        }))
        return results
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
    }),
    getAdminActiveAlertsStatistics: build.query({
      query: () => {
        return `${BASE_URL}statistics/`
      },
      transformResponse: (response, meta, arg) => {
        return response[0]
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAdminActiveAlertsTable: build.query({
      query: () => {
        return `${BASE_URL}table/`
      },
      transformResponse: (response, meta, arg) => {
        const results = response.results.map((tabledata) => ({
          ...tabledata,
          key: tabledata.id,
        }))
        return results
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
    }),
  }),
})

export const {
  useGetAdminActiveAlertsQuery,
  useGetAdminActiveAlertsAnalyticsQuery,
  useGetAdminActiveAlertsStatisticsQuery,
  useGetAdminActiveAlertsTableQuery,
  useCreateAdminActiveAlertsMutation,
} = activerAlertsSlice