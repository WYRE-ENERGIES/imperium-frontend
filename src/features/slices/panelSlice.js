import { apiSlice } from '../api/apiSlice'

const BASE_PANEL_URL = '/imperium-admin/panel/'

export const panelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPanelTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_PANEL_URL}list-table/?page=${page}&order_by=${filterBy}`
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
  }),
})

export const { useGetPanelTableDataQuery, useGetPanelPageAnalyticsQuery } =
  panelApiSlice
