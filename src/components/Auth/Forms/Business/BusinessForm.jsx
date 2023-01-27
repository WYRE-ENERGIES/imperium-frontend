import { Link } from 'react-router-dom'
import { message, Form, Input, Upload } from 'antd'

import uploadImg from '../../../../assets/Auth/Featured icon.svg'
import { useNavigate } from 'react-router-dom'
import FormHeader from '../Widgets/FormHeader'
import FormButton from '../Widgets/FormButton'
import classes from './BusinessForm.module.scss'
import { useState } from 'react'
import FormFileUpload from '../Widgets/FormFileUpload'

const BusinessForm = () => {
  const nextPage = useNavigate()
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
        message.error(`${info.file.name} 
                             file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
      <FormHeader
        header={' Are you are business'}
        tagline={'Please fill in your company details'}
      />

      <div className={classes.BusinessForm__form}>
        <Form
          name="basic"
          labelCol={{
            span: 16,
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
          <Form.Item
            label={<p style={{ marginBottom: '-30px' }}>Business Name</p>}
            name="firstname"
            required
          >
            <Input
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
              prefix={
                <span
                  style={{
                    color: '#c4c4c4',
                    borderRight: '1px solid #C4C4C4',
                    padding: '8px 12px',
                    marginRight: '10px',
                  }}
                >
                  {'https://'}
                </span>
              }
              placeholder="www.yourdomain.com"
              style={{
                padding: '0',
                paddingRight: '10px',
              }}
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
          <Form.Item>
            <FormButton type={'submit'} action={'Continue'} />
          </Form.Item>
        </Form>
      </div>
      <div className={classes.BusinessForm__Skip}>
        <Link>Skip</Link>
      </div>
    </div>
  )
}
export default BusinessForm
