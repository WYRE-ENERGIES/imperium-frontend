import React from 'react'
import { Form, Input } from 'antd'
import UserForm from '../../UserForm'
import classes from './NewPasswordForm.module.scss'
const NewPasswordForm = () => {
  return (
    <div className={classes.NewPassword}>
      <div>
        <UserForm formContent={{ btnText: 'Continue' }}>
          <Form.Item label="Password" name="password-1" required>
            <Input.Password
              className={classes.NewPassword__Password}
              placeholder="Create a password"
            />
          </Form.Item>
          <Form.Item label="Confirm Password" name="password-2" required>
            <Input.Password
              className={classes.NewPassword__Password}
              placeholder="Confirm password"
            />
          </Form.Item>
        </UserForm>
      </div>
    </div>
  )
}

export default NewPasswordForm
