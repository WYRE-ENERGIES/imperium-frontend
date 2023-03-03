import { apiSlice } from '../api/apiSlice'

const BASE_ENERGY_URL = '/imperium-admin/energy/'

export const energyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnergyTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_ENERGY_URL}?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list) => ({
          ...list,
          key: list.id,
        }))

        return response
      },
    }),
    getEnergyPageAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_ENERGY_URL}analytics/?order_by=${filterBy}`,
      }),
    }),
    getEnergyStatistics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_ENERGY_URL}capacity-statistics/?order_by=${filterBy}`,
      }),
      //   transformResponse: (response) => Object.values(response[0]),
    }),
  }),
})

export const {
  useGetEnergyTableDataQuery,
  useGetEnergyPageAnalyticsQuery,
  useGetEnergyStatisticsQuery,
} = energyApiSlice
