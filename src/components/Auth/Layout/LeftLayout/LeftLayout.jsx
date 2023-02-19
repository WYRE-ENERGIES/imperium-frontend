import { Col, Row } from 'antd'
import React from 'react'

import Logo from '../../../../../src/assets/Auth/Logo.svg'
import classes from './LeftLayout.module.scss'
const LeftLayout = ({ children }) => {
  return (
    <Col span={12} className={classes.Layout}>
      <div>
        <div className={classes.Layout__image}>
          <img src={Logo} alt="" />
        </div>
        <Row justify="center" align={'middle'}>
          {children}
        </Row>
      </div>
    </Col>
  )
}

export default LeftLayout
