import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import FormButton from '../Widgets/FormButton'
import FormHeader from '../Widgets/FormHeader'
import classes from './VerificationForm.module.scss'

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
    <div className={classes.VerificationForm}>
      <FormHeader
        header={'Verification Code Sent'}
        tagline={
          <p style={{ width: '400px' }}>
            We just sent you a temporary one time pin to{' '}
            <span>emeka@gmail.com</span>. Please check your inbox!
          </p>
        }
      />
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
            <FormButton type={'submit'} action={'Continue'} icon={''} />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default VerificationForm
