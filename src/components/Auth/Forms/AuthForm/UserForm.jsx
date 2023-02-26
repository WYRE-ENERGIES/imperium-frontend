import React from 'react'
import { Form } from 'antd'
import FormButton from '../Widgets/FormButton'
import FormFooter from '../Widgets/FormFooter'
import FormHeader from '../Widgets/FormHeader'
import { useAuthMutation } from '../../../../features/slices/authSlice'
import classes from './AuthForm.module.scss'

const UserForm = ({
  children,
  formContent,
  labelCol,
  wrapperCol,
  name,
  extras,
}) => {
  const [auth, { isLoading, error }] = useAuthMutation()

  const onFinish = async (values) => {
    const data = {
      credentials: values,
      endpoint: formContent.endpoint,
    }

    try {
      await auth(data).unwrap()
    } catch (error) {
      console.log(error.status)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <section>
      <FormHeader header={formContent?.header} tagline={formContent?.tag} />
      <Form
        name={name}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
      >
        {children}

        {error && (
          <small className={classes.UserForm__Message}>
            {error.data?.detail}
          </small>
        )}
        <Form.Item>
          <FormButton action={formContent?.btnText} isLoading={isLoading} />
        </Form.Item>
        {extras && <div>{extras}</div>}
        <FormFooter
          footer={formContent?.footer}
          action={formContent?.action}
          footerlink={formContent?.footerlink}
        />
      </Form>
    </section>
  )
}

export default UserForm
