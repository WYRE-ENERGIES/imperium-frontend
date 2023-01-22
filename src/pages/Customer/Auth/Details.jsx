import { Row } from 'antd'
import React from 'react'

import DetailsImg from '../../../assets/images/Auth/Site Stats-amico 1.svg'
import Authfooter from '../../../components/Auth/footer'
import LeftSection from '../../../components/Auth/leftSection'
import PageNavigation from '../../../components/Auth/pageNavigation'
import RightSection from '../../../components/Auth/rightSection'
import DetailsForm from '../../../components/Form/detailsForm'
import FormHeader from '../../../components/Form/FormHeader'
const Details = () => {
  return (
    <div className="Detail">
      <Row>
        <LeftSection>
          <div className="Details">
            <Row align="middle" justify="center">
              <div>
                <FormHeader
                  header={'Details'}
                  tagline={<p>Please fill in some details</p>}
                />
                <DetailsForm />
              </div>
            </Row>
          </div>
        </LeftSection>
        <RightSection>
          <div>
            <img src={DetailsImg} alt="" />
            <FormHeader
              header={'Energy Analytics Dashboard'}
              tagline={
                'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.'
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

export default Details
