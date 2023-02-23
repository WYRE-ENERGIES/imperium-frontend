import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import imageDesc from '../../../../../src/assets/Auth/Multi-device targeting-pana 1.svg'
import classes from './SignUp.module.scss'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import AuthForm from '../../../../components/Auth/Forms/AuthForm/AuthForm'

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
          <AuthForm authContentSelection={'signup'}>
            <div className={classes.SignUp__FooterNote}>
              <p>
                By selecting <strong>Create account</strong>. I agree to
                imperium’s <span>privacy policy & terms </span>
              </p>
            </div>
          </AuthForm>
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
