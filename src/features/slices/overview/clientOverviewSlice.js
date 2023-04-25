import { apiSlice } from '../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const OVERVIEW_URL_PATH = '/imperium-client/overview/'

export const clientOverviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientOverviewAnalytics: builder.query({
      query: ({ filterBy }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${OVERVIEW_URL_PATH}analytics/${clientId}?order_by=${filterBy}`,
        }
      },
    }),
    getClientOverviewSolarHouseData: builder.query({
      query: ({ filterBy, page }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${OVERVIEW_URL_PATH}solar-house-system/${clientId}/?order_by=${filterBy}&page=${page}`,
        }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list, index) => ({
          ...list,
          key: `${list.device_name}-${index}`,
        }))

        return response
      },
    }),
    getClientOverviewEnergyData: builder.query({
      query: ({ filterBy }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${OVERVIEW_URL_PATH}energy-generated-consumption/${clientId}/?order_by=${filterBy}`,
        }
      },
      transformResponse: (response) => {
        const energyGenerated = {
          name: 'Energy Generated',
          data: [],
        }
        const energyConsumed = {
          name: 'Energy Consumed',
          data: [],
        }

        Object.values(response.results[0]).forEach((stat, index) => {
          if (index < 12) {
            const { energy_generated, energy_consumed } = stat
            energyGenerated.data.push(Math.floor(energy_generated) ?? 0)
            energyConsumed.data.push(Math.floor(energy_consumed) ?? 0)
          }
        })

        return [energyGenerated, energyConsumed]
      },
    }),
    getMapData: builder.query({
      query: () => {
        const clientId = getItemFromLocalStorage('current_client')
        return { url: `${OVERVIEW_URL_PATH}map/${clientId}` }
      },
    }),
  }),
})

export const {
  useGetClientOverviewAnalyticsQuery,
  useGetClientOverviewSolarHouseDataQuery,
  useGetClientOverviewEnergyDataQuery,
  useGetMapDataQuery,
} = clientOverviewSlice
