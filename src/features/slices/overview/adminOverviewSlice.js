import { apiSlice } from '../../api/apiSlice'

const ADMIN_OVERVIEW_URL_PATH = '/imperium-admin/overview/'

export const adminOverviewSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverviewAnalytics: builder.query({
      query: ({ filterBy }) => ({
        url: `${ADMIN_OVERVIEW_URL_PATH}analytics/?order_by=${filterBy}`,
      }),
    }),
    getOverviewActiveAlert: builder.query({
      query: ({ sectorId, regionId, filterBy, page }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}active-alert/?order_by=${filterBy}&page=${page}`
        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
      },
    }),
    getOverviewEmissionData: builder.query({
      query: ({ sectorId, regionId, filterBy }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}co2-emmission-avoided/?order_by=${filterBy}`

        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
      },
      transformResponse: (response) => {
        const currentDateMonth = new Date().getMonth() + 1
        const responseData = []
        Object.values(response[0]).map((data, index) => {
          if (index + 1 > currentDateMonth) {
            responseData.splice(
              index - currentDateMonth,
              0,
              Math.floor(data) ?? 0,
            )
          } else {
            responseData.push(Math.floor(data) ?? 0)
          }
        })
        return responseData
      },
    }),
    getAdminOverviewCurrentVoltage: builder.query({
      query: ({ sectorId, regionId, filterBy }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}voltage-current-statistics/?order_by=${filterBy}`

        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
      },
      transformResponse: (response) => {
        const current = {
          name: 'Current',
          data: [],
        }
        const voltage = {
          name: 'Voltage',
          data: [],
        }

        const currentDateMonth = new Date().getMonth() + 1
        Object.values(response[0]).forEach((stat, index) => {
          const { month_current, month_voltage } = stat

          if (index + 1 > currentDateMonth) {
            current.data.splice(
              index - currentDateMonth,
              0,
              Math.floor(month_current) ?? 0,
            )
            voltage.data.splice(
              index - currentDateMonth,
              0,
              Math.floor(month_voltage) ?? 0,
            )
          } else {
            current.data.push(Math.floor(month_current) ?? 0)
            voltage.data.push(Math.floor(month_voltage) ?? 0)
          }
        })

        return [current, voltage]
      },
    }),
    getOverviewSolarHouseData: builder.query({
      query: ({ sectorId, regionId, filterBy, page }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}solar-house-system/?order_by=${filterBy}&page=${page}`
        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
      },
      transformResponse: (response) => {
        response.results = response.results.map((list, index) => ({
          ...list,
          key: `${list.device_name}-${index}`,
        }))

        return response
      },
    }),
    getOverviewSector: builder.query({
      query: ({ filterBy }) => ({
        url: `${ADMIN_OVERVIEW_URL_PATH}sectors/?order_by=${filterBy}`,
      }),
      transformResponse: (response) => {
        const result = {
          labels: [],
          data: [],
        }

        response.sectors.forEach((sector) => {
          result.labels.push(sector.sector__name)
          result.data.push(sector.region_count)
        })

        return result
      },
    }),
    getOverviewEnergyData: builder.query({
      query: ({ sectorId, regionId, filterBy }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}energy-generated-consumption/?order_by=${filterBy}`

        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
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
    }),
    getMapData: builder.query({
      query: ({ sectorId, regionId }) => {
        let url = `${ADMIN_OVERVIEW_URL_PATH}map`

        if (sectorId) {
          url += `&device__sector_id=${sectorId}`
        }

        if (regionId) {
          url += `&device__region_id=${regionId}`
        }

        return {
          url,
        }
      },
    }),
    getActiveUsers: builder.query({
      query: ({ filterBy }) => ({
        url: `${ADMIN_OVERVIEW_URL_PATH}active-users/?order_by=${filterBy}`,
      }),
    }),
    getSectors: builder.query({
      query: ({ regionName }) => ({
        url: `${ADMIN_OVERVIEW_URL_PATH}device-sectors/${regionName}`,
      }),
    }),
    getRegions: builder.query({
      query: ({ sectorName }) => ({
        url: `${ADMIN_OVERVIEW_URL_PATH}device-regions/${sectorName}`,
      }),
    }),
  }),
})

export const {
  useGetAdminOverviewAnalyticsQuery,
  useGetOverviewActiveAlertQuery,
  useGetOverviewEmissionDataQuery,
  useGetAdminOverviewCurrentVoltageQuery,
  useGetOverviewSolarHouseDataQuery,
  useGetOverviewSectorQuery,
  useGetOverviewEnergyDataQuery,
  useGetMapDataQuery,
  useGetActiveUsersQuery,
  useGetSectorsQuery,
  useGetRegionsQuery,
} = adminOverviewSlice
