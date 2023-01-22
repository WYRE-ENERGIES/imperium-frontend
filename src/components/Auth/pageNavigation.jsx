import { Col, Row } from 'antd'
import React from 'react'
const PageNavigation = ({ pageNum }) => {
  const indicator = ['signup', 'verification', 'details', 'upload']
  return (
    <div className="PageNavigation">
      <div className="indicators">
        <Row justify="center">
          {indicator.map((indicate, index) => (
            <Col key={index}>
              <div
                className="pageIndex"
                style={{
                  backgroundColor: index === pageNum ? '#65AA4F' : '#DEDEDE',
                }}
              ></div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default PageNavigation
