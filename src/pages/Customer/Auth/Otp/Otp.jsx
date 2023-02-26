import React from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Group 18.svg'
import Otp from '../../../../components/Auth/Forms/AuthForm/Otp/OtpForm'
import { Link } from 'react-router-dom'

const OTP = () => {
  return (
    <div>
      <Layout
        widgets={{
          icon: icon,
          header: 'OTP Verification',
          tag: 'Enter OTP sent to nisha@uitrend.com',
          footer: (
            <div style={{ textAlign: 'center' }}>
              Didn’t receive code?{' '}
              <Link to={'/forgot-password'} style={{ textDecoration: 'none' }}>
                <span style={{ color: '#294620' }}>Resend</span>
              </Link>
            </div>
          ),
        }}
      >
        <Otp />
      </Layout>
    </div>
  )
}

export default OTP
