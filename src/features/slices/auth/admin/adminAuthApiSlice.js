import { apiSlice } from '../../../api/apiSlice'

const BASE_URL = '/imperium-admin/'
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminforgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: `${BASE_URL}auth/forgot-password/`,
          method: 'POST',
          body: email,
        }
      },
    }),
    adminOtp: builder.mutation({
      query: (credentials) => {
        return {
          url: `${BASE_URL}auth/forgot-password/confirm/`,
          method: 'POST',
          body: credentials,
        }
      },
    }),
    adminOtpResend: builder.mutation({
      query: (credentials) => {
        return {
          url: `${BASE_URL}auth/forgot-password/resend/`,
          method: 'POST',
          body: credentials,
        }
      },
    }),
    adminNewPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: `${BASE_URL}auth/forgot-password/complete/`,
          method: 'POST',
          body: credentials,
        }
      },
    }),
    adminChangePassword: builder.mutation({
      query: (credentials) => {
        return {
          url: `${BASE_URL}settings/change-password/`,
          method: 'PATCH',
          body: credentials,
        }
      },
    }),
  }),
})

export const {
  useAdminforgotPasswordMutation,
  useAdminOtpMutation,
  useAdminNewPasswordMutation,
  useAdminChangePasswordMutation,
  useAdminOtpResendMutation,
} = authApiSlice
