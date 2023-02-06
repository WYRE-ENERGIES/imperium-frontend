import React from 'react'
import { Form, Input } from 'antd'
import FormHeader from '../../../Widgets/FormHeader'
import classes from './NewPasswordForm.module.scss'
import icon from '../../../../../../../src/assets/Auth/Frame 1707478103.svg'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../../Widgets/FormButton'
const NewPasswordForm = () => {
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={classes.NewPassword}>
      <div className={classes.NewPassword__FormContent}>
        <h1 className={classes.NewPassword__header}>Forgot password</h1>

        <div className={classes.NewPassword__Form}>
          <div>
            <img src={icon} alt="" srcSet="" />
          </div>
          <div className={classes.NewPassword__FormText}>
            {' '}
            <FormHeader
              header={'Forgot password'}
              tagline={'Create new password'}
            />
          </div>
        </div>
        <div className="Form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 32,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            requiredMark="optional"
          >
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

            <Form.Item>
              <FormButton type={'submit'} action={'Continue'} icon={''} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default NewPasswordForm
