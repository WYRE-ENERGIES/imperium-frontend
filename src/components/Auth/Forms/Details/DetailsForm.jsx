import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import FormButton from '../Widgets/FormButton'
import FormHeader from '../Widgets/FormHeader'
import classes from './DetailsForm.module.scss'
const DetailForm = () => {
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
    <div className={classes.DetailForm}>
      <FormHeader header={'Details'} tagline={'Please fill in some details'} />
      <div className={classes.DetailForm__form}>
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
          <Form.Item label={<p>First Name</p>} name="firstname" required>
            <Input
              style={{ marginBottom: '-5px' }}
              placeholder="Enter your first name"
            />
          </Form.Item>
          <Form.Item label={<p>Last Name</p>} name="lastname" required>
            <Input
              style={{ marginTop: '-4px' }}
              placeholder="Enter your last name"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '-7px', marginBottom: '-2px' }}
            label={<p>Phone Number</p>}
            name="phone"
            required
          >
            <Input
              style={{ marginBottom: '18.5px', marginTop: '-10xp' }}
              placeholder="Enter your phone number"
            />
          </Form.Item>
          <Form.Item label={<p>Address</p>} name="address" required>
            <Input.TextArea
              style={{ marginTop: '-1px' }}
              placeholder="Enter a Address..."
            />
          </Form.Item>

          <Form.Item>
            <FormButton type={'submit'} action={'Continue'} icon={''} />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default DetailForm
