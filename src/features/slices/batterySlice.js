import { apiSlice } from '../api/apiSlice'

const BASE_BATTERY_URL = '/imperium-admin/battery/'

export const batteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatteryTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_BATTERY_URL}list-table/?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list, index) => ({
          ...list,
          key: `${list.shs_name}-${index}`,
        }))

        return response
      },
    }),
    getBatteryPageAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_BATTERY_URL}analytics/?order_by=${filterBy}`,
      }),
    }),
    getBatteryStatistics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_BATTERY_URL}statistics/?order_by=${filterBy}`,
      }),
    }),
  }),
})

export const {
  useGetBatteryTableDataQuery,
  useGetBatteryPageAnalyticsQuery,
  useGetBatteryStatisticsQuery,
} = batteryApiSlice
