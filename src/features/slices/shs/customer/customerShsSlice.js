import { apiSlice } from '../../../api/apiSlice'
const SHS_CUSTOMER_BASE_URL = '/imperium-client/shs-view/'
//

export const shsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCustomerEnergyGeneration: build.query({
      query: ({ id, client_id }) => {
        return `${SHS_CUSTOMER_BASE_URL}energy-generation/${client_id}/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getCustomerEnergyStatistics: build.query({
      query: ({ id, client_id }) => {
        return `${SHS_CUSTOMER_BASE_URL}energy-generation/${client_id}/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getCustomerPanelsList: build.query({
      query: ({ id, client_id }) => {
        return `${SHS_CUSTOMER_BASE_URL}panels-list/${client_id}/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getCustomerShsPerformance: build.query({
      query: ({ id, client_id }) => {
        return `${SHS_CUSTOMER_BASE_URL}performance-monitoring/${client_id}/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    shsPowerSchedule: build.mutation({
      query: ({ ShsPowerSchedule, deviceId }) => {
        return {
          url: `${SHS_CUSTOMER_BASE_URL}schedule/${deviceId}/`,
          body: ShsPowerSchedule,
          method: 'POST',
        }
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response,
    }),
  }),
})

export const {
  useGetCustomerEnergyGenerationQuery,
  useGetCustomerEnergyStatisticsQuery,
  useGetCustomerPanelsListQuery,
  useGetCustomerShsPerformanceQuery,
  useShsPowerScheduleMutation,
} = shsSlice
