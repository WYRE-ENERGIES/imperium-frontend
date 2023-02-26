import React from 'react'
import { Form, Input } from 'antd'
import classes from './ForgetPasswordForm.module.scss'
import UserForm from '../../UserForm'
const ForgotPasswordForm = () => {
  return (
    <div className={classes.ForgotPassword}>
      <div>
        <UserForm formContent={{ btnText: 'Continue' }}>
          <Form.Item label="" name="email" required>
            <Input
              className={classes.ForgotPassword__Input}
              placeholder="nisha@uitrend.com"
            />
          </Form.Item>
        </UserForm>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
