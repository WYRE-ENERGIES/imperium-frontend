import { apiSlice } from '../api/apiSlice'

const token = process.env.REACT_APP_ADMIN_TOKEN
const BASE_USERS_URL = '/imperium-admin/'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => ({
        url: `${BASE_USERS_URL}list-users/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        response.results = response.results.map((user) => ({
          ...user,
          key: user.id,
        }))

        return response
      },
      providesTags: ['Users'],
    }),
    getUsersRoles: builder.query({
      query: () => ({
        url: `${BASE_USERS_URL}list-user-roles/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    inviteUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_USERS_URL}invite-user/`,
        method: 'POST',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersListQuery,
  useGetUsersRolesQuery,
  useInviteUserMutation,
} = usersApiSlice
