import { Row, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import imageDesc from '../../../../../src/assets/Auth/Multi-device targeting-pana 1.svg'
import classes from './SignUp.module.scss'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  emptyLocalStorage,
  getItemFromLocalStorage,
} from '../../../../utils/helpers'

import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import { useCustomerRegisterMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { useRef } from 'react'
import {
  emailValidation,
  passwordLengthValidation,
} from '../../../../components/RegEx/RegEx'
const SignUp = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Sign into your account from any device.',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
  }
  const pwdRef = useRef(null)
  const emailRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [customerRegister, { isLoading }] = useCustomerRegisterMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const emailInvite = searchParams.get('email')
  const accessToken = getItemFromLocalStorage('access')
  const onFinish = async (values) => {
    if (emailInvite && values.email !== emailInvite) {
      setErrMsg('Email does not match invitation email.')
      return
    }
    try {
      await customerRegister({
        credentials: values,
      }).unwrap()
      navigate('/verification', { state: { email: values?.email } })
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.email))
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/overview')
    }
  })
  useEffect(() => {
    if (emailInvite) {
      emptyLocalStorage()
    }
  }, [emailInvite])

  return (
    <section className={classes.SignUpPage}>
      <Row>
        <LeftLayout>
          <div className={classes.SignUpPage__Form}>
            {' '}
            <div>
              <FormHeader
                header={'Sign Up'}
                tagline={'Let’s get started with imperium today'}
              />
            </div>
            {/* <div>
              <ThirdPartyAuth signIn={false} />
            </div> */}
            <div>
              <Form
                name="customer-login"
                labelCol={8}
                wrapperCol={32}
                initialValues={{
                  email: emailInvite ? emailInvite : '',
                }}
                // onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
              >
                {errMsg && <Error Errormsg={errMsg} />}

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <small>This filed is required</small>,
                    },
                  ]}
                  required
                  extra={<small ref={emailRef}></small>}
                >
                  <Input
                    disabled={emailInvite ? true : false}
                    className={classes.SignUpPage__Input}
                    placeholder="Enter your email"
                    style={{ marginTop: '-1rem' }}
                    onChange={(e) =>
                      emailValidation(
                        e,
                        emailRef,
                        'Invalid email address',
                        setFormValid,
                      )
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  extra={
                    <small ref={pwdRef}>Must be at least 8 characters.</small>
                  }
                  name="password"
                  style={{ marginTop: '-1.5rem' }}
                  rules={[
                    {
                      required: true,
                      message: <small>This filed is required</small>,
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) =>
                      passwordLengthValidation(
                        e,
                        pwdRef,
                        'Must be at least 8 characters.',
                        setFormValid,
                      )
                    }
                    className={classes.SignUpPage__Password}
                    placeholder="Enter a password"
                    style={{ marginTop: '-1px' }}
                  />
                </Form.Item>
                <Form.Item style={{ marginTop: '-20px' }}>
                  <FormButton
                    action={'Create account'}
                    isLoading={isLoading}
                    validate={!formValid}
                  />
                </Form.Item>

                <FormFooter
                  extra={
                    <p style={{ fontSize: '14px', marginTop: '-16px' }}>
                      By selecting <strong>Create account</strong>. I agree to
                      imperium’s{' '}
                      <span style={{ color: '#5C9D48', fontSize: '14px' }}>
                        {' '}
                        privacy policy & terms
                      </span>
                    </p>
                  }
                  footer={'Already have an account?'}
                  action={'Log In'}
                  footerlink={'/'}
                />
              </Form>
            </div>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.SignUpPage__content}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.SignUpPage__PageIndicator}>
            <PageIndicator pageNum={0} />
          </div>
        </RightLayout>
      </Row>
    </section>
  )
}

export default SignUp
