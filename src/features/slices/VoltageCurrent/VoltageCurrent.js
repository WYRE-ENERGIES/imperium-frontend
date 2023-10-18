import { apiSlice } from '../../api/apiSlice'

const BASE_URL = 'imperium-admin/list-voltage/'

export const voltageCurrentSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAdminVoltageCurrentAnalytics: build.query({
      query: ({ filter }) => {
        return `${BASE_URL}analytics/?sort_by=${filter}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAdminVoltageCurrentStatistics: build.query({
      query: () => {
        return `${BASE_URL}statistics/`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response,
    }),
    getAdminVoltageCurrentTable: build.query({
      query: ({ page, search, filter }) => {
        let url = `${BASE_URL}table?page=${page}&order_by=${filter}`
        if (search) {
          url += `&search=${search}`
        }
        if (search) {
          url += `&order_by=${filter}`
        }
        return url
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
})

export const {
  useGetAdminVoltageCurrentAnalyticsQuery,
  useGetAdminVoltageCurrentStatisticsQuery,
  useGetAdminVoltageCurrentTableQuery,
} = voltageCurrentSlice
