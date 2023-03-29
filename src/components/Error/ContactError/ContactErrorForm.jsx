import React from 'react'
import ErrorLayout from '../Layout/ErrorLayout'
import FormButton from '../../Auth/Forms/Widgets/FormButton'
import { Col, Form, Input, Row, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import classes from './ContactErrorForm.module.scss'
import { BiCheck, BiEnvelope } from 'react-icons/bi'
import { BiPhone } from 'react-icons/bi'
const ContactErrorForm = () => {
  const options = [
    {
      value: 'Location',
    },
    {
      value: 'Device malfunction',
    },
    {
      value: 'Inconsistent data post',
    },
    {
      value: 'Suspicious activity',
    },
    {
      value: 'Payment',
    },
  ]
  const nextPage = useNavigate()

  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/new-password')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <ErrorLayout width={'530px'}>
        <div className={classes.ContactErrorForm}>
          <div className={classes.ContactErrorForm__FormContent}>
            <div>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 32,
                }}
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                requiredMark="optional"
              >
                <Form.Item label="" name="email" required>
                  <Input
                    prefix={<BiEnvelope />}
                    placeholder="nisha@uitrend.com"
                  />
                </Form.Item>

                <Row gutter={5}>
                  <Col>
                    <Form.Item>
                      <Select
                        className={classes.ContactErrorForm__FormSelect}
                        menuItemSelectedIcon={<BiCheck color="#385E2B" />}
                        showArrow
                        placeholder="Select error message"
                        style={{
                          width: '246px',
                        }}
                        options={options}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      <Select
                        className={classes.ContactErrorForm__FormSelect}
                        menuItemSelectedIcon={<BiCheck color="#385E2B" />}
                        showArrow
                        placeholder="Select priority"
                        style={{
                          width: '246px',
                        }}
                        options={options}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Select
                    className={classes.ContactErrorForm__FormSelect}
                    menuItemSelectedIcon={<BiCheck color="#385E2B" />}
                    showArrow
                    placeholder="Select SHS"
                    style={{
                      width: '100%',
                    }}
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    },
                  ]}
                >
                  <Input.TextArea
                    className={classes.ContactErrorForm__FormText}
                    placeholder="Enter a description..."
                  />
                </Form.Item>
                <Form.Item>
                  <FormButton action={'Submit'} isLoading={true} />
                </Form.Item>
              </Form>
            </div>
          </div>

          <a href="tel:+234 81 2345 6789" style={{ textDecoration: 'none' }}>
            <div className={classes.ContactErrorForm__Phone}>
              <div>
                <BiPhone size={20} />
              </div>
              <p>081 2345 6789</p>
            </div>
          </a>
        </div>
      </ErrorLayout>
    </div>
  )
}

export default ContactErrorForm
