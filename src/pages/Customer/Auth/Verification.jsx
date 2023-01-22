import { Row } from 'antd'
import React from 'react'

import verificationImg from '../../../assets/images/Auth/Analyze-amico 1.svg'
import Authfooter from '../../../components/Auth/footer'
import LeftSection from '../../../components/Auth/leftSection'
import PageNavigation from '../../../components/Auth/pageNavigation'
import RightSection from '../../../components/Auth/rightSection'
import FormHeader from '../../../components/Form/FormHeader'
import VerificationForm from '../../../components/Form/verificationForm'
const Verification = () => {
  return (
    <div className="Verify">
      <Row>
        <LeftSection>
          <div className="Verification">
            <Row align="middle" justify="center">
              <div>
                <FormHeader
                  header={'Verification Code Sent'}
                  tagline={
                    <p>
                      We just sent you a temporary one time pin to{' '}
                      <strong style={{ color: 'black' }}>
                        emeka@gmail.com.
                      </strong>{' '}
                      Please check your inbox!
                    </p>
                  }
                />
                <VerificationForm />
              </div>
            </Row>
          </div>
        </LeftSection>
        <RightSection>
          <div>
            <img src={verificationImg} alt="" />
            <FormHeader
              header={'Graphs and charts'}
              tagline={
                'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.'
              }
            />
            <PageNavigation pageNum={1} />
            <Authfooter />
          </div>
        </RightSection>
      </Row>
    </div>
  )
}

export default Verification
