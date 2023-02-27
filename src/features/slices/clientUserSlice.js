import { apiSlice } from '../api/apiSlice'

const ADMIN_URL_PATH = '/imperium-admin/'

export const clientUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserClientList: builder.query({
      query: () => ({ url: `${ADMIN_URL_PATH}list-client-users/` }),
    }),
  }),
})

export const { useGetUserClientListQuery } = clientUsersApiSlice
