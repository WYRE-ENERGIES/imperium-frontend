import { Col, Form, Input, notification, Upload, message } from 'antd'
import React, { useRef, useState } from 'react'
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
import Error from '../../../../components/ErrorMessage/Error'
import { urlValidation } from '../../../../components/RegEx/RegEx'

const formData = new FormData()
const BusinessForm = ({ img }) => {
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
      formData.append('company_logo', file)
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
                               file uploaded successfully`)
      }
    },
  }
  return (
    <Form>
      <Form.Item>
        <Form.Item name="dragger" valuePropName="l" noStyle>
          <div
            className={classes.AccountBusiness__FileUpload}
            style={{
              backgroundImage: `url("${img}")`,
              backgroundSize: 'cover',
            }}
          >
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
  const urlRef = useRef()
  const [errMsg, setErrMsg] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [customerBusiness, { isLoading: updatingBusiness }] =
    useCustomerBusinessMutation()
  const { data: userdata, isLoading: businessIsLoading } =
    useCustomerGetBusinessQuery()
  const openNotification = () => {
    notification.success({
      message: 'Successful',
      description: `Business successfully updated.`,
    })
  }
  const onFinish = async (values) => {
    formData.append('business_name', values.business_name)
    formData.append('company_url', 'https://' + values.company_url)

    try {
      await customerBusiness(formData).unwrap()
      setErrMsg('')
      openNotification()
    } catch (err) {
      setErrMsg(ErrorMessage(err?.data?.company_url))
    }
  }

  return (
    <Account
      type={'business'}
      content={<BusinessForm img={userdata?.company_logo} />}
    >
      <div className={classes.AccountBusiness}>
        {' '}
        {businessIsLoading ? (
          <Loading data={'business data'} />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            initialValues={{ ...userdata }}
          >
            <div className={classes.AccountBusiness__Form}>
              {errMsg && <Error Errormsg={errMsg} />}
              <Col>
                {' '}
                <Form.Item
                  label="Business name"
                  name="business_name"
                  rules={[
                    {
                      required: true,
                      message: <small>Enter a business name.</small>,
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
                      message: <small>Enter company website URL.</small>,
                    },
                  ]}
                  extra={<small ref={urlRef}></small>}
                  style={{ marginTop: '20px' }}
                >
                  <Input
                    addonBefore={'https://'}
                    className={classes.AccountBusiness__Company}
                    placeholder="www.yourdomain.com"
                    onChange={(e) =>
                      urlValidation(e, urlRef, 'Invalid url', setFormValid)
                    }
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
                      validate={!formValid}
                    />
                  </Col>
                </Form.Item>
              </Col>
            </div>{' '}
          </Form>
        )}
      </div>
    </Account>
  )
}

export default AccountBusiness
