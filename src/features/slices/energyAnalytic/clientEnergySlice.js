import { apiSlice } from '../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const BASE_ENERGY_URL = '/imperium-client/energy/'

export const energyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientEnergyTableData: builder.query({
      query: ({ page, search, filterBy = 'yearly', deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${BASE_ENERGY_URL}list-table/${clientId}/${deviceId}/?page=${page}&order_by=${filterBy}`
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

        // Object.values(res).forEach((result) => {
        //   const { energy_consumed, energy_generated } = result
        //   energyConsumed.data.push(Math.round(energy_consumed) ?? 0)
        //   energyGenerated.data.push(Math.round(energy_generated) ?? 0)
        // })

        const currentDateMonth = new Date().getMonth() + 1
        Object.values(res).forEach((result, index) => {
          if (index < 12) {
            const { energy_generated, energy_consumed } = result

            if (index + 1 > currentDateMonth) {
              energyGenerated.data.splice(
                index - currentDateMonth,
                0,
                Math.floor(energy_generated) ?? 0,
              )
              energyConsumed.data.splice(
                index - currentDateMonth,
                0,
                Math.floor(energy_consumed) ?? 0,
              )
            } else {
              energyGenerated.data.push(Math.floor(energy_generated) ?? 0)
              energyConsumed.data.push(Math.floor(energy_consumed) ?? 0)
            }
          }
        })

        // return [energyGenerated, energyConsumed]

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
