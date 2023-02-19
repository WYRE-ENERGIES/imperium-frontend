import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import Otp from '../../../../components/Auth/Forms/AuthForm/Otp/OtpForm'
import classes from './AdminOtp.module.scss'
const AdminOTP = () => {
  return (
    <div className={classes.Otp}>
      <Layout background="#294620">
        <FormNavbar btnColor1={'#CEE5C8'} btnColor2={'#FFFF'} />
        <Otp />
      </Layout>
    </div>
  )
}

export default AdminOTP
