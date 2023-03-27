import { apiSlice } from '../api/apiSlice'
import { getItemFromLocalStorage } from '../../utils/helpers'

const CLIENT_URL_PATH = '/imperium-client/'

export const clientUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserClientList: builder.query({
      query: () => ({ url: `${CLIENT_URL_PATH}list-client/` }),
      transformResponse: (response) => {
        const currentClient = getItemFromLocalStorage('current_client')
        if (!currentClient) return { response }

        const current = response.find((client) => currentClient === client.id)
        return {
          current: current?.id,
          response,
        }
      },
    }),
    adminGetClientList: builder.query({
      query: (search) => ({
        url: `/imperium-admin/shs/list-clients/?search=${search}`,
      }),
    }),
    getClientDeviceList: builder.query({
      query: () => {
        const client_id = getItemFromLocalStorage('current_client')
        return {
          url: `${CLIENT_URL_PATH}list-shs-device/${client_id}/`,
        }
      },
    }),
  }),
})

export const {
  useGetUserClientListQuery,
  useAdminGetClientListQuery,
  useGetClientDeviceListQuery,
} = clientUsersApiSlice
