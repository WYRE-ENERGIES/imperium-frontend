import React from 'react'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import ForgotPasswordForm from '../../../../components/Auth/Forms/AuthForm/PasswordReset/ForgotPassword/ForgotPasswordForm'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import classes from './AdminForgotPassword.module.scss'
const ForgotPasswordPage = () => {
  return (
    <div className={classes.ForgotPassword}>
      <Layout background="#294620">
        <FormNavbar btnColor1={'#CEE5C8'} btnColor2={'#FFFF'} />
        <ForgotPasswordForm />
      </Layout>
    </div>
  )
}

export default ForgotPasswordPage
