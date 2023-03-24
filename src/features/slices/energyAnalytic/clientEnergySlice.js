import { apiSlice } from '../../api/apiSlice'

const BASE_ENERGY_URL = '/imperium-client/energy/'

export const energyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientEnergyTableData: builder.query({
      query: ({ page, search, filterBy }) => {
        let url = `${BASE_ENERGY_URL}?page=${page}&order_by=${filterBy}`
        if (search) {
          url += `&search=${search}`
        }

        return { url }
      },
    }),
  }),
})

export const { useGetClientEnergyTableDataQuery } = energyApiSlice
