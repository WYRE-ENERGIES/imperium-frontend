import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormNavbar from '../../../../components/Auth/Forms/Widgets/FormNavbar'
import Otp from '../../../../components/Auth/Forms/AuthForm/Otp/OtpForm'
const OTP = () => {
  return (
    <div>
      <Layout>
        <FormNavbar />
        <Otp />
      </Layout>
    </div>
  )
}

export default OTP
