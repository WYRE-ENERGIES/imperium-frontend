import { Row, Col } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import SignInForm from '../../../../components/Auth/Forms/AuthForm/SignInForm/SignInForm'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import '../../../../components/Auth/Forms/global.module.scss'
import imageDesc from '../../../../../src/assets/Auth/adminlogo.svg'
import classes from './AdminSignIn.module.scss'

const SignIn = () => {
  const formDescription = {
    image: imageDesc,
    header: '',
    tagline:
      'As an admin, you can view energy analytics and panel data through charts and graphs, set shut down and turn on timers, and access battery information on our platform.',
    ImgHeight: '3px',
  }
  return (
    <div className={classes.SignPage}>
      <Row className={classes.SignPage__Layout}>
        <LeftLayout className={classes.SignPage__LeftLayOut}>
          <SignInForm />
        </LeftLayout>

        <Col span={12} className={classes.SignPage__RightLayOut}>
          <RightLayout span={24} backgroundColor={'none'}>
            <FormDescription content={formDescription} />{' '}
          </RightLayout>
        </Col>
      </Row>
    </div>
  )
}

export default SignIn
