import React, { useState } from 'react'
import OTPInput from 'otp-input-react'

import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Group 18.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCustomerOtpMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './Otp.module.scss'
import { Form } from 'antd'

const OTP = () => {
  const [OTP, setOTP] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [adminOtp, { isLoading }] = useCustomerOtpMutation()
  const navigate = useNavigate()
  const email = useLocation()
  const onFinish = async () => {
    try {
      await adminOtp({
        email: email.state.email,
        otp: OTP,
      }).unwrap()
      navigate('/new-password', { state: { email: email.state.email } })
    } catch (err) {
      let errorMsg = ''
      if (err.status === 401) {
        errorMsg += err?.data?.errors
        setErrMsg(errorMsg)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.errors)
      } else if (err.status === 500) {
        setErrMsg('Server could not be reached. Try later!')
      } else {
        setErrMsg('Check your internet connection')
      }
    }
  }
  return (
    <div className={classes.Otp}>
      <Layout
        widgets={{
          icon: icon,
          header: 'OTP Verification',
          tag: `Enter OTP sent to ${email.state.email}`,
          footer: (
            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              Didn’t receive code?{' '}
              <Link to={'/forgot-password'} style={{ textDecoration: 'none' }}>
                <span style={{ color: '#294620' }}>Resend</span>
              </Link>
            </div>
          ),
        }}
        admin={false}
      >
        <Form
          name="admin-otp"
          labelCol={8}
          wrapperCol={32}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark="optional"
        >
          {errMsg && <small className={classes.Otp__Message}>{errMsg}</small>}
          <div className={classes.Otp__Input}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
            />
          </div>

          <FormButton action={'Continue'} isLoading={isLoading} />
        </Form>
      </Layout>
    </div>
  )
}

export default OTP
