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
        return `${SHS_BASE_URL}energy-statistics/${id}`
      },
      transformResponse: (response) => {
        const energyGenerated = {
          name: 'Energy Generated',
          data: [],
        }
        const energyConsumed = {
          name: 'Energy Consumed',
          data: [],
        }

        const currentDateMonth = new Date().getMonth() + 1
        Object.values(response[0]).forEach((stat, index) => {
          if (index < 12) {
            const { energy_generated, energy_consumed } = stat

            if (index + 1 > currentDateMonth) {
              energyGenerated.data.splice(
                index - currentDateMonth,
                0,
                Math.floor(energy_generated) ?? 0,
              )
              energyConsumed.data.splice(
                index - currentDateMonth,
                0,
                Math.floor(energy_consumed) ?? 0,
              )
            } else {
              energyGenerated.data.push(Math.floor(energy_generated) ?? 0)
              energyConsumed.data.push(Math.floor(energy_consumed) ?? 0)
            }
          }
        })

        return [energyGenerated, energyConsumed]
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
    getShsDetails: build.query({
      query: ({ deviceId }) => {
        return {
          url: `${SHS_BASE_URL}schedule/${deviceId}/detail/`,
        }
      },
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response,
      providesTags: ['shsSchedule'],
    }),
    adminShsPowerSchedule: build.mutation({
      query: ({ data, deviceId }) => {
        return {
          url: `${SHS_BASE_URL}schedule/${deviceId}/`,
          body: data,
          method: 'POST',
        }
      },
      invalidatesTags: ['shsSchedule'],
      transformResponse: (response, meta, arg) => {
        return response
      },

      transformErrorResponse: (response, meta, arg) => response,
    }),
    adminShsPowerScheduleCancel: build.mutation({
      query: ({ deviceId }) => {
        return {
          url: `${SHS_BASE_URL}schedule/${deviceId}/cancel/`,
          body: {
            cancel: true,
          },
          method: 'PUT',
        }
      },
      invalidatesTags: ['shsSchedule'],
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
  useAdminShsPowerScheduleMutation,
  useGetShsDetailsQuery,
  useAdminShsPowerScheduleCancelMutation,
} = shsSlice
