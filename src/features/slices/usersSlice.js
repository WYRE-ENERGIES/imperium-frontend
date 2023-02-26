import { apiSlice } from '../api/apiSlice'

const token = process.env.REACT_APP_ADMIN_TOKEN
const ADMIN_URL_PATH = '/imperium-admin/'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: ({ page, search }) => {
        let url = `${ADMIN_URL_PATH}list-users/?page=${page}`
        if (search) {
          url += `&search=${search}`
        }

        return {
          url,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      },
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
        url: `${ADMIN_URL_PATH}list-user-roles/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    inviteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL_PATH}invite-user/`,
        method: 'POST',
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation({
      query: (email) => ({
        url: `${ADMIN_URL_PATH}remove-user/${email}`,
        method: 'DELETE',
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
  useRemoveUserMutation,
} = usersApiSlice
