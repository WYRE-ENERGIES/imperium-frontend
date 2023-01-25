import { Row } from 'antd'
import React from 'react'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'

import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Details.module.scss'
import imageDesc from '../../../../../src/assets/Auth/Site Stats-amico 1.svg'
import DetailForm from '../../../../components/Auth/Forms/Details/DetailsForm'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'

const Details = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Energy Analytics Dashboard',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '3px',
  }
  return (
    <div>
      <Row>
        <LeftLayout>
          <DetailForm />
        </LeftLayout>
        <RightLayout>
          <div className={classes.Detail}>
            <FormDescription content={formDescription} />
          </div>
          <div className={classes.Detail__Indicator}>
            <PageIndicator pageNum={2} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Details
