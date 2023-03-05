import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form } from 'antd'
import OTPInput from 'otp-input-react'
import { useAdminOtpMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import icon from '../../../../assets/Auth/Group 18.svg'
import classes from './AdminOtp.module.scss'
const AdminOTP = () => {
  const [OTP, setOTP] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [adminOtp, { isLoading }] = useAdminOtpMutation()
  const navigate = useNavigate()
  const email = useLocation()

  const onFinish = async (values) => {
    try {
      await adminOtp({
        email: email.state.email,
        otp_code: OTP,
      }).unwrap()
      navigate('/admin/new-password', { state: { email: email.state.email } })
    } catch (err) {
      let errorMsg = ''
      if (err.status === 401) {
        errorMsg += err?.data?.message
        setErrMsg(errorMsg)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.message)
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

          <FormButton action={'Continue'} isLoading={isLoading} />
        </Form>
        <section
          className={classes.Otp__Resend}
          style={{ textAlign: 'center', marginTop: '10px' }}
        >
          {`Didn't get Code ?`}
          <button
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
