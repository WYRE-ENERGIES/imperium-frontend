import { Row, Form, Input } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import imageDesc from '../../../../../src/assets/Auth/Multi-device targeting-pana 1.svg'
import classes from './SignUp.module.scss'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getItemFromLocalStorage } from '../../../../utils/helpers'
import { useEffect } from 'react'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import { useCustomerRegisterMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'

const SignUp = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Sign into your account from any device.',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '2px',
  }
  const [errMsg, setErrMsg] = useState('')
  const [customerRegister, { isLoading }] = useCustomerRegisterMutation()
  const navigate = useNavigate()

  const accessToken = getItemFromLocalStorage('access')
  const onFinish = async (values) => {
    try {
      await customerRegister({
        credentials: values,
      }).unwrap()
      navigate('/')
    } catch (err) {
      if (err.status === 401) {
        setErrMsg(err?.data?.detail)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.email)
      } else if (err.status === 500) {
        setErrMsg('Cannot connect to server.')
      } else {
        setErrMsg('Check your internet connection')
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
              <ThirdPartyAuth />
            </div>
            <div>
              <Form
                name="admin-login"
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
                {errMsg && (
                  <small className={classes.SignUpPage__Message}>
                    {errMsg}
                  </small>
                )}

                <Form.Item
                  label={
                    <p
                      style={{
                        marginBottom: '2px',
                        marginTop: '20px',
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
                >
                  <Input
                    className={classes.SignUpPage__Input}
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
                  extra={'Must be at least 8 characters.'}
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
                    className={classes.SignUpPage__Password}
                    placeholder="Enter a password"
                    style={{ marginTop: '-1px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <FormButton action={'Create account'} isLoading={isLoading} />
                </Form.Item>

                <FormFooter
                  extra={
                    <p>
                      By selecting <strong>Create account</strong>. I agree to
                      imperium’s{' '}
                      <span style={{ color: '#5C9D48' }}>
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
          <div className={classes.SignUp__content}>
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
