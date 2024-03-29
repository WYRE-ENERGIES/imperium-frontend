import { Col, Form, Input, notification } from 'antd'
import React, { useState } from 'react'

import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountPassword.module.scss'
import Account from '../Account'
import PasswordKeyIcon from '../../../../assets/Auth/passwordIcon.svg'
import { useAdminChangePasswordMutation } from '../../../../features/slices/auth/admin/adminAuthApiSlice'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { sha256 } from 'js-sha256'

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
    if (values.new_password === values.old_password) {
      setErrMsg('Old password can not be new password.')
    } else if (values.new_password !== values.confirm_password) {
      setErrMsg("New passwords don't match")
    } else {
      try {
        values.new_password = sha256(values.new_password)
        values.old_password = sha256(values.old_password)
        await adminChangePassword({
          old_password: values.old_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        }).unwrap()
        openNotification()
        navigate('/admin/overview')
      } catch (err) {
        setErrMsg(ErrorMessage(err))
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
          {errMsg && <Error Errormsg={errMsg} />}
          <div className={classes.AccountPassword__Form}>
            <Col>
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
            <Col>
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
                    New Password
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
            <Col>
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
          </div>
          <Form.Item>
            <Col>
              <FormButton
                type={'submit'}
                action={'Save changes'}
                isLoading={isLoading}
              />
            </Col>
          </Form.Item>
        </Form>
      </div>
    </Account>
  )
}

export default AccountPassword
