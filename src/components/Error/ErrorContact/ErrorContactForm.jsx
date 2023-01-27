import React from 'react'
import ErrorLayout from '../Layout/ErrorLayout'
import FormButton from '../../Auth/Forms/Widgets/FormButton'
import { Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import classes from './ErrorContactForm.module.scss'
import { BiEnvelope } from 'react-icons/bi'
const ErrorContactForm = () => {
  const options = [
    {
      value: 'gold',
    },
    {
      value: 'lime',
    },
    {
      value: 'green',
    },
    {
      value: 'cyan',
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
                    prefix={<BiEnvelope color="#606062" />}
                    placeholder="nisha@uitrend.com"
                  />
                </Form.Item>

                <Select
                  showArrow
                  defaultValue={['gold', 'cyan']}
                  style={{
                    width: '100%',
                  }}
                  options={options}
                />

                <Form.Item>
                  <FormButton type={'submit'} action={'Submit'} icon={''} />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </ErrorLayout>
    </div>
  )
}

export default ErrorContactForm
