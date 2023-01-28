import React from 'react'
import ErrorLayout from '../Layout/ErrorLayout'
import FormButton from '../../Auth/Forms/Widgets/FormButton'
import { Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import classes from './ErrorContactForm.module.scss'
import { BiEnvelope } from 'react-icons/bi'
import { BiPhone } from 'react-icons/bi'
const ErrorContactForm = () => {
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
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
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
      <ErrorLayout>
        <div className={classes.ErrorContactForm}>
          <div className={classes.ErrorContactForm__FormContent}>
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
                    prefix={<BiEnvelope color="#606062" size={22} />}
                    placeholder="nisha@uitrend.com"
                  />
                </Form.Item>

                <Select
                  menuItemSelectedIcon="hello"
                  showArrow
                  placeholder="Select error message"
                  style={{
                    width: '100%',
                    padding: '-12px',
                  }}
                  options={options}
                  className={classes.ErrorContactForm__FormSelect}
                />

                <Form.Item>
                  <FormButton type={'submit'} action={'Submit'} icon={''} />
                </Form.Item>
              </Form>
            </div>
          </div>

          <a href="tel:+234 81 2345 6789">
            <div className={classes.ErrorContactForm__Phone}>
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

export default ErrorContactForm
