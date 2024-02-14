import { Row, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import '../../../../components/Auth/Forms/global.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Sun energy-amico 1.svg'
import classes from './SignIn.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../../features/slices/auth/authApiSlice'
import { getItemFromLocalStorage } from '../../../../utils/helpers'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { sha256 } from 'js-sha256'

const SignIn = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Welcome Back!',
    tagline: 'Login to keep updated the imperium way.',
    ImgHeight: '3px',
  }
  const [errMsg, setErrMsg] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const accessToken = getItemFromLocalStorage('access')

  const onFinish = async (values) => {
    try {
      values.password = sha256(values.password)
      await login({
        credentials: values,
        endpoint: '/auth/login/',
      }).unwrap()
      navigate('/overview')
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.message || err?.data?.email))
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/overview')
    }
  })

  return (
    <section className={classes.SignInPage}>
      <Row className={classes.SignInPage__Layout}>
        <LeftLayout className={classes.SignInPage__LeftLayOut}>
          <div className={classes.SignInPage__Form}>
            {' '}
            <div>
              <FormHeader
                header={'Log In'}
                tagline={'Welcome back! Please enter your details.'}
              />
            </div>
            {/* <div>
              <ThirdPartyAuth signIn={true} />
            </div> */}
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
                {errMsg && <Error Errormsg={errMsg} />}

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <small>This field is required.</small>,
                    },
                  ]}
                  required
                >
                  <Input
                    className={classes.SignInPage__Input}
                    placeholder="Enter your email"
                    style={{ marginTop: '-1rem' }}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  extra={
                    <Link
                      to={'/forgot-password/'}
                      style={{ color: 'grey', fontSize: '14px' }}
                    >
                      Can’t remember password ?
                    </Link>
                  }
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <small>This field is required.</small>,
                    },
                  ]}
                >
                  <Input.Password
                    className={classes.SignInPage__Password}
                    placeholder="Enter a password"
                    style={{ marginTop: '-1px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <FormButton action={'Log In'} isLoading={isLoading} />
                </Form.Item>

                {/* <FormFooter
                  footer={'Don’t have an account?'}
                  action={'Sign Up'}
                  footerlink={'/sign-up'}
                /> */}
              </Form>
            </div>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.SignInPage__RightLayOut}>
            <FormDescription content={formDescription} />
          </div>
        </RightLayout>
      </Row>
    </section>
  )
}

export default SignIn
