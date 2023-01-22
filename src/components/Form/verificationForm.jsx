import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
const VerificationForm = () => {
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/details')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="VerificationForm">
      <div className="Form">
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
          <Form.Item
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                OTP Code
              </p>
            }
            name="otp"
            required
          >
            <Input placeholder="Enter code" />
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
export default VerificationForm
