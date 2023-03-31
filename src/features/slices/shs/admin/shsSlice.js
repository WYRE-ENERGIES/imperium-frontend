import { apiSlice } from '../../../api/apiSlice'
const SHS_BASE_URL = '/imperium-admin/shs-view/'
//

export const shsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getEnergyGeneration: build.query({
      query: ({ id }) => {
        return `${SHS_BASE_URL}energy-generation/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getEnergyStatistics: build.query({
      query: ({ id }) => {
        return `${SHS_BASE_URL}energy-generation/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getPanelsList: build.query({
      query: ({ id }) => {
        return `${SHS_BASE_URL}panels-list/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getShsPerformance: build.query({
      query: ({ id }) => {
        return `${SHS_BASE_URL}performance-monitoring/${id}`
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    shsPowerSchedule: build.mutation({
      query: ({ ShsPowerSchedule, deviceId }) => {
        return {
          url: `${SHS_BASE_URL}schedule/${deviceId}/`,
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
  useGetEnergyGenerationQuery,
  useGetEnergyStatisticsQuery,
  useGetPanelsListQuery,
  useGetShsPerformanceQuery,
  useShsPowerScheduleMutation,
} = shsSlice
