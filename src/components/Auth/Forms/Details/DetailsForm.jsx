import { Form, Input } from 'antd'
import classes from './DetailsForm.module.scss'
import UserForm from '../AuthForm/UserForm'
const DetailsForm = () => {
  return (
    <section className={classes.DetailsForm}>
      <UserForm
        formContent={{
          header: 'Details',
          tag: 'Please fill in some details',
          action: 'Submit',
        }}
        labelCol={16}
        wrapperCol={32}
      >
        <div className={classes.DetailsForm__form}>
          <Form.Item label={<p>First Name</p>} name="firstname" required>
            <Input
              className={classes.DetailsForm__Input}
              style={{ marginBottom: '-5px' }}
              placeholder="Enter your first name"
            />
          </Form.Item>
          <Form.Item label={<p>Last Name</p>} name="lastname" required>
            <Input
              className={classes.DetailsForm__Input}
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
              className={classes.DetailsForm__Input}
              style={{ marginBottom: '18.5px', marginTop: '-10xp' }}
              placeholder="Enter your phone number"
            />
          </Form.Item>
          <Form.Item label={<p>Address</p>} name="address" required>
            <Input.TextArea
              className={classes.DetailsForm__Input}
              style={{ marginTop: '-1px' }}
              placeholder="Enter a Address..."
            />
          </Form.Item>
        </div>
      </UserForm>
    </section>
  )
}
export default DetailsForm
