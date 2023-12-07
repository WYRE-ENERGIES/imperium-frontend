import { Col, Form, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import ThirdPartyAuth from '../../../../components/Auth/Forms/Widgets/ThirdPartyAuth'
import classes from './AdminSignUp.module.scss'
import { getItemFromLocalStorage } from '../../../../utils/helpers'
import imageDesc from '../../../../../src/assets/Auth/adminlogo.svg'
import { useRegisterUserMutation } from '../../../../features/slices/auth/authApiSlice'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'

const AdminSignUp = () => {
  const formDescription = {
    image: imageDesc,
    header: '',
    tagline:
      'As an admin, you can view energy analytics and panel data through charts and graphs, set shut down and turn on timers, and access battery information on our platform.',
  }
  const [errMsg, setErrMsg] = useState('')
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const accessToken = getItemFromLocalStorage('access')

  const onFinish = async (values) => {
    try {
      await registerUser({
        credentials: { ...values, email },
        endpoint: '/imperium-admin/auth/register-user/',
      }).unwrap()

      navigate('/admin/sign-in')
    } catch (err) {
      setErrMsg(ErrorMessage(err))
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
            {/* <ThirdPartyAuth signIn={false} /> */}
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
                name="first_name"
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
                name="last_name"
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
                footerlink={'/admin/sign-in'}
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
