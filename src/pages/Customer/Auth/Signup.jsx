import { Divider, Row } from 'antd'
import React from 'react'

import googleIcon from '../../../assets/images/Auth/google.svg'
import devices from '../../../assets/images/Auth/Multi-device targeting-pana 1.svg'
import Authfooter from '../../../components/Auth/footer'
import LeftSection from '../../../components/Auth/leftSection'
import PageNavigation from '../../../components/Auth/pageNavigation'
import RightSection from '../../../components/Auth/rightSection'
import FormButton from '../../../components/Button/Button'
import AuthForm from '../../../components/Form/authForm'
import FormHeader from '../../../components/Form/FormHeader'

const Signup = () => {
  return (
    <div>
      <Row>
        <LeftSection>
          <div className="SignUp">
            <FormHeader
              header={'Sign up'}
              tagline={'Let’s get started with imperium today'}
            />
            <div className="googleAction">
              <FormButton
                type=""
                action={'Sign up with Google'}
                icon={googleIcon}
              />
              <Divider>or</Divider>
            </div>
            <AuthForm />
            <div className="leftFooterText">
              <p>
                By selecting <strong>Create account</strong>. I agree to
                imperium’s <span>privacy policy & terms </span>
              </p>
            </div>
            <div className="samlSSO">
              <p className="SAML">Continue with SAML SSO</p>
            </div>
            <div className="haveAccount">
              <p>
                Already have an account? <strong>Log in</strong>
              </p>
            </div>
          </div>
        </LeftSection>
        <RightSection>
          <div>
            <img src={devices} alt="" />
            <FormHeader
              header={'Sign into your account from any device.'}
              tagline={
                'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.'
              }
            />
            <PageNavigation pageNum={0} />
            <Authfooter />
          </div>
        </RightSection>
      </Row>
    </div>
  )
}

export default Signup
