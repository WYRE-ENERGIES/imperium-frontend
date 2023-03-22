import { Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountPassword.module.scss'
import Account from '../Account'
import passwordKeyIcon from '../../../../assets/Auth/passwordIcon.svg'
import { useCustomerChangePasswordMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'

const AccountPassword = () => {
  const [form] = Form.useForm()
  const [errMsg, setErrMsg] = useState('')
  const [customerChangePassword, { isLoading }] =
    useCustomerChangePasswordMutation()
  const onFinish = async (values) => {
    console.log('Finish:', values)
    try {
      await customerChangePassword({
        credentials: values,
      }).unwrap()
    } catch (err) {
      setErrMsg(ErrorMessage(err))
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
          <Row justify={'space-between'} gutter={32}>
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
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
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
                name="new_password1"
                style={{ marginTop: '-1rem' }}
                required
              >
                <Input.Password
                  prefix={
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
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
                name="new_password2"
                style={{ marginTop: '-1rem' }}
                required
              >
                <Input.Password
                  prefix={
                    <img src={passwordKeyIcon} alt="" srcSet="" sizes="40px" />
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
                <FormButton action={'Save changes'} isLoading={isLoading} />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Account>
  )
}

export default AccountPassword
