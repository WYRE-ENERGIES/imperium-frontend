import '../../../../components/Auth/Forms/global.module.scss'

import { Row } from 'antd'
import React from 'react'

import VerificationForm from '../../../../components/Auth/Forms/Verification/Verification'
import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import PageIndicator from '../../../../components/Auth/Forms/Widgets/FormPageIndicator'
import imageDesc from '../../../../../src/assets/Auth/Analyze-amico 1.svg'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './Verification.module.scss'

const Verification = () => {
  const formDescription = {
    image: imageDesc,
    header: 'Graphs and charts',
    tagline:
      'Have a better experience irrespective of the device, OS, screen size, orientation, and browser platform.',
    ImgHeight: '2px',
  }
  return (
    <div className={classes.Verification}>
      <Row className={classes.Verification__Layout}>
        <LeftLayout>
          <VerificationForm />
        </LeftLayout>
        <RightLayout>
          <div className={classes.Verification__content}>
            <FormDescription content={formDescription} />
          </div>
          <div>
            <PageIndicator pageNum={1} />
          </div>
        </RightLayout>
      </Row>
    </div>
  )
}

export default Verification
