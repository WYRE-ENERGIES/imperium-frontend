import { apiSlice } from '../../api/apiSlice'

const ADMIN_SHS_URL_PATH = '/imperium-admin/overview/'

export const adminOverviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverviewAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${ADMIN_SHS_URL_PATH}analytics/?order_by=${filterBy}`,
      }),
    }),
  }),
})

export const { useGetAdminOverviewAnalyticsQuery } = adminOverviewSlice
