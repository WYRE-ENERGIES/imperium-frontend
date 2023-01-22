import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

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
                  }}
                >
                  {'https://'}
                </span>
              }
              placeholder="Enter your last name"
            />
          </Form.Item>
          <Form.Item
            label={<p style={{ marginBottom: '-30px' }}>Upload Company Logo</p>}
            name="address"
            required
          >
            <Input.TextArea placeholder="Enter a Address..." />
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
