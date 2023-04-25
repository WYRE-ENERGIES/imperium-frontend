import React, { useState } from 'react'
import OTPInput from 'otp-input-react'

import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Group 18.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  useCustomerOtpMutation,
  useCustomerforgotPasswordMutation,
} from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './Otp.module.scss'
import { Form, notification } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const OTP = () => {
  const admin = false
  const [OTP, setOTP] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [adminOtp, { isLoading: otpisLoading }] = useCustomerOtpMutation()
  const navigate = useNavigate()
  const email = useLocation()
  const [customerforgotPassword, { isLoading: resetOtpisLoading }] =
    useCustomerforgotPasswordMutation()
  const openNotification = (email) => {
    notification.success({
      message: 'OTP sent!',
      description: `OTP resent to ${email}`,
    })
  }

  const handleResendOtp = async () => {
    try {
      await customerforgotPassword({
        email: email?.state?.email,
      }).unwrap()
      openNotification(email?.state?.email)
    } catch (err) {
      let errorMsg = ''
      if (err.status === 401) {
        errorMsg += err?.data?.email?.message || err?.data?.email
        setErrMsg(errorMsg)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.email?.message || err?.data?.email)
      } else if (err.status === 500) {
        setErrMsg('Server could not be reached. Try later!')
      } else {
        setErrMsg('Check your internet connection')
      }
    }
  }
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
          tag: email?.state?.email
            ? `Enter OTP sent to ${email?.state?.email}`
            : 'You need to provide an email to receive OTP.',
          footer: (
            <div style={{ textAlign: 'center', marginTop: '5px' }}>
              Didn’t receive code?{' '}
              <button onClick={handleResendOtp} className={classes.Otp__Resend}>
                <span style={{ color: '#294620' }}>Resend</span>
              </button>
            </div>
          ),
        }}
        admin={admin}
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
          {email?.state?.email ? (
            ''
          ) : (
            <Link
              style={{
                background: '#f0f7ed',
                padding: '6px 10px ',
                color: '#528a3f',
                borderRadius: '8px',
                fontSize: '14px',
              }}
              to={admin ? '/admin/forgot-password' : '/forgot-password'}
            >
              <ArrowLeftOutlined /> Enter email
            </Link>
          )}
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

          <FormButton
            action={'Continue'}
            isLoading={otpisLoading || resetOtpisLoading}
            validate={email?.state?.email ? false : true}
          />
        </Form>
      </Layout>
    </div>
  )
}

export default OTP
