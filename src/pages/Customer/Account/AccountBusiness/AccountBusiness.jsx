import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountBusiness.module.scss'
import Account from '../Account'
const AccountBusiness = () => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Finish:', values)
  }
  return (
    <Account props={'business'}>
      <div className={classes.AccountBusiness}>
        {' '}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Row justify={'space-between'} gutter={20}>
            <Col span={8}>
              {' '}
              <Form.Item
                label="Business name"
                name="business-name"
                rules={[
                  {
                    required: true,
                    message: 'Enter a business name!',
                  },
                ]}
              >
                <Input
                  placeholder="My business name"
                  className={classes.AccountBusiness__Input}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {' '}
              <Form.Item
                label="Company"
                name="company"
                rules={[
                  {
                    required: true,
                    message: 'Enter company website URL.',
                  },
                ]}
              >
                <Input
                  addonBefore={'http://'}
                  className={classes.AccountBusiness__Company}
                  placeholder="www.yourdomain.com"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Row justify={'end'}>
                  <Col span={18}>
                    {' '}
                    <FormButton type={'submit'} action={'Save changes'} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Account>
  )
}

export default AccountBusiness
