import { apiSlice } from '../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const BASE_BATTERY_URL = '/imperium-client/battery/'

export const clientBatteryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatteryTableData: builder.query({
      query: ({ page, search, deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${BASE_BATTERY_URL}list-table/${clientId}/${deviceId}/?page=${page}`

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
      query: ({ deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')

        return {
          url: `${BASE_BATTERY_URL}analytics/${clientId}/${deviceId}/`,
        }
      },
    }),
  }),
})

export const { useGetBatteryTableDataQuery, useGetBatteryPageAnalyticsQuery } =
  clientBatteryApiSlice
