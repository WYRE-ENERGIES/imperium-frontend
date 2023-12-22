import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Form, notification } from 'antd'
import icon from '../../../../assets/Auth/Group 18.svg'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import { useCustomerforgotPasswordMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import classes from './ForgotPassword.module.scss'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
const ForgotPasswordPage = () => {
  const [errMsg, setErrMsg] = useState('')
  const [customerforgotPassword, { isLoading }] =
    useCustomerforgotPasswordMutation()
  const openNotification = (email) => {
    notification.success({
      message: 'If your email is found, an OTP would be sent to you.!',
      description: `Check ''${email}'' for OTP`,
    })
  }
  const navigate = useNavigate()
  let errorMsg = ''
  const onFinish = async (values) => {
    try {
      await customerforgotPassword({
        email: values.email,
      }).unwrap()
      if (values.code !== 200) {
        errorMsg += values.message
        setErrMsg(errorMsg)
      } else {
        openNotification(values.email)
        navigate('/otp', { state: { email: values.email } })
      }
    } catch (err) {
      // let errorMsg = ''
      if (err.status === 401) {
        errorMsg += err?.data?.email?.message || err?.data?.email
        // setErrMsg(errorMsg)
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
    <div>
      <Layout
        widgets={{
          icon: icon,
          header: 'Forgot password',
          tag: 'Link would be sent to your email address',
        }}
        admin={false}
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
