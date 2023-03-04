import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Form, notification } from 'antd'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import classes from './AdminForgotPassword.module.scss'
import { useAdminforgotPasswordMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import icon from '../../../../assets/Auth/Group 18.svg'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
const ForgotPasswordPage = () => {
  const [errMsg, setErrMsg] = useState('')
  const [adminforgotPassword, { isLoading }] = useAdminforgotPasswordMutation()
  const openNotification = (email) => {
    notification.success({
      message: 'OTP sent!',
      description: `OPT has been sent to ${email}`,
    })
  }
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      await adminforgotPassword({
        email: values.email,
      }).unwrap()
      openNotification(values.email)
      navigate('/admin/otp')
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
  return (
    <div className={classes.ForgotPassword}>
      <Layout
        background="#294620"
        widgets={{
          header: 'Forgot Password',
          tag: 'Link would be sent to your email address',
          icon: icon,
        }}
        admin={true}
      >
        {errMsg && (
          <small className={classes.ForgotPassword__Message}>{errMsg}</small>
        )}

        <Form
          name="admin-login"
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
          <Form.Item
            label=""
            name="email"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
            required
          >
            <Input
              className={classes.ForgotPassword__Input}
              placeholder="nisha@uitrend.com"
            />
          </Form.Item>
          <FormButton action={'Continue'} isLoading={isLoading} />
        </Form>
      </Layout>
    </div>
  )
}

export default ForgotPasswordPage
