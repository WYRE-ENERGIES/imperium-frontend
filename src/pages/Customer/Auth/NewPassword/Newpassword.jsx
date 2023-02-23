import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Frame 1707478103.svg'
import NewPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/NewPassword/NewPasswordForm'

const NewPasswordPage = () => {
  return (
    <div>
      <Layout
        widgets={{
          icon: icon,
          header: 'New password',
          tag: 'Create new password',
        }}
      >
        <NewPasswordForm />
      </Layout>
    </div>
  )
}

export default NewPasswordPage
