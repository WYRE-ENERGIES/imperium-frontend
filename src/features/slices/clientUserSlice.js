import { apiSlice } from '../api/apiSlice'

const token = process.env.REACT_APP_ADMIN_TOKEN
const ADMIN_URL_PATH = '/imperium-admin/'

export const clientUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserClientList: builder.query({
      query: () => ({
        url: `${ADMIN_URL_PATH}list-client-users/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const { useGetUserClientListQuery } = clientUsersApiSlice
