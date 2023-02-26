import { apiSlice } from '../../api/apiSlice'
import { loginUser } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: ({ credentials, endpoint }) => {
        return {
          url: `auth/${endpoint}/`,
          method: 'POST',
          body: { ...credentials },
        }
      },
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(loginUser({ ...data }))
          localStorage.setItem('token', JSON.stringify(data?.access))
          localStorage.setItem('refresh', JSON.stringify(data?.refresh))
        } catch (error) {
          return error
        }
      },
    }),
  }),
})

export const { useLogInMutation } = authApiSlice
