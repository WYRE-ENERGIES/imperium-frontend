import { apiSlice } from '../api/apiSlice'
import { getItemFromLocalStorage } from '../../utils/helpers'

const BASE_PANEL_URL = '/imperium-admin/panel/'
const BASE_CLIENT_URL = '/imperium-client/panel/'

export const panelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPanelTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_PANEL_URL}list-table/?page=${page}`
        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list, index) => ({
          ...list,
          key: index,
        }))

        return response
      },
    }),
    getPanelPageAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_PANEL_URL}analytics/?order_by=${filterBy}`,
      }),
    }),
    getClientPanelTableData: builder.query({
      query: ({ page, search, filterBy, deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${BASE_CLIENT_URL}list-table/${clientId}/${deviceId}/?page=${page}&order_by=${filterBy}`

        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list, index) => ({
          ...list,
          key: index,
        }))

        return response
      },
    }),
    getClientPanelPageAnalytics: builder.query({
      query: ({ filterBy, deviceId }) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${BASE_CLIENT_URL}analytics/${clientId}/${deviceId}/`,
        }
      },
    }),
    exportPanelData: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_PANEL_URL}list-table/export/?order_by=${filterBy}`,
      }),
    }),
  }),
})

export const {
  useGetPanelTableDataQuery,
  useGetPanelPageAnalyticsQuery,
  useGetClientPanelTableDataQuery,
  useGetClientPanelPageAnalyticsQuery,
  useExportPanelDataQuery,
} = panelApiSlice
