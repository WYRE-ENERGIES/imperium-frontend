// import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Input, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'

import uploadImg from '../../assets/images/Auth/Featured icon.svg'

const BusinessForm = () => {
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/verification/code')
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
    <div className="BusinessForm">
      <div className="">
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
            <Input placeholder="Enter your business name" />
          </Form.Item>
          <Form.Item
            label={<p style={{ marginBottom: '-30px' }}>Company</p>}
            name="lastname"
            required
          >
            <Input
              prefix={
                <span
                  style={{
                    color: '#c4c4c4',
                    borderRight: '1px solid #C4C4C4',
                    paddingRight: '20px',
                  }}
                >
                  {'https://'}
                </span>
              }
              placeholder="Enter your last name"
            />
          </Form.Item>
          <Form.Item label="Upload Compnay Logo">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <img src={uploadImg} alt="" srcSet="" />
                </p>
                <p
                  className="ant-upload-text"
                  style={{ color: '#808080', fontSize: '14px' }}
                >
                  <strong style={{ color: '#385E2B' }}>Click to upload</strong>{' '}
                  or drag and drop
                </p>
                <p
                  className="ant-upload-hint"
                  style={{ color: '#808080', fontSize: '12px' }}
                >
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="transparent" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default BusinessForm
