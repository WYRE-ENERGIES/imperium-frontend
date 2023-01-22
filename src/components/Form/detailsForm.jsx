import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
const DetailsForm = () => {
  const nextPage = useNavigate()
  const handleOnCreateAccountBtn = () => {
    console.log(nextPage)
    nextPage('/business')
  }
  const onFinish = (values) => {
    console.log('Success:', values)
    handleOnCreateAccountBtn()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="DetailsForm">
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
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                First Name
              </p>
            }
            name="firstname"
            required
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                Last Name
              </p>
            }
            name="lastname"
            required
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                Enter your phone number
              </p>
            }
            name="phone"
            required
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                Address
              </p>
            }
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
export default DetailsForm
