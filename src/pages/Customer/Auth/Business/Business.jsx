import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Business.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Work time-pana 1.svg'
import BusinessForm from '../../../../components/Auth/Forms/Business/BusinessForm'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'

const Business = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Set Shut down and turn on timer',
    tagline:
      'Set an automatic shut down for the power supply in your house from Imperium Solar Housing System remotely.',
    ImgHeight: '3px',
  }
  return (
    <div>
      <Row>
        <LeftLayout>
          <BusinessForm />
        </LeftLayout>
        <RightLayout>
          <div className={classes.Business}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.Business__Indicator}>
            <PageIndicator pageNum={3} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Business
