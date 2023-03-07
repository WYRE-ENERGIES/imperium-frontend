import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Form, Input } from 'antd'
import { useLoginMutation } from '../../../../features/slices/auth/authApiSlice'

import { getItemFromLocalStorage } from '../../../../utils/helpers'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'

import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'

import imageDesc from '../../../../../src/assets/Auth/adminlogo.svg'
import classes from './AdminSignUp.module.scss'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'

const AdminSignUp = () => {
  const formDescription = {
    image: imageDesc,
    header: '',
    tagline:
      'As an admin, you can view energy analytics and panel data through charts and graphs, set shut down and turn on timers, and access battery information on our platform.',
  }
  const [errMsg, setErrMsg] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const accessToken = getItemFromLocalStorage('access')

  const onFinish = async (values) => {
    try {
      await login({
        credentials: values,
        endpoint: 'imperium-admin/auth/login/',
      }).unwrap()
      navigate('/admin/overview')
    } catch (err) {
      if (err.status === 401) {
        setErrMsg(err?.data?.detail)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.message)
      } else if (err.status === 500) {
        setErrMsg('Cannot connect to server.')
      } else {
        setErrMsg('Check your internet connection')
      }
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/admin/overview')
    }
  })
  return (
    <section className={classes.AdminSignUpPage}>
      <Row className={classes.AdminSignUpPage__Layout}>
        <LeftLayout>
          <div className={classes.AdminSignUpPage__LoginForm}>
            <FormHeader
              header={'Create Account'}
              tagline={'Let’s get started with imperium today'}
            />
            <ThirdPartyAuth />
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
                <small className={classes.UserForm__Message}>{errMsg}</small>
              )}

              <Form.Item
                label={
                  <p
                    style={{
                      marginBottom: '2px',
                      marginTop: '-10px',
                      fontSize: '13.5px',
                    }}
                  >
                    First Name
                  </p>
                }
                name="first-name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                required
              >
                <Input
                  className={classes.AdminSignUpPage__Input}
                  placeholder="Enter first name"
                  style={{ marginTop: '-1rem', marginBottom: '-100px' }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <p
                    style={{
                      marginBottom: '2px',
                      marginTop: '-20px',
                      fontSize: '13.5px',
                    }}
                  >
                    Last Name
                  </p>
                }
                name="last-name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                required
              >
                <Input
                  className={classes.AdminSignUpPage__Input}
                  placeholder="Enter last name"
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
                  className={classes.AdminSignUpPage__Password}
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
                footerlink={'/admin'}
              />
            </Form>
          </div>
        </LeftLayout>

        <Col span={12} className={classes.AdminSignUpPage__RightLayOut}>
          <RightLayout span={24} backgroundColor={'none'}>
            <FormDescription content={formDescription} />{' '}
          </RightLayout>
        </Col>
      </Row>
    </section>
  )
}

export default AdminSignUp
