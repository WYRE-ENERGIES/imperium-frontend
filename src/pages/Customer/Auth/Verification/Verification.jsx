import React, { useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import '../../../../components/Auth/Forms/global.module.scss'
import { Row, Form, Input } from 'antd'

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
import {
  emptyLocalStorage,
  saveToLocalStorage,
} from '../../../../utils/helpers'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
const Verification = () => {
  const email = useLocation()
  const pwdRef = useRef(null)
  const emailRef = useRef()
  const [searchParams] = useSearchParams()
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
  const emailInvite = searchParams.get('email')
  const [OTP, setOTP] = useState('')
  const [resendCustomerOtp, { isLoading: otpisLoading, reSendData }] =
    useResendCustomerOtpMutation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log('verifications values', values)
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
  const handleResendOtp = async () => {
    console.log('Email values>>>>>>> ', email)
    const resendparams = {
      email: email.state.email,
      password: data?.password,
    }
    try {
      console.log('Looking for values>>>>>>> ', resendparams)
      await resendCustomerOtp({ resendparams }).unwrap()
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

  useEffect(() => {
    console.log('whats here: ', reSendData)
    if (reSendData) {
      navigate('/verification', {
        state: { email: email.state.email, password: data?.password },
      })
    }
  })
  useEffect(() => {
    console.log('email-invite here: ', emailInvite)
    if (emailInvite) {
      emptyLocalStorage()
    }
  }, [emailInvite])

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
                {errMsg && (
                  <Form.Item>
                    <button
                      onClick={handleResendOtp}
                      className={classes.Otp__Resend}
                    >
                      send again
                    </button>
                  </Form.Item>
                )}
              </div>
              <Form.Item
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
