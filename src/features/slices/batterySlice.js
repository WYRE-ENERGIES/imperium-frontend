import { apiSlice } from '../api/apiSlice'

const BASE_BATTERY_URL = '/imperium-admin/battery/'

export const batteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatteryTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_BATTERY_URL}list-table/?page=${page}`
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
      transformResponse: (response) => {
        const badStats = {
          name: 'Bad Battery Status',
          data: [],
        }
        const goodStats = {
          name: 'Good battery status',
          data: [],
        }

        const {
          statistics: [data],
        } = response

        const currentDateMonth = new Date().getMonth() + 1
        Object.values(data).forEach((stat, index) => {
          const { good, bad } = stat
          if (index + 1 > currentDateMonth) {
            goodStats.data.splice(index - currentDateMonth, 0, good ?? 0)
            badStats.data.splice(index - currentDateMonth, 0, bad ?? 0)
          } else {
            goodStats.data.push(good ?? 0)
            badStats.data.push(bad ?? 0)
          }
        })

        return [badStats, goodStats]
      },
    }),
  }),
})

export const {
  useGetBatteryTableDataQuery,
  useGetBatteryPageAnalyticsQuery,
  useGetBatteryStatisticsQuery,
} = batteryApiSlice
