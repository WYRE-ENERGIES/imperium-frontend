import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import FormButton from '../Widgets/FormButton'
import FormFooter from '../Widgets/FormFooter'
import FormHeader from '../Widgets/FormHeader'
import { useLogInMutation } from '../../../../features/slices/auth/authApiSlice'
import classes from './AuthForm.module.scss'
import { useNavigate } from 'react-router-dom'

const UserForm = ({
  children,
  formContent,
  labelCol,
  wrapperCol,
  name,
  extras,
}) => {
  const token = localStorage.getItem('token')
  const [errMsg, setErrMsg] = useState('')
  const [login, { isLoading, error, isError }] = useLogInMutation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const data = {
      credentials: values,
      endpoint: formContent.endpoint,
    }

    try {
      await login(data).unwrap()
      navigate('/admin/overview')
    } catch (err) {
      if (isError || error) {
        setErrMsg(error?.data?.details)
      }
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (token) {
      navigate('/admin/overview')
    }
  })

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

        {error && <small className={classes.UserForm__Message}>{errMsg}</small>}
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
