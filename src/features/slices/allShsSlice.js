import { all } from 'axios'
import { apiSlice } from '../api/apiSlice'

const ADMIN_SHS_URL_PATH = '/imperium-admin/shs/'

export const allShsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShsTableData: builder.query({
      query: ({ page, search, filterBy, tableFilter }) => {
        let url = `${ADMIN_SHS_URL_PATH}list-table?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
        }

        if (tableFilter) {
          url += `&device_switch_state__icontains=${tableFilter}`
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
      providesTags: ['ShsList'],
    }),
    getAllShsPageAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${ADMIN_SHS_URL_PATH}analytics/?order_by=${filterBy}`,
      }),
    }),
    deactivateDevice: builder.mutation({
      query: ({ shsId, data }) => ({
        url: `${ADMIN_SHS_URL_PATH}deactivate/${shsId}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ShsList'],
    }),
  }),
})

export const {
  useGetAllShsPageAnalyticsQuery,
  useGetShsTableDataQuery,
  useDeactivateDeviceMutation,
} = allShsSlice
