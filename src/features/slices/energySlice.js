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
      transformResponse: (response) => {
        const [res] = response
        const energyConsumed = {
          name: 'Energy Consumed',
          data: [],
        }
        const energyGenerated = {
          name: 'Energy Generated',
          data: [],
        }
        const energyDifference = {
          name: 'Energy Difference',
          data: [],
        }

        Object.values(res).forEach((result) => {
          const { energy_consumed, energy_generated, capacity } = result
          energyConsumed.data.push(1234)
          energyGenerated.data.push(1234)
          energyDifference.data.push(1234)
        })

        return {
          energyConsumed,
          energyGenerated,
          energyDifference,
        }
      },
    }),
  }),
})

export const {
  useGetEnergyTableDataQuery,
  useGetEnergyPageAnalyticsQuery,
  useGetEnergyStatisticsQuery,
} = energyApiSlice
