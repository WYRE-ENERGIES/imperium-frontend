import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../../features/slices/authSlice'
import { Form } from 'antd'
import FormButton from '../Widgets/FormButton'
import FormFooter from '../Widgets/FormFooter'
import FormHeader from '../Widgets/FormHeader'

const UserForm = ({
  children,
  formContent,
  labelCol,
  wrapperCol,
  name,
  extras,
}) => {
  const dispatch = useDispatch()
  const { isLoading, isLoggedIn, token, msg } = useSelector(
    (state) => state.auth,
  )
  console.log(isLoading, isLoggedIn, token, msg)
  const onFinish = (values) => {
    console.log('Success:', values)
    dispatch(loginUser(values))
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

        <Form.Item>
          <FormButton action={formContent?.btnText} />
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
