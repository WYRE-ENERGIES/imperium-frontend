import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import SignInForm from '../../../../components/Auth/Forms/AuthForm/SignInForm/SignInForm'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import '../../../../components/Auth/Forms/global.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Sun energy-amico 1.svg'
import classes from './SignIn.module.scss'

const SignIn = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Welcome Back!',
    tagline: 'Login to keep updated the imperium way.',
    ImgHeight: '3px',
  }
  return (
    <div className={classes.SignPage}>
      <Row className={classes.SignPage__Layout}>
        <LeftLayout className={classes.SignPage__LeftLayOut}>
          <SignInForm />
        </LeftLayout>
        <RightLayout className={classes.SignPage__RightLayOut}>
          <FormDescription content={formDescription} />
        </RightLayout>
      </Row>
    </div>
  )
}

export default SignIn
