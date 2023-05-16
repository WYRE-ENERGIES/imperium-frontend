import { apiSlice } from '../api/apiSlice'

const BASE_CUSTOMERS_URL = '/imperium-admin/shs-assign/list-customers/'

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomersList: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_CUSTOMERS_URL}?page=${page}`
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
      transformResponse: (response) => Object.values(response[0]),
    }),
    deactivateCustomer: builder.mutation({
      query: (data) => ({
        url: `/imperium-admin/shs/disable-client/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
    assignShs: builder.mutation({
      query: (data) => ({
        url: `${BASE_CUSTOMERS_URL}assign/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
    deactivateReasons: builder.query({
      query: () => ({ url: '/imperium-admin/shs/deactivate-reasons' }),
    }),
    toggleActivateShs: builder.mutation({
      query: (data) => ({
        url: `/imperium-admin/shs/deactivate/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
    activateCustomer: builder.mutation({
      query: ({ data, clientId }) => ({
        url: `/imperium-admin/shs/enable-client/${clientId}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
    listShsSectors: builder.query({
      query: () => ({ url: `/shs/shs-sectors/` }),
    }),
    listShsVendors: builder.query({
      query: () => ({ url: `/shs/shs-vendors/` }),
    }),
    listShsStates: builder.query({
      query: () => ({ url: `/shs/shs-states/` }),
    }),
    listShsRegions: builder.query({
      query: () => ({ url: `/shs/shs-regions/` }),
    }),
  }),
})

export const {
  useGetAdminCustomersListQuery,
  useGetCustomerPageAnalyticsQuery,
  useGetCustomerPageStatisticsQuery,
  useDeactivateCustomerMutation,
  useAssignShsMutation,
  useDeactivateReasonsQuery,
  useGetReasonsQuery,
  useActivateCustomerMutation,
  useListShsSectorsQuery,
  useListShsVendorsQuery,
  useListShsStatesQuery,
  useListShsRegionsQuery,
} = customerApiSlice
