/* eslint-disable simple-import-sort/imports */
import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import SignInForm from '../../../../components/Auth/Forms/AuthForm/SignInForm/SignInForm'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import '../../../../components/Auth/Forms/global.module.scss'
import imageDesc from '../../../../components/Auth/Img/Sun energy-amico 1.svg'

const SignIn = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Welcome Back!',
    tagline: 'Login to keep updated the imperium way.',
    ImgHeight: '3px',
  }
  return (
    <div>
      <Row>
        <LeftLayout>
          <SignInForm />
        </LeftLayout>
        <RightLayout>
          <FormDescription content={formDescription} />
        </RightLayout>
      </Row>
    </div>
  )
}

export default SignIn
