import React from 'react'
import { Form, Input } from 'antd'
import FormHeader from '../../../Widgets/FormHeader'
import classes from './ForgetPasswordForm.module.scss'
import icon from '../../../../../../../src/assets/Auth/Group 18.svg'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../../Widgets/FormButton'
const ForgotPasswordForm = () => {
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/otp')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={classes.ForgotPassword}>
      <div className={classes.ForgotPassword__FormContent}>
        <h1 className={classes.ForgotPassword__header}>Forgot password</h1>

        <div className={classes.ForgotPassword__Form}>
          <div>
            <img src={icon} alt="" srcSet="" />
          </div>
          <div className={classes.ForgotPassword__FormText}>
            {' '}
            <FormHeader
              header={'Forgot password'}
              tagline={'Link would be sent to your email address'}
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
            <Form.Item label="" name="email" required>
              <Input placeholder="nisha@uitrend.com" />
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

export default ForgotPasswordForm
