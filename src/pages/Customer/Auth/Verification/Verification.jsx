import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import '../../../../components/Auth/Forms/global.module.scss'
import { Row, Form, Input } from 'antd'

import { useCustomerVerificationCodeMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
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
const Verification = () => {
  const email = useLocation()
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
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      await customerVerificationCode({
        email: 'email.state.email',
        otp: values.otp,
      }).unwrap()
      navigate('/details')
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  useEffect(() => {
    if (data) {
      const access_code = data?.message?.tokens?.access
      saveToLocalStorage('access', access_code)
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
                tagline={` We just sent you a temporary one time pin to ${email?.state?.email}. Please check your inbox!`}
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
                    OTP CODE
                  </p>
                }
                name="otp"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                required
              >
                <Input
                  className={classes.Verification__Input}
                  placeholder="Enter code"
                  style={{ marginTop: '-1rem' }}
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
