import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../../components/Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import icon from '../../../../assets/Auth/Frame 1707478103.svg'
import { useCustomerNewPasswordMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, notification } from 'antd'
import classes from './Newpassword.module.scss'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { passwordLengthValidation } from '../../../../components/RegEx/RegEx'
import { sha256 } from 'js-sha256'

const NewPasswordPage = () => {
  const [errMsg, setErrMsg] = useState('')
  const openNotification = (email) => {
    notification.success({
      message: 'Password Reset.',
      description: `Password reset successful!`,
    })
  }
  const [pwdValid, setPwdValid] = useState(false)
  const [customerNewPassword, { isLoading }] = useCustomerNewPasswordMutation()
  const email = useLocation()
  const code = useLocation()
  const navigate = useNavigate()
  const pwdRef1 = useRef()
  const pwdRef2 = useRef()
  const onFinish = async (values) => {
    if (values.password1 !== values.password2) {
      setErrMsg('New passwords do not match!')
    } else {
      try {
        await customerNewPassword({
          email: email.state.email,
          password: sha256(values.password1),
          code: code?.state?.code,
        }).unwrap()
        openNotification(email?.state?.email)
        navigate('/')
      } catch (err) {
        setErrMsg(ErrorMessage(err?.data?.code || err?.data?.detail))
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
            extra={
              <p ref={pwdRef1} style={{ fontSize: '14px' }}>
                Must be more than 8 characters
              </p>
            }
          >
            <Input.Password
              onChange={(e) =>
                passwordLengthValidation(
                  e,
                  pwdRef1,
                  'Password not more than 8 charcaters',
                  setPwdValid,
                )
              }
              className={classes.NewPassword__Password}
              placeholder="New password"
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
            extra={
              <p ref={pwdRef2} style={{ fontSize: '14px' }}>
                Must be more than 8 characters
              </p>
            }
          >
            <Input.Password
              onChange={(e) =>
                passwordLengthValidation(
                  e,
                  pwdRef2,
                  'Password not more than 8 charcaters',
                  setPwdValid,
                )
              }
              className={classes.NewPassword__Password}
              placeholder="Confirm password"
            />
          </Form.Item>
          <FormButton
            action={'Continue'}
            isLoading={isLoading}
            validate={!pwdValid}
          />
        </Form>
      </Layout>
    </div>
  )
}

export default NewPasswordPage
