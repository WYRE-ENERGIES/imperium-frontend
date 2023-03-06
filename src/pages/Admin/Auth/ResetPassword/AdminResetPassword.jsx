import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Input, Form } from 'antd'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import { useAdminNewPasswordMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import icon from '../../../../assets/Auth/Frame 1707478103.svg'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AdminResetPassword.module.scss'
const AdminResetPassword = () => {
  const [errMsg, setErrMsg] = useState('')
  const [adminNewPassword, { isLoading }] = useAdminNewPasswordMutation()
  const email = useLocation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (values.password1 !== values.password2) {
      setErrMsg('New passwords do not match!')
    } else {
      try {
        await adminNewPassword({
          email: email.state.email,
          // silaref921@pubpng.com
          password: values.password1,
          confirm_password: values.password2,
        }).unwrap()
        navigate('/admin/')
      } catch (err) {
        let errorMsg = ''
        console.log(err)
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
  }
  return (
    <div className={classes.NewPassword}>
      <Layout
        background="#294620"
        widgets={{
          header: 'New Password',
          tag: 'Enter a new password.',
          icon: icon,
        }}
        admin={true}
      >
        {errMsg && (
          <small className={classes.NewPassword__Message}>{errMsg}</small>
        )}

        <Form
          name="admin-newpassword"
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
            name="password1"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
            required
          >
            <Input.Password
              className={classes.NewPassword__Password}
              placeholder="nisha@uitrend.com"
            />
          </Form.Item>
          <Form.Item
            label=""
            name="password2"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
            required
          >
            <Input.Password
              className={classes.NewPassword__Password}
              placeholder="nisha@uitrend.com"
            />
          </Form.Item>
          <FormButton action={'Continue'} isLoading={isLoading} />
        </Form>
      </Layout>
    </div>
  )
}

export default AdminResetPassword
