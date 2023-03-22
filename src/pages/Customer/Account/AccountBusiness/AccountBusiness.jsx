import { Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountBusiness.module.scss'
import Account from '../Account'
import {
  useCustomerBusinessMutation,
  useCustomerGetBusinessQuery,
} from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { useEffect } from 'react'
const AccountBusiness = () => {
  const [form] = Form.useForm()
  const formData = new FormData()
  const [customerBusiness, { isLoading: updatingBusiness }] =
    useCustomerBusinessMutation()
  const { data, isLoading: gettingBusiness } = useCustomerGetBusinessQuery()
  const [upLoadedFile, setUpLoadedFile] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null)
  const [companyUrl, setCompanyUrl] = useState('')

  const onFinish = async (values) => {
    formData.append('company_logo', upLoadedFile)
    formData.append('business_name', values.business_name)
    formData.append('company_url', values.campany_url)

    try {
      await customerBusiness(formData).unwrap()
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }

  useEffect(() => {
    console.log(data)
  }, [])
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
                name="business_name"
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
                name="company_url"
                rules={[
                  {
                    required: true,
                    message: 'Enter company website URL.',
                  },
                ]}
              >
                <Input
                  addonBefore={'https://'}
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
