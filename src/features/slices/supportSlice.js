import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestStatusEnum, supportStatusEnums } from '../../utils/enums'

import supportServices from '../services/support.services'

const initialState = {
  status: requestStatusEnum.IDLE,
  message: '',
  results: {},
}

export const getAdminSupportData = createAsyncThunk(
  '/admin-support-data',
  async (query, thunkAPI) => {
    try {
      const token = process.env.REACT_APP_ADMIN_TOKEN
      return await supportServices.getAdminSupportPageData(token, query)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getAllAdminSupportTickets = createAsyncThunk(
  '/admin-support-tickets',
  async (query, thunkAPI) => {
    try {
      const token = process.env.REACT_APP_ADMIN_TOKEN
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await supportServices.getAllAdminSupportTickets(
        config,
        query,
      )
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const resolveTicket = createAsyncThunk(
  '/admin-resolve-ticket',
  async (data, thunkAPI) => {
    try {
      const token = process.env.REACT_APP_ADMIN_TOKEN
      return await supportServices.adminResolveTicket(data, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminSupportData.pending, (state) => {
        state.status = requestStatusEnum.LOADING
      })
      .addCase(getAdminSupportData.fulfilled, (state, { payload }) => {
        if (!Object.keys(payload.err).length) {
          payload.tickets.results = payload.tickets.results.map((ticket) => ({
            ...ticket,
            key: ticket.id,
          }))
          state.status = requestStatusEnum.SUCCESS
        } else {
          state.status = requestStatusEnum.FAILED
        }
        state.results = payload
      })
      .addCase(getAdminSupportData.rejected, (state, { payload }) => {
        state.status = requestStatusEnum.FAILED
        state.message = payload
      })
      .addCase(getAllAdminSupportTickets.pending, (state) => {
        state.status = requestStatusEnum.LOADING
      })
      .addCase(getAllAdminSupportTickets.fulfilled, (state, { payload }) => {
        payload.results = payload.results.map((ticket) => ({
          ...ticket,
          key: ticket.id,
        }))

        state.status = requestStatusEnum.SUCCESS
        state.results.tickets = payload
      })
      .addCase(getAllAdminSupportTickets.rejected, (state, { payload }) => {
        state.status = requestStatusEnum.FAILED
        state.message = payload
      })
      .addCase(resolveTicket.pending, (state) => {
        state.status = requestStatusEnum.LOADING
      })
      .addCase(resolveTicket.fulfilled, (state, { payload }) => {
        state.results.analytics = {
          ...state.results.analytics,
          unresolved:
            payload.status === supportStatusEnums.RESOLVED
              ? state.results.analytics.unresolved - 1
              : state.results.analytics.unresolved + 1,
          resolved:
            payload.status === supportStatusEnums.RESOLVED
              ? state.results.analytics.resolved + 1
              : state.results.analytics.resolved - 1,
        }
        var foundIndex = state.results.tickets.results.findIndex(
          (ticket) => ticket.id == payload.id,
        )
        state.results.tickets.results[foundIndex] = {
          ...state.results.tickets.results[foundIndex],
          status: payload.status,
        }
        state.status = requestStatusEnum.SUCCESS
      })
      .addCase(resolveTicket.rejected, (state, { payload }) => {
        state.status = requestStatusEnum.FAILED
        state.message = payload
      })
  },
})

export const { reset } = supportSlice.actions
export default supportSlice.reducer
