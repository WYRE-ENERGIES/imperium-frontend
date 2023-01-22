import { Row } from 'antd'
import React from 'react'

import BusinessImg from '../../../assets/images/Auth/Work time-pana 1.svg'
import Authfooter from '../../../components/Auth/footer'
import LeftSection from '../../../components/Auth/leftSection'
import PageNavigation from '../../../components/Auth/pageNavigation'
import RightSection from '../../../components/Auth/rightSection'
import BusinessForm from '../../../components/Form/businessForm'
import FormHeader from '../../../components/Form/FormHeader'
const Business = () => {
  return (
    <div>
      <Row>
        <LeftSection>
          <div className="Business">
            <Row align="middle" justify="center">
              <div>
                <FormHeader
                  header={'Add you are business'}
                  tagline={<p>Please fill in your company details</p>}
                />
                <BusinessForm />
              </div>
            </Row>
          </div>
        </LeftSection>
        <RightSection>
          <div>
            <img src={BusinessImg} alt="" />
            <FormHeader
              header={'Set Shut down and turn on timer'}
              tagline={
                'Set an automatic shut down for the power supply in your house from Imperium Solar Housing System remotely.'
              }
            />
            <PageNavigation pageNum={2} />
            <Authfooter />
          </div>
        </RightSection>
      </Row>
    </div>
  )
}

export default Business
