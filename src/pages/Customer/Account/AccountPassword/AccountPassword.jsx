import { Col, Form, Input, Row, notification } from 'antd'
import React, { useState } from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountPassword.module.scss'
import Account from '../Account'
import passwordKeyIcon from '../../../../assets/Auth/passwordIcon.svg'
import { useCustomerChangePasswordMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { useRef } from 'react'
import { passwordLengthValidation } from '../../../../components/RegEx/RegEx'
import { sha256 } from 'js-sha256'

const AccountPassword = () => {
  const [form] = Form.useForm()
  const pwdRef1 = useRef(null)
  const pwdRef2 = useRef(null)
  const [formValid, setFormValid] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [customerChangePassword, { isLoading }] =
    useCustomerChangePasswordMutation()
  const openNotification = () => {
    notification.success({
      message: 'Successful',
      description: `Password successfully updated.`,
    })
  }
  const onFinish = async (values) => {
    if (values.new_password1 === values.old_password) {
      setErrMsg('Old password can not be new password.')
    } else if (values.new_password1 !== values.new_password2) {
      setErrMsg("New passwords don't match")
    } else
      try {
        values.new_password1 = sha256(values.new_password1)
        values.new_password2 = sha256(values.new_password2)
        await customerChangePassword({
          credentials: values,
        }).unwrap()
        setErrMsg('')
        openNotification()
      } catch (err) {
        setErrMsg(ErrorMessage(err?.data?.old_password?.message))
      }
  }
  return (
    <Account props={'password'}>
      <div className={classes.AccountPassword}>
        {' '}
        {errMsg && <Error Errormsg={errMsg} />}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <div className={classes.AccountPassword__Form}>
            <Col>
              {' '}
              <Form.Item
                label="Old password"
                name="old_password"
                style={{ marginTop: '-1rem' }}
                rules={[
                  {
                    required: true,
                    message: <small>This filed is required</small>,
                  },
                ]}
                extra={<small>Password should match current password</small>}
              >
                <Input.Password
                  prefix={
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
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
                label="New password"
                name="new_password1"
                style={{ marginTop: '-1rem' }}
                required
                extra={<small ref={pwdRef1}></small>}
                rules={[
                  {
                    required: true,
                    message: <small>This filed is required</small>,
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
                  }
                  className={classes.AccountPassword__Password}
                  placeholder="Enter new password"
                  style={{ marginTop: '-1px' }}
                  onChange={(e) =>
                    passwordLengthValidation(
                      e,
                      pwdRef1,
                      'Must be at least 8 characters.',
                      setFormValid,
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Confirm password"
                name="new_password2"
                style={{ marginTop: '-1rem' }}
                required
                extra={<small ref={pwdRef2}></small>}
                rules={[
                  {
                    required: true,
                    message: <small>This filed is required</small>,
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
                  }
                  className={classes.AccountPassword__Password}
                  placeholder="Confirm new password"
                  style={{ marginTop: '-1px' }}
                  onChange={(e) =>
                    passwordLengthValidation(
                      e,
                      pwdRef2,
                      'Must be at least 8 characters.',
                      setFormValid,
                    )
                  }
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
