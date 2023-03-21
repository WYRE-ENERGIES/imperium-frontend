import { Col, Form, Input, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import { useCustomerDetailsQuery } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import Account from '../Account'
import classes from './AccounctDetails.module.scss'
const AccountDetails = () => {
  const [form] = Form.useForm()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const { data, isLoading } = useCustomerDetailsQuery()

  useEffect(() => {
    console.log('data ', data)
    setFirstName(data.first_name)
    setLastName(data.last_name)
    setPhone(data.phone)
    setAddress(data.address)
  })

  return (
    <Account props={'details'}>
      <div className={classes.AccountDetails}>
        {' '}
        <Form form={form} layout="vertical" requiredMark="optional">
          <Row justify={'space-between'}>
            <Col>
              {' '}
              <Form.Item
                label="First Name"
                name="fname"
                rules={[
                  {
                    required: true,
                    message: 'Enter a First Name!',
                  },
                ]}
              >
                <Input
                  placeholder={firstName}
                  className={classes.AccountDetails__Input}
                />
              </Form.Item>
            </Col>
            <Col>
              {' '}
              <Form.Item
                label="Last Name"
                name="lname"
                rules={[
                  {
                    required: true,
                    message: 'Enter a Last Name!',
                  },
                ]}
              >
                <Input
                  className={classes.AccountDetails__Input}
                  placeholder={lastName}
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
                    required: true,
                    message: 'Please your phone number!',
                  },
                ]}
              >
                <Input
                  className={classes.AccountDetails__Phone}
                  addonBefore="+ 234"
                  placeholder={phone}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Enter a valid address!',
              },
            ]}
          >
            <Input
              className={classes.AccountDetails__Address}
              placeholder={address ? address : 'Update your address'}
            />
          </Form.Item>

          <Form.Item>
            <FormButton action={'Save'} isLoading={isLoading} />
          </Form.Item>
        </Form>
      </div>
    </Account>
  )
}

export default AccountDetails
