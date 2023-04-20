import { Row, Form, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

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
import { saveToLocalStorage } from '../../../../utils/helpers'
import {
  addressValidation,
  nameValidation,
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

  const [errMsg, setErrMsg] = useState('')
  const [formValid, setFormValid] = useState(false)
  const navigate = useNavigate()
  const [customerUpdateDetails, { isLoading }] =
    useCustomerUpdateDetailsMutation()
  const handlePhoneRegEx = (e, ref, message) => {
    phoneValidation(e, ref, message)
  }
  const handleNameRegEx = (e, ref, message) => {
    nameValidation(e, ref, message)
  }
  const handleAddressRegEx = (e, ref, message) => {
    addressValidation(e, ref, message)
  }

  const onFinish = async (values) => {
    try {
      await customerUpdateDetails({
        credentials: values,
      }).unwrap()
      navigate('/business')
      saveToLocalStorage('userInfo', values)
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  useEffect(() => {
    fnameRef.current.innerHTML = ''
    lnameRef.current.innerHTML = ''
    phoneRef.current.innerHTML = ''
    addyRef.current.innerHTML = ''
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
            {errMsg && <Error Errormsg={errMsg} />}
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
                label={
                  <p style={{ marginBottom: '-10px', marginTop: '5px' }}>
                    First Name
                  </p>
                }
                name="first_name"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                extra={
                  <p
                    ref={fnameRef}
                    style={{
                      fontSize: '12px',
                      marginBottom: '-10px',
                      marginTop: '5px',
                    }}
                  >
                    fnameRef.current
                  </p>
                }
              >
                <Input
                  onChange={(e) =>
                    nameValidation(
                      e,

                      fnameRef,

                      'Please enter only alphabetic characters',
                    )
                  }
                  className={classes.DetailsForm__Input}
                  style={{ marginBottom: '-10px' }}
                  placeholder="Enter your first name"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label={
                  <p style={{ marginBottom: '-10px', marginTop: '-5px' }}>
                    Last Name
                  </p>
                }
                name="last_name"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                extra={
                  <p
                    ref={lnameRef}
                    style={{
                      fontSize: '12px',
                      marginBottom: '-10px',
                      marginTop: '5px',
                    }}
                  >
                    lnameRef.current
                  </p>
                }
              >
                <Input
                  onChange={(e) =>
                    nameValidation(
                      e,

                      fnameRef,

                      'Please enter only alphabetic characters',
                    )
                  }
                  className={classes.DetailsForm__Input}
                  style={{ marginTop: '-4px' }}
                  placeholder="Enter your last name"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label={
                  <p style={{ marginTop: '-7px', marginBottom: '-10px' }}>
                    Phone Number
                  </p>
                }
                name="phone"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                extra={
                  <p
                    ref={phoneRef}
                    style={{
                      fontSize: '12px',
                      marginBottom: '-10px',
                      marginTop: '5px',
                    }}
                  >
                    phoneRef.current
                  </p>
                }
              >
                <Input
                  maxLength={15}
                  onChange={(e) =>
                    phoneValidation(
                      e,
                      phoneRef,

                      'Enter a valid phone number.',
                    )
                  }
                  className={classes.DetailsForm__Input}
                  style={{ marginBottom: '1px', marginTop: '-10xp' }}
                  placeholder="Example +234-XXX-XXXX"
                />
              </Form.Item>
              <Form.Item
                className={classes.DetailsForm__Elem}
                label={<p>Address</p>}
                name="address"
                required
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
                extra={
                  <p
                    ref={addyRef}
                    style={{
                      fontSize: '12px',
                      marginBottom: '-10px',
                      marginTop: '5px',
                    }}
                  >
                    addyRef.current
                  </p>
                }
              >
                <Input.TextArea
                  onChange={(e) =>
                    addressValidation(
                      e,
                      addyRef,
                      'No use of special characters.',
                    )
                  }
                  className={classes.DetailsForm__Input}
                  style={{ marginTop: '-20px' }}
                  placeholder="Enter a Address..."
                />
              </Form.Item>
              <Form.Item>
                <FormButton
                  action={'Continue'}
                  isLoading={isLoading}
                  // validate={!formValid}
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
