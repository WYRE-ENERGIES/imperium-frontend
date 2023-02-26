import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import Account from '../Account'
import classes from './AccounctDetails.module.scss'
const AccountDetails = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Finish:', values)
  }
  return (
    <Account props={'details'}>
      <div className={classes.AccountDetails}>
        {' '}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
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
                  placeholder="nisha@uitrend.com"
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
                  placeholder="nisha@uitrend.com"
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
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input
                  className={classes.AccountDetails__Phone}
                  addonBefore="+ 234"
                  placeholder="8123456789"
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
              placeholder="12, Rockstone villa estate, Bakery bus stop, Badagri, Eko, La"
            />
          </Form.Item>
        </Form>
      </div>
    </Account>
  )
}

export default AccountDetails
