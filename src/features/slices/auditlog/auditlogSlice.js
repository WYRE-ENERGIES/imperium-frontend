import { apiSlice } from '../../api/apiSlice'

const ADMIN_URL_PATH = '/imperium-admin/'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuditList: builder.query({
      query: ({ page, search }) => {
        let url = `${ADMIN_URL_PATH}audit-log/?page=${page}`

        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
      transformResponse: (response) => {
        return response
      },
      providesTags: ['AuditLogs'],
    }),
  }),
})

export const { useGetAuditListQuery } = usersApiSlice
