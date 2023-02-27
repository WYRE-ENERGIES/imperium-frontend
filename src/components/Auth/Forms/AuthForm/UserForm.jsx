import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import FormButton from '../Widgets/FormButton'
import FormFooter from '../Widgets/FormFooter'
import FormHeader from '../Widgets/FormHeader'
import { useAuthUserMutation } from '../../../../features/slices/auth/authApiSlice'
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
  const [errMsg, setErrMsg] = useState('')
  const [authUser, { isLoading }] = useAuthUserMutation()
  const navigate = useNavigate()

  const accesstoken = localStorage.getItem('access')

  const onFinish = async (values) => {
    const credentials = {
      credentials: values,
      endpoint: formContent.endpoint,
    }

    try {
      await authUser(credentials).unwrap()
      navigate(formContent.navigate)
    } catch (err) {
      let errorMsg = ''
      if (err.status === 401) {
        errorMsg += err?.data?.detail
        setErrMsg(errorMsg)
      } else if (err.status === 400) {
        setErrMsg('Missing username or password')
      } else {
        setErrMsg('Check your internet connection')
      }
    }
  }

  useEffect(() => {
    if (accesstoken) {
      navigate(formContent.navigate)
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
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
      >
        {children}

        {errMsg && (
          <small className={classes.UserForm__Message}>{errMsg}</small>
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
