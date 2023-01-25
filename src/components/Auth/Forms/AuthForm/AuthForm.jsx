import { Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import FormButton from '../Widgets/FormButton'
import FormFooter from '../Widgets/FormFooter'
import FormHeader from '../Widgets/FormHeader'
import ThirdPartyAuth from '../Widgets/ThirdPartyAuth'
import classes from './AuthForm.modules.scss'

const AuthForm = ({ children, props }) => {
  const { header, tag, helpertext, footer, action, url, btnText } = props
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    nextPage('verification/code')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={classes.authForm}>
      {' '}
      <FormHeader header={header} tagline={tag} />
      <ThirdPartyAuth />
      <div>
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
          <Form.Item
            label={
              <p
                style={{
                  marginBottom: '2px',
                  marginTop: '-10px',
                  fontSize: '13.5px',
                }}
              >
                Email
              </p>
            }
            name="Email"
            required
          >
            <Input
              placeholder="Enter your email"
              style={{ marginTop: '-1rem' }}
            />
          </Form.Item>

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
            extra={helpertext}
            name="password"
            style={{ marginTop: '-1rem' }}
            required
          >
            <Input.Password
              placeholder="Create a password"
              style={{ marginTop: '-1px' }}
            />
          </Form.Item>

          <Form.Item>
            <FormButton type={'submit'} action={btnText} icon={''} />
          </Form.Item>
        </Form>
      </div>
      <div>
        {children}
        <FormFooter footer={footer} action={action} url={url} />
      </div>
    </div>
  )
}

export default AuthForm
