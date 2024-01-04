import { Col, Form, Input, Row, notification } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import Error from '../../../../components/ErrorMessage/Error'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Loading from '../../../../components/Loading/Loading'
import {
  useCustomerGetDetailsQuery,
  useCustomerUpdateDetailsMutation,
} from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import {
  getItemFromLocalStorage,
  saveToLocalStorage,
} from '../../../../utils/helpers'
import Account from '../Account'
import classes from './AccounctDetails.module.scss'
import {
  addressValidation,
  nameValidation,
  phoneValidation,
} from '../../../../components/RegEx/RegEx'
import './accountDetail.css'

const AccountDetails = () => {
  const [details, setDetails] = useState(null)
  const [form] = Form.useForm()
  const userInfo = getItemFromLocalStorage('userInfo')
  const [phone, setPhone] = useState('')

  const fnameRef = useRef('')
  const lnameRef = useRef('')
  const phoneRef = useRef('')
  const addyRef = useRef('')

  const [errMsg, setErrMsg] = useState('')

  const [formValid, setFormValid] = useState(false)
  const { data: userData, isLoading: detailLoading } =
    useCustomerGetDetailsQuery()

  const [customerUpdateDetails, { data, isLoading }] =
    useCustomerUpdateDetailsMutation()

  const openNotification = () => {
    notification.success({
      message: 'Successful',
      description: `Details successfully updated.`,
    })
  }

  const handlePhoneChange = (value) => {
    phoneValidation(
      value,
      phoneRef,
      'Invalid phone number',
      setFormValid,
      isValidPhoneNumber,
    )
    setPhone(value)
  }

  const onFinish = async (values) => {
    try {
      await customerUpdateDetails({
        credentials: { ...values, phone: `${values?.phone}` },
      }).unwrap()
      saveToLocalStorage('userInfo', {
        ...userInfo,
        ...values,
      })
      openNotification()
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.message))
    }
  }
  useEffect(() => {
    if (userData) {
      setDetails(userData)
      setPhone(userData.phone)
      const abc = parsePhoneNumber(userData.phone)
      console.log('this is the abc', abc)
    }
  }, [userData])

  return (
    <Account props={'details'}>
      <div className={classes.AccountDetails}>
        {' '}
        {details ? (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ ...details }}
          >
            {errMsg && <Error Errormsg={errMsg} />}
            <div className={classes.AccountDetails__Inputs}>
              <div>
                {' '}
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: userData?.first_name ? false : true,
                      message: 'Enter a First Name!',
                    },
                  ]}
                  extra={<small ref={fnameRef}></small>}
                >
                  <Input
                    placeholder="Enter first name"
                    className={classes.AccountDetails__Input}
                    onChange={(e) =>
                      nameValidation(
                        e,

                        fnameRef,

                        "Numbers and '!@#$%^&*()+=_`' are not valid characters.",
                        setFormValid,
                      )
                    }
                  />
                </Form.Item>
              </div>
              <div>
                {' '}
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: userData?.last_name ? false : true,
                      message: 'Enter a Last Name!',
                    },
                  ]}
                  extra={<small ref={lnameRef}></small>}
                >
                  <Input
                    className={classes.AccountDetails__Input}
                    placeholder="Enter last name"
                    onChange={(e) =>
                      nameValidation(
                        e,

                        lnameRef,

                        "Numbers and '!@#$%^&*()+=_`' are not valid characters.",
                        setFormValid,
                      )
                    }
                  />
                </Form.Item>
              </div>
              <div>
                {' '}
                <Form.Item
                  label="Phone Number"
                  className={classes.DetailsForm__Elem}
                  name="phone"
                  rules={[
                    {
                      required: userData?.phone ? false : true,
                      message: 'Please your phone number!',
                    },
                  ]}
                  extra={<small ref={phoneRef}></small>}
                >
                  {/* <Input
                    maxLength={11}
                    className={classes.AccountDetails__Input}
                    // addonBefore="+ 234"
                    placeholder="Enter phone number"
                    onChange={(e) =>
                      phoneValidation(
                        `${e.target.value}`,

                        phoneRef,

                        'Invalid phone number',
                        setFormValid,
                        isValidPhoneNumber,
                      )
                    }
                  /> */}
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e)}
                    // defaultCountry="NG"
                    numberInputProps={{
                      maxLength: 13,
                    }}
                    initialValueFormat="national"
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: userData?.address ? false : true,
                  message: 'Enter a valid address!',
                },
              ]}
              extra={<small ref={addyRef}></small>}
            >
              <Input
                onChange={(e) =>
                  addressValidation(
                    e,
                    addyRef,
                    "'!@#$%^&*()+=-_`' are not valid characters.",
                    setFormValid,
                  )
                }
                className={classes.AccountDetails__Address}
                placeholder="Enter your address"
              />
            </Form.Item>

            <Form.Item>
              <FormButton
                action={'Save'}
                isLoading={isLoading}
                validate={!formValid}
              />
            </Form.Item>
          </Form>
        ) : (
          <Loading data={'user details'} />
        )}
      </div>
    </Account>
  )
}

export default AccountDetails
