import { Form, Input } from 'antd'

import classes from './VerificationForm.module.scss'
import UserForm from '../AuthForm/UserForm'
const VerificationForm = () => {
  return (
    <section className={classes.VerificationForm}>
      <UserForm
        labelCol={8}
        wrapperCol={32}
        formContent={{
          header: 'Verification Code Sent',
          tag: (
            <p className={classes.VerificationForm__InboxCheck}>
              We just sent you a temporary one time pin to{' '}
              <strong>emeka@gmail.com</strong>. Please check your inbox!
            </p>
          ),
          btnText: 'Continue',
        }}
        name="verification"
      >
        <div>
          <Form.Item
            label={
              <p style={{ fontWeight: 'bold', marginBottom: '-30px' }}>
                OTP Code
              </p>
            }
            name="otp"
            required
          >
            <Input
              className={classes.VerificationForm__Input}
              placeholder="Enter code"
            />
          </Form.Item>
        </div>
      </UserForm>
    </section>
  )
}
export default VerificationForm
