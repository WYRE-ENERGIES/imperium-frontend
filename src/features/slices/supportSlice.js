import { apiSlice } from '../api/apiSlice'

const token = process.env.REACT_APP_ADMIN_TOKEN
const BASE_SUPPORT_URL = '/imperium-admin/list-support-tickets/'

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

        return {
          url,
          headers: {
            authorization: `Bearer ${token}`,
          },
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
      providesTags: ['Support'],
    }),
    getSupportPageAnalytics: builder.query({
      query: () => ({
        url: `${BASE_SUPPORT_URL}analytics/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      transformErrorResponse: (error) => transformError(error),
      providesTags: ['SupportAnalytics'],
    }),
    resolveTicket: builder.mutation({
      query: (data) => ({
        url: `${BASE_SUPPORT_URL}resolve/`,
        method: 'POST',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Support', 'SupportAnalytics'],
    }),
  }),
})

export const {
  useGetAdminSupportTicketsQuery,
  useGetSupportPageAnalyticsQuery,
  useResolveTicketMutation,
} = supportApiSlice
