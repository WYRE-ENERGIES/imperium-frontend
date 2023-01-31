import React from 'react'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import ForgotPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/ForgotPassword/ForgotPasswordForm'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'

const ForgotPasswordPage = () => {
  return (
    <div>
      <Layout>
        <FormNavbar />
        <ForgotPasswordForm />
      </Layout>
    </div>
  )
}

export default ForgotPasswordPage
