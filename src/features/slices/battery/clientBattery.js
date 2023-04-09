import { apiSlice } from '../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const BASE_BATTERY_URL = '/imperium-client/battery/'

export const clientBatteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatteryTableData: builder.query({
      query: ({ page, search, deviceId, filterBy }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${BASE_BATTERY_URL}list-table/${clientId}/${deviceId}/?page=${page}`

        if (search) {
          url += `&search=${search}`
        }

        if (filterBy && filterBy !== 'yearly') {
          url += `&order_by=${filterBy}`
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
      query: ({ deviceId, filterBy }) => {
        const clientId = getItemFromLocalStorage('current_client')

        let url = `${BASE_BATTERY_URL}analytics/${clientId}/${deviceId}/`

        if (filterBy && filterBy !== 'yearly') {
          url += `&order_by=${filterBy}`
        }

        return { url }
      },
    }),
  }),
})

export const { useGetBatteryTableDataQuery, useGetBatteryPageAnalyticsQuery } =
  clientBatteryApiSlice
