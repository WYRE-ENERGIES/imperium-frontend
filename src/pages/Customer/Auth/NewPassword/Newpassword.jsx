import React, { useState } from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Frame 1707478103.svg'
import { useCustomerNewPasswordMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Input } from 'antd'
import classes from './Newpassword.module.scss'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'

const NewPasswordPage = () => {
  const [errMsg, setErrMsg] = useState('')
  const [customerNewPassword, { isLoading }] = useCustomerNewPasswordMutation()
  const email = useLocation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (values.password1 !== values.password2) {
      setErrMsg('New passwords do not match!')
    } else {
      try {
        await customerNewPassword({
          email: email.state.email,
          password: values.password1,
          confirm_password: values.password2,
        }).unwrap()
        navigate('/admin/')
      } catch (err) {
        setErrMsg(ErrorMessage(err))
      }
    }
  }
  return (
    <div className={classes.NewPassword}>
      <Layout
        widgets={{
          header: 'New Password',
          tag: 'Enter a new password.',
          icon: icon,
        }}
        admin={false}
      >
        {errMsg && <Error Errormsg={errMsg} />}

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

export default NewPasswordPage
