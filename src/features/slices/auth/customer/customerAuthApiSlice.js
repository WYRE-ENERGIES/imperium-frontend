import { saveToLocalStorage } from '../../../../utils/helpers'
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
          url: '/auth/complete-reset-password/',
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
      transformResponse: (response, meta, arg) => {
        return response
      },
      transformErrorResponse: (response, meta, arg) => response,
    }),
    customerBusiness: builder.mutation({
      query: (formData) => {
        return {
          url: '/imperium-client/business/',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['CustomerBusiness'],
    }),
    customerGetBusiness: builder.query({
      query: () => {
        return {
          url: '/imperium-client/business/',
          method: 'GET',
        }
      },
      providesTags: ['CustomerBusiness'],
    }),
    customerGetDetails: builder.query({
      query: () => {
        return {
          url: '/imperium-client/user-account/',
          method: 'GET',
        }
      },
      providesTags: ['CustomerDetails'],
    }),
    customerUpdateDetails: builder.mutation({
      query: ({ credentials }) => {
        return {
          url: '/auth/user-detail/',
          method: 'POST',
          body: credentials,
        }
      },
      invalidatesTags: ['CustomerDetails'],
    }),
    customerChangePassword: builder.mutation({
      query: ({ credentials }) => {
        return {
          url: '/auth/change-password/',
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
  useCustomerBusinessMutation,
  useCustomerGetDetailsQuery,
  useCustomerChangePasswordMutation,
  useCustomerUpdateDetailsMutation,
  useCustomerGetBusinessQuery,
} = authApiSlice
