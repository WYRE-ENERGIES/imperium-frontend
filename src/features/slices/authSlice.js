import { apiSlice } from '../api/apiSlice'

const AUTH_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: ({ credentials, endpoint }) => ({
        url: `${endpoint}/`,
        body: credentials,
        method: 'POST',
      }),
    }),
  }),
})

export const { useAuthMutation } = authSlice
