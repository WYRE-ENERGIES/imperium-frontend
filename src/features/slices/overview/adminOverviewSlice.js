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
      transformResponse: (response) =>
        Object.values(response[0]).map((data) =>
          !data ? 0 : Math.floor(data),
        ),
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

        Object.values(response[0]).forEach((stat) => {
          const { month_current, month_voltage } = stat
          current.data.push(Math.floor(month_current) ?? 0)
          voltage.data.push(Math.floor(month_voltage) ?? 0)
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

        Object.values(response[0]).forEach((stat, index) => {
          if (index < 12) {
            const { energy_generated, energy_consumed } = stat
            energyGenerated.data.push(Math.floor(energy_generated) ?? 0)
            energyConsumed.data.push(Math.floor(energy_consumed) ?? 0)
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
} = adminOverviewSlice
