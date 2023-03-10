import { apiSlice } from '../../../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminforgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: '/imperium-admin/auth/forgot-password/',
          method: 'POST',
          body: email,
        }
      },
    }),
    adminOtp: builder.mutation({
      query: (credentials) => {
        return {
          url: '/imperium-admin/auth/forgot-password/confirm/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    adminNewPassword: builder.mutation({
      query: (credentials) => {
        return {
          url: '/imperium-admin/auth/forgot-password/complete/',
          method: 'POST',
          body: credentials,
        }
      },
    }),
    adminChangePassword: builder.mutation({
      query: (credentials) => {
        return {
          url: '/imperium-admin/settings/change-password/',
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
} = authApiSlice
