import { Col, Row } from 'antd'
import React from 'react'

import Logo from '../../Img/Logo.svg'
import classes from './LeftLayout.module.scss'
const LeftLayout = ({ children }) => {
  return (
    <Col span={12}>
      <div className={classes.Layout}>
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
