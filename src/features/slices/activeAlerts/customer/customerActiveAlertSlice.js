import { apiSlice } from '../../../api/apiSlice'

const BASE_URL = 'imperium-client/active-alert/'

export const activerAlertsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCustomerActiveAlerts: build.query({
      query: ({ client_id, shs_id, page, status }) => {
        let url = `${BASE_URL}table/${client_id}/${shs_id}/?page=${page}`
        if (status) {
          url += `&status=${status}`
        }

        return url
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response,
    }),
  }),
})

export const { useGetCustomerActiveAlertsQuery } = activerAlertsSlice
