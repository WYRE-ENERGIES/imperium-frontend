import '../../styles/AuthStyling/Auth.css'

import { Col, Row } from 'antd'
import React from 'react'

import Logo from './Img/Logo.svg'

const LeftSection = ({ children }) => {
  return (
    <Col span={12}>
      <div className="leftSection">
        <div>
          <img src={Logo} alt="" />
        </div>
        <Row justify="center" align={'middle'}>
          {children}
        </Row>
      </div>
    </Col>
  )
}

export default LeftSection
