import { Col, Form, Input, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
const AccountDetails = () => {
  const [form] = Form.useForm()
  const userInfo = getItemFromLocalStorage('userInfo')

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [initialValues, setInitialValues] = useState(null)
  const { data: userData, isLoading: detailLoading } =
    useCustomerGetDetailsQuery()
  const [customerUpdateDetails, { data, isLoading }] =
    useCustomerUpdateDetailsMutation()

  const onFinish = async (values) => {
    try {
      await customerUpdateDetails({
        credentials: values,
      }).unwrap()
      saveToLocalStorage('userInfo', {
        ...userInfo,
        ...values,
      })
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }

  useEffect(() => {
    setFirstName(userData?.first_name)
    setLastName(userData?.last_name)
    setPhone(userData?.phone)
    setAddress(userData?.address)
  }, [userData])

  return (
    <Account props={'details'}>
      <div className={classes.AccountDetails}>
        {' '}
        {userData ? (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
            initialValues={{ ...userData }}
          >
            {errMsg && <Error Errormsg={errMsg} />}
            <Row justify={'space-between'}>
              <Col>
                {' '}
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: firstName ? false : true,
                      message: 'Enter a First Name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter first name"
                    className={classes.AccountDetails__Input}
                  />
                </Form.Item>
              </Col>
              <Col>
                {' '}
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: lastName ? false : true,
                      message: 'Enter a Last Name!',
                    },
                  ]}
                >
                  <Input
                    className={classes.AccountDetails__Input}
                    placeholder="Enter last name"
                  />
                </Form.Item>
              </Col>
              <Col>
                {' '}
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: phone ? false : true,
                      message: 'Please your phone number!',
                    },
                  ]}
                >
                  <Input
                    className={classes.AccountDetails__Phone}
                    addonBefore="+ 234"
                    placeholder="Enter phone number"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: address ? false : true,
                  message: 'Enter a valid address!',
                },
              ]}
            >
              <Input
                className={classes.AccountDetails__Address}
                placeholder="Enter your address"
              />
            </Form.Item>

            <Form.Item>
              <FormButton action={'Save'} isLoading={isLoading} />
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
