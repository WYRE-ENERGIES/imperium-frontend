import React from 'react'
import icon from '../../../../assets/Auth/Group 18.svg'
import ForgotPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/ForgotPassword/ForgotPasswordForm'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'

const ForgotPasswordPage = () => {
  return (
    <div>
      <Layout
        widgets={{
          icon: icon,
          header: 'Forgot password',
          tag: 'Link would be sent to your email address',
        }}
      >
        <ForgotPasswordForm />
      </Layout>
    </div>
  )
}

export default ForgotPasswordPage
