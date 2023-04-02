import { apiSlice } from '../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const BASE_ENERGY_URL = '/imperium-client/energy/'

export const energyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientEnergyTableData: builder.query({
      query: ({ page, search, filterBy = 'yearly', deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${BASE_ENERGY_URL}list-table/${clientId}/${deviceId}?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list) => ({
          ...list,
          key: list.date,
        }))

        return response
      },
    }),
    getClientEnergyAnalytics: builder.query({
      query: ({ deviceId, filterBy = 'yearly' }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${BASE_ENERGY_URL}analytics/${clientId}/${deviceId}/?order_by=${filterBy}`,
        }
      },
    }),
    getClientEnergyStat: builder.query({
      query: ({ deviceId, filterBy = 'yearly' }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${BASE_ENERGY_URL}capacity-statistics/${clientId}/${deviceId}/?order_by=${filterBy}`,
        }
      },
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

        Object.values(res).forEach((result) => {
          const { energy_consumed, energy_generated } = result
          energyConsumed.data.push(Math.round(energy_consumed) ?? 0)
          energyGenerated.data.push(Math.round(energy_generated) ?? 0)
        })

        return {
          energyConsumed,
          energyGenerated,
        }
      },
    }),
  }),
})

export const {
  useGetClientEnergyTableDataQuery,
  useGetClientEnergyAnalyticsQuery,
  useGetClientEnergyStatQuery,
} = energyApiSlice
