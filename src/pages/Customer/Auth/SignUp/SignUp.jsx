import { Row, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import imageDesc from '../../../../../src/assets/Auth/Multi-device targeting-pana 1.svg'
import classes from './SignUp.module.scss'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItemFromLocalStorage } from '../../../../utils/helpers'

import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import { useCustomerRegisterMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { useRef } from 'react'
import validator from 'validator'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { passwordLengthValidation } from '../../../../components/RegEx/RegEx'
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
  const [pwdValid, setPwdValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [customerRegister, { isLoading }] = useCustomerRegisterMutation()
  const navigate = useNavigate()

  const handleEmailValidation = (e) => {
    if (validator.isEmail(e.target.value)) {
      emailRef.current.innerHTML = 'Email valid !'
      emailRef.current.style.color = 'green'
      setEmailValid(true)
    } else if (!validator.isEmail(e.target.value)) {
      emailRef.current.style.color = 'red'
      setEmailValid(false)
    }
  }
  const accessToken = getItemFromLocalStorage('access')
  const onFinish = async (values) => {
    try {
      await customerRegister({
        credentials: values,
      }).unwrap()
      navigate('/verification', { state: { email: values?.email } })
    } catch (err) {
      if (err.status === 400) {
        setErrMsg('User with this email already exists.')
      } else {
        setErrMsg(ErrorMessage(err))
      }
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/overview')
    }
  })

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
            <div>
              <ThirdPartyAuth signIn={false} />
            </div>
            <div>
              <Form
                name="customer-login"
                labelCol={8}
                wrapperCol={32}
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark="optional"
              >
                {errMsg && <Error Errormsg={errMsg} />}

                <Form.Item
                  label={
                    <p
                      style={{
                        marginBottom: '2px',
                        marginTop: '10px',
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
                  required
                  extra={
                    <p
                      ref={emailRef}
                      style={{
                        fontSize: '12px',
                        marginBottom: '-10px',
                      }}
                    >
                      Enter a valid email
                    </p>
                  }
                >
                  <Input
                    className={classes.SignUpPage__Input}
                    placeholder="Enter your email"
                    style={{ marginTop: '-1rem' }}
                    onChange={(e) => handleEmailValidation(e)}
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
                  extra={
                    <p
                      ref={pwdRef}
                      style={{
                        fontSize: '12px',
                        marginBottom: '-10px',
                      }}
                    >
                      Must be at least 8 characters.
                    </p>
                  }
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
                    onChange={(e) =>
                      passwordLengthValidation(e, pwdRef, setPwdValid)
                    }
                    className={classes.SignUpPage__Password}
                    placeholder="Enter a password"
                    style={{ marginTop: '-1px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <FormButton
                    action={'Create account'}
                    isLoading={isLoading}
                    validate={!emailValid || !pwdValid}
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
          <div>
            <PageIndicator pageNum={0} />
          </div>
        </RightLayout>
      </Row>
    </section>
  )
}

export default SignUp
