import { apiSlice } from '../api/apiSlice'
import { getItemFromLocalStorage } from '../../utils/helpers'

const BASE_SUPPORT_URL = '/imperium-admin/list-support-tickets/'
const BASE_CLIENT_SUPPORT_URL = '/imperium-client'

const transformError = (error) => {
  let message = 'Internal Server Error..Contact Support'
  switch (error?.status) {
    case 401:
      message = 'Token Expired, Please login'
      break
    default:
      message = 'Internal Server Error..Contact Support'
      break
  }

  return message
}

export const supportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSupportTickets: builder.query({
      query: ({ page, search, ordering }) => {
        let url = `${BASE_SUPPORT_URL}?page=${page}`
        if (search) {
          url += `&search=${search}`
        }

        if (ordering) {
          url += `&ordering=${ordering}`
        }

        return { url }
      },
      transformResponse: (response) => {
        response.results = response.results.map((ticket) => ({
          ...ticket,
          key: ticket.id,
        }))

        return response
      },
      transformErrorResponse: (error) => transformError(error),
      providesTags: ['Support'],
    }),
    getSupportPageAnalytics: builder.query({
      query: () => ({ url: `${BASE_SUPPORT_URL}analytics/` }),
      transformErrorResponse: (error) => transformError(error),
      providesTags: ['SupportAnalytics'],
    }),
    resolveTicket: builder.mutation({
      query: (data) => ({
        url: `${BASE_SUPPORT_URL}resolve/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Support', 'SupportAnalytics'],
    }),

    getClientSupportTickets: builder.query({
      query: (page) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${BASE_CLIENT_SUPPORT_URL}/list-support-ticket/${clientId}?page=${page}`,
        }
      },
      transformResponse: (response) => {
        response.results = response.results.map((ticket) => ({
          ...ticket,
          key: ticket.id,
        }))

        return response
      },
      transformErrorResponse: (error) => transformError(error),
      providesTags: ['ClientSupport'],
    }),
    createSupportTicket: builder.mutation({
      query: (data) => ({
        url: `${BASE_CLIENT_SUPPORT_URL}/support-ticket/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ClientSupport'],
    }),
    updateSupportTicket: builder.mutation({
      query: ({ data, id }) => ({
        url: `${BASE_CLIENT_SUPPORT_URL}/support-ticket/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ClientSupport'],
    }),
    deleteSupportTicket: builder.mutation({
      query: (id) => ({
        url: `${BASE_CLIENT_SUPPORT_URL}/support-ticket/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ClientSupport'],
    }),
  }),
})

export const {
  useGetAdminSupportTicketsQuery,
  useGetSupportPageAnalyticsQuery,
  useResolveTicketMutation,
  useCreateSupportTicketMutation,
  useGetClientSupportTicketsQuery,
  useUpdateSupportTicketMutation,
  useDeleteSupportTicketMutation,
} = supportApiSlice
