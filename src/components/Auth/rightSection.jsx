import { Col, Row } from 'antd'
import React from 'react'

const RightSection = ({ children }) => {
  return (
    <Col span={12}>
      <div className="rightSection">
        {' '}
        <Row justify="center" align={'middle'}>
          {children}
        </Row>
      </div>
    </Col>
  )
}

export default RightSection
