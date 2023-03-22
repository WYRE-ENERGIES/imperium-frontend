import { apiSlice } from '../../../api/apiSlice'
import { getItemFromLocalStorage } from '../../../../utils/helpers'

const CLIENT_URL_PATH = '/imperium-client/'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: ({ page, search }) => {
        const clientId = getItemFromLocalStorage('current_client')
        let url = `${CLIENT_URL_PATH}user-invite/list-users/${clientId}/?page=${page}`

        if (search) {
          url += `&search=${search}`
        }

        return { url }
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
    inviteUser: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL_PATH}invite-user/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation({
      query: (email) => {
        const clientId = getItemFromLocalStorage('current_client')
        return {
          url: `${CLIENT_URL_PATH}user-invite/remove-user/${clientId}/${email}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Users'],
    }),
    acceptInvite: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL_PATH}accept-invite/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetUsersListQuery,
  useInviteUserMutation,
  useRemoveUserMutation,
  useAcceptInviteMutation,
} = usersApiSlice
