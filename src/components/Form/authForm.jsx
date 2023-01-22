import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
const AuthForm = () => {
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
            <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>Email</p>
          }
          name="Email"
          required
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label={
            <p
              style={{
                fontWeight: 'bold',
                marginTop: '10px',
                marginBottom: '-10px',
              }}
            >
              Password
            </p>
          }
          extra="Must be at least 8 characters."
          name="password"
          style={{ marginTop: '-1rem' }}
          required
        >
          <Input.Password
            placeholder="Create a password"
            style={{ marginTop: '-30px' }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="transparent" htmlType="submit">
            Create account
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default AuthForm
