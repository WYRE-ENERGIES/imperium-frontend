import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, notification } from 'antd'
import OTPInput from 'otp-input-react'
import {
  useAdminOtpMutation,
  useAdminOtpResendMutation,
} from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import icon from '../../../../assets/Auth/Group 18.svg'
import classes from './AdminOtp.module.scss'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
const AdminOTP = () => {
  const [OTP, setOTP] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [adminOtp, { isLoading }] = useAdminOtpMutation()
  const navigate = useNavigate()
  const email = useLocation()
  const [adminOtpResend, { isLoading: otpResendLoading }] =
    useAdminOtpResendMutation()
  const openNotification = (email) => {
    notification.success({
      message: 'OTP sent!',
      description: `OPT resent to ${email}`,
    })
  }
  const handleResendOtp = async () => {
    try {
      await adminOtpResend({
        email: email?.state?.email,
      }).unwrap()
      openNotification(email?.state?.email)
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.message))
    }
  }
  const onFinish = async (values) => {
    try {
      await adminOtp({
        email: email?.state?.email,
        otp_code: OTP,
      }).unwrap()
      navigate('/admin/new-password', { state: { email: email.state.email } })
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.message))
    }
  }
  return (
    <div className={classes.Otp}>
      <Layout
        background="#294620"
        widgets={{
          header: 'OTP Verification',
          tag: `Enter OTP sent to ${email.state.email}`,
          icon: icon,
        }}
        admin={true}
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

          <FormButton
            action={'Continue'}
            isLoading={isLoading || otpResendLoading}
          />
        </Form>
        <section className={classes.Otp__Resend}>
          {`Didn't get Code ?`}
          <button
            onClick={handleResendOtp}
            style={{
              color: '#385E2B',
              fontWeight: 'bold',
              textDecoration: 'none',
              marginLeft: '5px',
              background: 'none',
              border: 'none',
            }}
          >
            Resend
          </button>
        </section>
      </Layout>
    </div>
  )
}

export default AdminOTP
