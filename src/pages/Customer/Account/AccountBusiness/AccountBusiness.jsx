import { Col, Form, Input, Row, Upload, message } from 'antd'
import React, { useState } from 'react'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import classes from './AccountBusiness.module.scss'
import Account from '../Account'
import {
  useCustomerBusinessMutation,
  useCustomerGetBusinessQuery,
} from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'

import uploadImg from '../../../../assets/widget-icons/bussinessuploadIcon.svg'
import Loading from '../../../../components/Loading/Loading'

const formData = new FormData()
const BusinessForm = () => {
  const [upLoadedFile, setUpLoadedFile] = useState('')

  const { Dragger } = Upload
  const fileUploadProps = {
    name: 'file',
    multiple: false,
    progress: { showInfo: false },
    showUploadList: false,
    maxCount: 1,

    beforeUpload(file) {
      setUpLoadedFile(file)
    },
    onChange(info) {
      const { status } = info.file

      if (status === 'done') {
        formData.append('company_logo', upLoadedFile)

        message.success(`${info.file.name} 
                               file uploaded successfully`)
      } else if (status === 'error') {
        formData.append('company_logo', upLoadedFile)

        message.success(`${info.file.name} 
                               file uploaded failed`)
      }
    },
  }
  return (
    <Form>
      <Form.Item>
        <Form.Item name="dragger" valuePropName="l" noStyle>
          <div className={classes.AccountBusiness__FileUpload}>
            <Dragger
              {...fileUploadProps}
              name="files"
              action=""
              style={{
                border: 'none',
                borderRadius: '100%',
                background: '#f0f7ed',
              }}
            >
              <div className={classes.AccountBusiness__FileUploadIcon}>
                <div>
                  {' '}
                  <div style={{ marginTop: '-9px', marginBottom: '2px' }}>
                    <img
                      src={uploadImg}
                      alt=""
                      srcSet=""
                      style={{ width: '40px' }}
                    />
                  </div>
                </div>
              </div>
            </Dragger>
          </div>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

const AccountBusiness = () => {
  const [form] = Form.useForm()

  const [customerBusiness, { isLoading: updatingBusiness }] =
    useCustomerBusinessMutation()
  const { userdata, isLoading: gettingBusiness } = useCustomerGetBusinessQuery()
  console.log(userdata)
  const [errMsg, setErrMsg] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null)
  const [companyUrl, setCompanyUrl] = useState('')

  const onFinish = async (values) => {
    formData.append('business_name', values.business_name)
    formData.append('company_url', values.campany_url)

    try {
      await customerBusiness(formData).unwrap()
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }

  return (
    <Account type={'business'} content={<BusinessForm />}>
      <div className={classes.AccountBusiness}>
        {' '}
        {gettingBusiness ? (
          <Loading data={'business data'} />
        ) : userdata ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            initialValues={{ ...userdata }}
          >
            <div className={classes.AccountBusiness__Form}>
              <Col>
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
              <Col>
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
                    addonBefore={'http://'}
                    className={classes.AccountBusiness__Company}
                    placeholder="www.yourdomain.com"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Col>
                    {' '}
                    <FormButton
                      isLoading={updatingBusiness}
                      action={'Save changes'}
                    />
                  </Col>
                </Form.Item>
              </Col>
            </div>{' '}
          </Form>
        ) : (
          'No data found for this user'
        )}
      </div>
    </Account>
  )
}

export default AccountBusiness
