import { Link } from 'react-router-dom'
import { message, Form, Input, Upload } from 'antd'

import uploadImg from '../../../../assets/Auth/Featured icon.svg'
import classes from './BusinessForm.module.scss'
import { useState } from 'react'
import FormFileUpload from '../Widgets/FormFileUpload'
import UserForm from '../AuthForm/UserForm'

const BusinessForm = () => {
  const [fileUpload, setFileUpload] = useState(false)
  const [fileUploadingProgress, setfileUploadingProgress] = useState(0)
  const [fileName, setfileName] = useState('')
  const [fileSize, setfileSize] = useState(0)
  const { Dragger } = Upload
  const fileUploadProps = {
    name: 'file',
    multiple: false,
    progress: { showInfo: false },
    showUploadList: false,
    maxCount: 1,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <div className={classes.BusinessForm}>
      <UserForm
        formContent={{
          header: 'Do you have a business',
          tag: 'Please fill in your company details',
          btnText: 'Continue',
        }}
        labelCol={16}
        wrapperCol={32}
        name={'business'}
        extras={
          <div style={{ fontSize: '18px', textAlign: 'center' }}>
            <Link style={{ color: '#808080', fontWeight: '600' }}>Skip</Link>
          </div>
        }
      >
        <div className={classes.BusinessForm__form}>
          <Form.Item
            label={<p style={{ marginBottom: '-30px' }}>Business Name</p>}
            name="firstname"
            required
          >
            <Input
              className={classes.BusinessForm__Input}
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
            name="lastname"
            required
          >
            <Input
              addonBefore={'http://'}
              className={classes.BusinessForm__Company}
              placeholder="www.yourdomain.com"
            />
          </Form.Item>
          <Form.Item
            required
            label="Upload Company Logo"
            style={{ marginTop: '-10px' }}
            className={classes.BusinessForm__FileUpload}
          >
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Dragger
                {...fileUploadProps}
                name="files"
                action=""
                style={{ border: '1px solid #E6E6E6', background: 'white' }}
              >
                <div>
                  {fileUpload ? (
                    <FormFileUpload
                      fileName={fileName}
                      fileSize={Math.round(fileSize / 1000)}
                      fileUploadingProgress={Math.round(fileUploadingProgress)}
                    />
                  ) : (
                    <div className={classes.BusinessForm__Text}>
                      {' '}
                      <p style={{ marginTop: '-9px', marginBottom: '2px' }}>
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
        </div>
      </UserForm>
    </div>
  )
}
export default BusinessForm
