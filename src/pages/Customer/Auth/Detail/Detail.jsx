import { Row, Form, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import jwt_decode from 'jwt-decode'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Details.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Site Stats-amico 1.svg'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import { useCustomerUpdateDetailsMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import {
  getItemFromLocalStorage,
  saveToLocalStorage,
} from '../../../../utils/helpers'
import {
  addressValidation,
  phoneValidation,
} from '../../../../components/RegEx/RegEx'

const Details = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Energy Analytics Dashboard',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '3px',
  }
  const fnameRef = useRef('')
  const lnameRef = useRef('')
  const phoneRef = useRef('')
  const addyRef = useRef('')
  const userInfo = getItemFromLocalStorage('userInfo')
  const token = getItemFromLocalStorage('access')

  const [errMsg, setErrMsg] = useState('')
  const [formValid, setFormValid] = useState(false)
  const navigate = useNavigate()
  const [customerUpdateDetails, { isLoading }] =
    useCustomerUpdateDetailsMutation()

  const onFinish = async (values) => {
    try {
      await customerUpdateDetails({
        credentials: { ...values, phone: `+234${values?.phone}` },
      }).unwrap()
      navigate('/business')
      saveToLocalStorage('userInfo', { ...userInfo, ...values })
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.message))
    }
  }
  useEffect(() => {
    saveToLocalStorage('user_role', jwt_decode(token)?.user_role)
  })

  return (
    <div className={classes.DetailsForm}>
      <Row>
        <LeftLayout>
          <div className={classes.DetailsForm__Form}>
            <div>
              <FormHeader
                header={'Details'}
                tagline={'Please fill in some details'}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              {' '}
              {errMsg && <Error Errormsg={errMsg} />}
            </div>
            <Form
              name="details"
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
              <Form.Item
                className={classes.DetailsForm__Elem}
                label="First name"
                name="first_name"
                required
                rules={[
                  {
                    required: true,
                    message: <small>This field is required.</small>,
                  },
                ]}
                extra={<small ref={fnameRef}></small>}
                style={{ marginTop: '10px' }}
              >
                <Input
                  // onChange={(e) =>
                  //   nameValidation(
                  //     e,

                  //     fnameRef,

                  //     "Numbers and '!@#$%^&*()+=_`' are not valid characters.",
                  //     setFormValid,
                  //   )
                  // }
                  className={classes.DetailsForm__Input}
                  style={{ marginBottom: '-10px' }}
                  placeholder="Enter your first name"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label="Last name"
                name="last_name"
                required
                rules={[
                  {
                    required: true,
                    message: <small>This field is required.</small>,
                  },
                ]}
                extra={<small ref={lnameRef}></small>}
                style={{ marginTop: '-25px' }}
              >
                <Input
                  // onChange={(e) =>
                  //   nameValidation(
                  //     e,
                  //     lnameRef,
                  //     "Numbers and '!@#$%^&*()+=_`' are not valid characters.",
                  //     setFormValid,
                  //   )
                  // }
                  className={classes.DetailsForm__Input}
                  style={{ marginTop: '-4px' }}
                  placeholder="Enter your last name"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label="Phone number"
                name="phone"
                required
                rules={[
                  {
                    required: true,
                    message: <small>This field is required.</small>,
                  },
                ]}
                extra={<small ref={phoneRef}></small>}
                style={{ marginTop: '-25px' }}
              >
                <Input
                  maxLength={11}
                  addonBefore="+ 234"
                  onChange={(e) =>
                    phoneValidation(
                      e,
                      phoneRef,

                      'Invalid phone number',
                      setFormValid,
                    )
                  }
                  className={classes.DetailsForm__Phone}
                  style={{ marginBottom: '1px', marginTop: '-10xp' }}
                  placeholder=" 08012345678"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label="Address"
                name="address"
                required
                rules={[
                  {
                    required: true,
                    message: <small>This field is required.</small>,
                  },
                ]}
                extra={<small ref={addyRef}></small>}
                style={{ marginTop: '-25px' }}
              >
                <Input.TextArea
                  onChange={(e) =>
                    addressValidation(
                      e,
                      addyRef,
                      "'!@#$%^&*()+=-_`' are not valid characters.",
                      setFormValid,
                    )
                  }
                  className={classes.DetailsForm__Input}
                  placeholder="Enter a Address..."
                />
              </Form.Item>
              <Form.Item style={{ marginTop: '-25px' }}>
                <FormButton
                  action={'Continue'}
                  isLoading={isLoading}
                  validate={!formValid}
                />
              </Form.Item>
            </Form>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.DetailsForm__Detail}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.Detail__Indicator}>
            <PageIndicator pageNum={2} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Details
