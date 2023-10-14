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
        const currentDateMonth = new Date().getMonth() + 1
        Object.values(res).forEach((result, index) => {
          const { energy_consumed, energy_generated, capacity } = result

          if (index + 1 > currentDateMonth) {
            energyConsumed.data.splice(
              index - currentDateMonth,
              0,
              energy_consumed ?? 0,
            )
            energyGenerated.data.splice(
              index - currentDateMonth,
              0,
              energy_generated ?? 0,
            )
            energyDifference.data.splice(
              index - currentDateMonth,
              0,
              Math.round(energy_generated - energy_consumed) ?? 0,
            )
          } else {
            energyConsumed.data.push(Math.round(energy_consumed) ?? 0)
            energyGenerated.data.push(Math.round(energy_generated) ?? 0)
            energyDifference.data.push(
              Math.round(energy_generated - energy_consumed) ?? 0,
            )
          }
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
