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
          url: '/auth/initialize-reset-password/',
          method: 'POST',
          body: email,
        }
      },
    }),
    customerOtp: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/validate-otp-reset-password/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    customerNewPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/forgot-password/complete/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    customerVerificationCode: builder.mutation({
      query: (credentials) => {
        return {
          url: 'auth/verify-email/',
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
  useCustomerVerificationCodeMutation,
  useCustomerRegisterMutation,
} = authApiSlice
