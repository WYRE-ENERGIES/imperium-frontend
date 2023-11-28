import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Form, Input } from 'antd'
import { useLoginMutation } from '../../../../features/slices/auth/authApiSlice'

import { getItemFromLocalStorage } from '../../../../utils/helpers'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'

import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'

import imageDesc from '../../../../../src/assets/Auth/adminlogo.svg'
import classes from './AdminSignIn.module.scss'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'

const AdminSignIn = () => {
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
      setErrMsg(ErrorMessage(err?.data?.message))
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/admin/overview')
    }
  })
  return (
    <section className={classes.AdminSignPage}>
      <Row className={classes.AdminSignPage__Layout}>
        <LeftLayout>
          <div className={classes.AdminSignPage__LoginForm}>
            <FormHeader
              header={'Log In'}
              tagline={'Welcome back! Please enter your details.'}
            />
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
                  className={classes.AdminSignPage__Input}
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
                extra={
                  <Link
                    to={'/admin/forgot-password/'}
                    style={{ color: 'grey' }}
                  >
                    Can’t remember password ?
                  </Link>
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
                  className={classes.AdminSignPage__Password}
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
                footerlink={'/admin/sign-up'}
              /> */}
            </Form>
          </div>
        </LeftLayout>

        <Col span={12} className={classes.AdminSignPage__RightLayOut}>
          <RightLayout span={24} backgroundColor={'none'}>
            <FormDescription content={formDescription} />{' '}
          </RightLayout>
        </Col>
      </Row>
    </section>
  )
}

export default AdminSignIn
