import { apiSlice } from '../../api/apiSlice'
import { loginUser } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ credentials, endpoint }) => {
        return {
          url: endpoint,
          method: 'POST',
          body: { ...credentials },
        }
      },
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(loginUser({ ...data }))
        } catch (error) {
          return error
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApiSlice
