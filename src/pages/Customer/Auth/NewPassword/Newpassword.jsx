import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import NewPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/NewPassword/NewPasswordForm'

const NewPasswordPage = () => {
  return (
    <div>
      <Layout>
        <FormNavbar />
        <NewPasswordForm />
      </Layout>
    </div>
  )
}

export default NewPasswordPage
