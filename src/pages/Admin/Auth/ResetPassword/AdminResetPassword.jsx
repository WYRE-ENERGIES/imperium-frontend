import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Input, Form } from 'antd'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import { useAdminNewPasswordMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import icon from '../../../../assets/Auth/Frame 1707478103.svg'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AdminResetPassword.module.scss'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { passwordLengthValidation } from '../../../../components/RegEx/RegEx'
import { sha256 } from 'js-sha256'
const AdminResetPassword = () => {
  const [errMsg, setErrMsg] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [adminNewPassword, { isLoading }] = useAdminNewPasswordMutation()
  const email = useLocation()
  const pwdRef1 = useRef(null)
  const pwdRef2 = useRef(null)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (values.password1 !== values.password2) {
      setErrMsg('New passwords do not match!')
    } else {
      try {
        values.password1 = sha256(values.password1)
        values.password2 = sha256(values.password2)
        await adminNewPassword({
          email: email.state.email,
          password: values.password1,
          confirm_password: values.password2,
        }).unwrap()
        navigate('/admin/sign-in')
      } catch (err) {
        setErrMsg(ErrorMessage(err?.data?.email))
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
            extra={<small ref={pwdRef1}>Must be at least 8 characters.</small>}
            name="password1"
            rules={[
              {
                required: true,
                message: <small>This filed is required</small>,
              },
            ]}
            required
          >
            <Input.Password
              onChange={(e) =>
                passwordLengthValidation(
                  e,
                  pwdRef1,
                  'Must be at least 8 characters.',
                  setFormValid,
                )
              }
              className={classes.NewPassword__Password}
            />
          </Form.Item>
          <Form.Item
            label=""
            extra={<small ref={pwdRef2}>Must be at least 8 characters.</small>}
            name="password2"
            rules={[
              {
                required: true,
                message: <small>This filed is required</small>,
              },
            ]}
            required
          >
            <Input.Password
              onChange={(e) =>
                passwordLengthValidation(
                  e,
                  pwdRef2,
                  'Must be at least 8 characters.',
                  setFormValid,
                )
              }
              className={classes.NewPassword__Password}
            />
          </Form.Item>
          <FormButton action={'Continue'} isLoading={isLoading} />
        </Form>
      </Layout>
    </div>
  )
}

export default AdminResetPassword
