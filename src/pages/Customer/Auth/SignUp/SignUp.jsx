import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import SignUpForm from '../../../../components/Auth/Forms/AuthForm/SignUp/SignUp'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
// import '../../../../components/Auth/Forms/global.module.scss'
import imageDesc from '../../../../components/Auth/Img/Multi-device targeting-pana 1.svg'
import classes from './SignUp.module.scss'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'

const SignUp = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Sign into your account from any device.',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '2px',
  }
  return (
    <div className={classes.SignUp}>
      <Row>
        <LeftLayout>
          <SignUpForm />
        </LeftLayout>
        <RightLayout>
          <div className={classes.SignUp__content}>
            <FormDescription content={formDescription} />
          </div>
          <div>
            <PageIndicator pageNum={0} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default SignUp
