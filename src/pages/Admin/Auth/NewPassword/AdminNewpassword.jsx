import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import NewPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/NewPassword/NewPasswordForm'
import classes from './AdminNewPassword.module.scss'
const NewPasswordPage = () => {
  return (
    <div className={classes.NewPassword}>
      <Layout background="#294620">
        <FormNavbar btnColor1={'#CEE5C8'} btnColor2={'#FFFF'} />
        <NewPasswordForm />
      </Layout>
    </div>
  )
}

export default NewPasswordPage
