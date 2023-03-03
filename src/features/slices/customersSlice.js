import { apiSlice } from '../api/apiSlice'

const BASE_CUSTOMERS_URL = '/imperium-admin/list-customers/'

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomersList: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_CUSTOMERS_URL}?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
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
      providesTags: ['Customers'],
    }),
    getCustomerPageAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_CUSTOMERS_URL}analytics/?order_by=${filterBy}`,
      }),
      providesTags: ['CustomersAnalytics'],
    }),
    getCustomerPageStatistics: builder.query({
      query: ({ filterBy }) => ({
        url: `${BASE_CUSTOMERS_URL}statistics/?order_by=${filterBy}`,
      }),
    }),
    activateCustomer: builder.mutation({
      query: (data) => ({
        url: `${BASE_CUSTOMERS_URL}deactivate/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Customers', 'CustomersAnalytics'],
    }),
  }),
})

export const {
  useGetAdminCustomersListQuery,
  useGetCustomerPageAnalyticsQuery,
  useGetCustomerPageStatisticsQuery,
  useActivateCustomerMutation,
} = customerApiSlice
