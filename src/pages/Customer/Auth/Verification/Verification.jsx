import React, { useState } from 'react'
import {
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import '../../../../components/Auth/Forms/global.module.scss'
import { Row, Form, Input, notification, InputNumber } from 'antd'

import {
  useCustomerVerificationCodeMutation,
  useResendCustomerOtpMutation,
} from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import imageDesc from '../../../../../src/assets/Auth/Analyze-amico 1.svg'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Verification.module.scss'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import { useEffect } from 'react'
import { saveToLocalStorage } from '../../../../utils/helpers'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { sha256 } from 'js-sha256'
const Verification = () => {
  const email = useLocation()
  const openNotification = (email) => {
    notification.success({
      message: 'OTP sent!',
      description: `OPT resent to ${email}`,
    })
  }
  const formDescription = {
    image: imageDesc,
    header: 'Graphs and charts',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '2px',
  }
  const [errMsg, setErrMsg] = useState('')
  const [customerVerificationCode, { data, isLoading }] =
    useCustomerVerificationCodeMutation()

  const [resendCustomerOtp, { isLoading: otpIsLoading }] =
    useResendCustomerOtpMutation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      await customerVerificationCode({
        email: email.state.email,
        otp: values.otp,
      }).unwrap()
      navigate('/details')
      saveToLocalStorage('userInfo', { email: email.state.email })
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.detail))
    }
  }
  const handleResendOtp = async (e) => {
    e.preventDefault()
    const resendparams = {
      email: email.state.email,
      password: data?.password,
    }
    try {
      resendparams.password = sha256(resendparams.password)
      await resendCustomerOtp({ resendparams }).unwrap()
      openNotification(email?.state?.email)
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.errors))
    }
  }

  useEffect(() => {
    if (data) {
      const { token } = data
      saveToLocalStorage('access', token)
    }
  }, [data])

  return (
    <div className={classes.Verification}>
      <Row className={classes.Verification__Layout}>
        <LeftLayout>
          <div className={classes.Verification__Form}>
            <div>
              <FormHeader
                header={'Verification Code Sent'}
                tagline={` We just sent a temporary one time pin to ${email?.state?.email}. Please check your inbox!`}
              />
            </div>
            <Form
              name="verification"
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
              <div className={classes.Verification__Error}>
                {errMsg && <Error Errormsg={errMsg} />}
                <div className={classes.Otp}>
                  {errMsg && (
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '5px',
                        marginBottom: '8px',
                      }}
                    >
                      Need a new code?{' '}
                      <button
                        onClick={handleResendOtp}
                        className={classes.Otp__Resend}
                        disabled={otpIsLoading}
                      >
                        <span>Resend</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Form.Item
                style={{ paddingTop: '10px' }}
                label={
                  <p
                    style={{
                      marginBottom: '2px',
                      marginTop: '20px',
                      fontSize: '13.5px',
                    }}
                  >
                    OTP CODE
                  </p>
                }
                name="otp"
                rules={[
                  {
                    required: true,
                    message: <small>This filed is required</small>,
                  },
                ]}
                required
              >
                <Input
                  className={classes.Verification__Input}
                  placeholder="Enter code"
                  style={{ marginTop: '-1rem' }}
                  maxLength={4}
                  min={1}
                  max={4}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  // max={9999}
                />
              </Form.Item>

              <Form.Item>
                <FormButton action={'Continue'} isLoading={isLoading} />
              </Form.Item>
            </Form>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.Verification__content}>
            <FormDescription content={formDescription} />
          </div>
          <div>
            <PageIndicator pageNum={1} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Verification
