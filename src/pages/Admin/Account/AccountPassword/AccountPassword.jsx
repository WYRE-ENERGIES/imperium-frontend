import { Col, Form, Input, Row, notification } from 'antd'
import React, { useState } from 'react'

import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountPassword.module.scss'
import Account from '../Account'
import PasswordKeyIcon from '../../../../assets/Auth/passwordIcon.svg'
import { useAdminChangePasswordMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import { useNavigate } from 'react-router-dom'

const AccountPassword = () => {
  const [errMsg, setErrMsg] = useState('')
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const openNotification = () => {
    notification.success({
      message: 'Successful',
      description: `Password reset successful`,
    })
  }
  const [adminChangePassword, { isLoading }] = useAdminChangePasswordMutation()

  const onFinish = async (values) => {
    setErrMsg('')
    if (values.new_password !== values.confirm_password) {
      setErrMsg('New passwords do not match!')
    } else {
      try {
        await adminChangePassword({
          old_password: values.old_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        }).unwrap()
        openNotification()
        navigate('/admin/account')
      } catch (err) {
        if (err.status === 401) {
          setErrMsg(err?.data?.message)
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
    <Account props={'admin-password'}>
      <div className={classes.AccountPassword}>
        {' '}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          {errMsg && (
            <small className={classes.AccountPassword__Message}>{errMsg}</small>
          )}
          <Row justify={'space-between'} gutter={20}>
            <Col span={8}>
              {' '}
              <Form.Item
                label={
                  <p
                    style={{
                      marginTop: '10px',
                      marginBottom: '-10px',
                      fontSize: '13.5px',
                    }}
                  >
                    Old Password
                  </p>
                }
                name="old_password"
                style={{ marginTop: '-1rem' }}
                required
              >
                <Input.Password
                  prefix={
                    <img src={PasswordKeyIcon} alt="" srcSet="" sizes="40px" />
                  }
                  className={classes.AccountPassword__Password}
                  placeholder="Enter old password"
                  style={{ marginTop: '-1px' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {' '}
              <Form.Item
                label={
                  <p
                    style={{
                      marginTop: '10px',
                      marginBottom: '-10px',
                      fontSize: '13.5px',
                    }}
                  >
                    Password
                  </p>
                }
                name="new_password"
                style={{ marginTop: '-1rem' }}
                required
              >
                <Input.Password
                  prefix={
                    <img src={PasswordKeyIcon} alt="" srcSet="" sizes="40px" />
                  }
                  className={classes.AccountPassword__Password}
                  placeholder="Enter new password"
                  style={{ marginTop: '-1px' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <p
                    style={{
                      marginTop: '10px',
                      marginBottom: '-10px',
                      fontSize: '13.5px',
                    }}
                  >
                    Confirm Password
                  </p>
                }
                name="confirm_password"
                style={{ marginTop: '-1rem' }}
                required
              >
                <Input.Password
                  prefix={
                    <img src={PasswordKeyIcon} alt="" srcSet="" sizes="40px" />
                  }
                  className={classes.AccountPassword__Password}
                  placeholder="Confirm new password"
                  style={{ marginTop: '-1px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row justify={'end'} gutter={20}>
              <Col span={8}>
                <FormButton
                  type={'submit'}
                  action={'Save changes'}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Account>
  )
}

export default AccountPassword
