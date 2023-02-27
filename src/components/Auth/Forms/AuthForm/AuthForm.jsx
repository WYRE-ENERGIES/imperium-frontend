import { Form, Input } from 'antd'

import React from 'react'
import ThirdPartyAuth from '../Widgets/ThirdPartyAuth'
import classes from './AuthForm.module.scss'
import UserForm from './UserForm'

const AuthForm = ({ children, authContentSelection, client }) => {
  const AuthContent = [
    {
      header: 'Sign Up',
      tag: 'Let’s get started with imperium today',
      footer: 'Already have an account?',
      action: 'Log In',
      helpertext: 'Must be at least 8 characters.',
      btnText: 'Create account',
      footerlink: '/',
      endpoint: 'register',
    },
    {
      header: 'Log In',
      tag: 'Welcome back! Please enter your details.',
      footer: 'Don’t have an account?',
      action: 'Sign Up',
      helpertext: 'Can’t remember password ?',
      btnText: 'Log In',
      footerlink: '/sign-up',
      endpoint: 'login',
      navigate: client === 'admin' ? '/admin/overview' : '/overview',
    },
  ]
  const formContent =
    authContentSelection === 'signin' ? AuthContent[1] : AuthContent[0]
  return (
    <div className={classes.authForm}>
      <UserForm
        labelCol={8}
        wrapperCol={32}
        formContent={formContent}
        name="auth-form"
        extras={children}
      >
        {' '}
        {client === 'admin' ? '' : <ThirdPartyAuth />}
        <section>
          <section>
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
              name="email"
              rules={[
                {
                  required: true,
                  message: 'This field is required.',
                },
              ]}
            >
              <Input
                className={classes.authForm__Input}
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
              extra={formContent.helpertext}
              name="password"
              style={{ marginTop: '-1rem' }}
              rules={[
                {
                  required: true,
                  message: 'This field is required.',
                },
              ]}
            >
              <Input.Password
                className={classes.authForm__Password}
                placeholder="Create a password"
                style={{ marginTop: '-1px' }}
              />
            </Form.Item>
          </section>
        </section>
      </UserForm>
    </div>
  )
}

export default AuthForm
