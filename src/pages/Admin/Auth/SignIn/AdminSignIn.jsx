import { Col, Row } from 'antd'

import FormDescription from '../../../../components/Auth/Forms/Widgets/FormDescription'
import LeftLayout from '../../../../components/Auth/Layout/LeftLayout/LeftLayout'
import React from 'react'
import RightLayout from '../../../../components/Auth/Layout/RightLayout/RightLayout'
import classes from './AdminSignIn.module.scss'
import imageDesc from '../../../../../src/assets/Auth/adminlogo.svg'
import AuthForm from '../../../../components/Auth/Forms/AuthForm/AuthForm'

const AdminSignIn = () => {
  const formDescription = {
    image: imageDesc,
    header: '',
    tagline:
      'As an admin, you can view energy analytics and panel data through charts and graphs, set shut down and turn on timers, and access battery information on our platform.',
  }
  return (
    <section className={classes.AdminSignPage}>
      <Row className={classes.AdminSignPage__Layout}>
        <LeftLayout>
          <AuthForm authContentSelection={'signin'} client={'admin'} />
        </LeftLayout>

        <Col span={12} className={classes.AdminSignPage__RightLayOut}>
          <RightLayout span={24} backgroundColor={'none'}>
            <FormDescription content={formDescription} />{' '}
          </RightLayout>
        </Col>
      </Row>
    </section>
  )
}

export default AdminSignIn
