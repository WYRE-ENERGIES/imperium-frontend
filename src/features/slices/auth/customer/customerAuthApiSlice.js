import { apiSlice } from '../../../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerRegister: builder.mutation({
      query: ({ credentials }) => {
        return {
          url: '/auth/register/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    customerforgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: '/forgot-password/',
          method: 'POST',
          body: email,
        }
      },
    }),
    customerOtp: builder.mutation({
      query: (credentials) => {
        return {
          url: '/forgot-password/confirm/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    customerNewPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: '/forgot-password/complete/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
  }),
})

export const {
  useCustomerforgotPasswordMutation,
  useCustomerOtpMutation,
  useCustomerNewPasswordMutation,
  useCustomerRegisterMutation,
} = authApiSlice
