import { Form, Input, Row, Upload, message } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Business.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Work time-pana 1.svg'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import FormHeader from '../../../../components/Auth/Forms/Widgets/FormHeader'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../../../components/Auth/Forms/Widgets/FormButton'
import FormFooter from '../../../../components/Auth/Forms/Widgets/FormFooter'
import { useCustomerBusinessMutation } from '../../../../features/slices/auth/customer/customerAuthApiSlice'
import { useState } from 'react'
import uploadImg from '../../../../../src/assets/Auth/Featured icon.svg'
import FormFileUpload from '../../../../components/Auth/Forms/Widgets/FormFileUpload'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { getItemFromLocalStorage } from '../../../../utils/helpers'

const Business = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Set Shut down and turn on timer',
    tagline:
      'Set an automatic shut down for the power supply in your house from Imperium Solar Housing System remotely.',
    ImgHeight: '3px',
  }
  const [customerBusiness, { isLoading }] = useCustomerBusinessMutation()
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState('')
  const [fileUpload, setFileUpload] = useState(false)
  const [fileUploadingProgress, setfileUploadingProgress] = useState(0)
  const [fileName, setfileName] = useState('')
  const [fileSize, setfileSize] = useState(0)
  const [upLoadedFile, setUpLoadedFile] = useState('')
  const { Dragger } = Upload
  const token = getItemFromLocalStorage('access')
  const formData = new FormData()
  const size = Math.round(fileSize / 1000)
  const fileUploadProps = {
    name: 'file',
    multiple: false,
    progress: { showInfo: false },
    showUploadList: true,
    maxCount: 1,
    headers: {
      authorization: `Bearer ${token}`,
    },

    onChange(info) {
      const { status } = info.file
      if (status == 'uploading') {
        setFileUpload(true)
        setfileName(info.file.name)
        setfileSize(info.file.size)
        setfileUploadingProgress(info.file.percent)
      }
      if (status === 'done') {
        setFileUpload(true)
        message.success(`${info.file.name} 
                               file uploaded successfully`)
      } else if (status === 'error') {
        setFileUpload(true)
      }
    },
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const onFinish = async (values) => {
    formData.append('company_logo', upLoadedFile)
    formData.append('business_name', values.business_name)
    formData.append('company_url', values.campany_url)

    try {
      await customerBusiness(formData).unwrap()
      navigate('/')
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  return (
    <div className={classes.Bussiness}>
      <Row>
        <LeftLayout>
          <div className={classes.Bussiness__Form}>
            {' '}
            <div>
              <FormHeader
                header={'Do you have a business'}
                tagline={'Please fill in your company details'}
              />
            </div>
            <div>
              <Form
                name="client-business"
                labelCol={8}
                wrapperCol={32}
                initialValues={{
                  remember: false,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark="optional"
              >
                {errMsg && <Error Errormsg={errMsg} />}

                <Form.Item
                  label={<p style={{ marginBottom: '-30px' }}>Business Name</p>}
                  name="business_name"
                  required
                >
                  <Input
                    className={classes.Business__Input}
                    style={{ marginBottom: '-30px' }}
                    placeholder="Enter your business name"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <p
                      style={{
                        marginTop: '-10px',
                        marginBottom: '-3px',
                      }}
                    >
                      Company
                    </p>
                  }
                  name="campany_url"
                  required
                >
                  <Input
                    addonBefore={'http://'}
                    className={classes.Business__Company}
                    placeholder="www.yourdomain.com"
                  />
                </Form.Item>
                <Form.Item
                  required
                  label="Upload Company Logo"
                  style={{ marginTop: '-10px' }}
                  className={classes.Business__FileUpload}
                >
                  <Form.Item
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Dragger
                      {...fileUploadProps}
                      beforeUpload={(file) => {
                        setUpLoadedFile(file)
                      }}
                      name="file"
                      style={{
                        border: '1px solid #E6E6E6',
                        background: 'white',
                      }}
                    >
                      <div>
                        {fileUpload ? (
                          <FormFileUpload
                            fileName={fileName}
                            fileSize={size}
                            fileUploadingProgress={Math.round(
                              fileUploadingProgress,
                            )}
                          />
                        ) : (
                          <div className={classes.Business__Text}>
                            {' '}
                            <p
                              style={{ marginTop: '-9px', marginBottom: '2px' }}
                            >
                              <img
                                src={uploadImg}
                                alt=""
                                srcSet=""
                                style={{ width: '40px' }}
                              />
                            </p>
                            <p
                              style={{
                                color: '#808080',
                                fontSize: '14px',
                                margin: '10px 0 5px 0',
                              }}
                            >
                              <strong style={{ color: '#385E2B' }}>
                                Click to upload
                              </strong>{' '}
                              or drag and drop
                            </p>
                            <p style={{ color: '#808080', fontSize: '12px' }}>
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        )}
                      </div>
                    </Dragger>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <FormButton action={'Continue'} isLoading={isLoading} />
                </Form.Item>

                <FormFooter
                  footer={
                    <Link
                      style={{
                        color: 'gray',
                        fontWeight: 'bolder',
                        fontSize: '16px',
                      }}
                      to={'/'}
                    >
                      Skip
                    </Link>
                  }
                />
              </Form>
            </div>
          </div>
        </LeftLayout>
        <RightLayout>
          <div className={classes.Business__Desc}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.Business__Indicator}>
            <PageIndicator pageNum={3} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Business
