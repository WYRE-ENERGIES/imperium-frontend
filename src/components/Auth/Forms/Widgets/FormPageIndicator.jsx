import { Col, Row } from 'antd'
import React from 'react'

import classes from './Widget.module.scss'
const PageIndicator = ({ pageNum }) => {
  const authPages = ['signup', 'verification', 'details', 'upload']
  return (
    <div className={classes.PageIndicator}>
      <div className={classes.PageIndicator__indicators}>
        <Row justify="center">
          {authPages.map((indicate, index) => (
            <Col key={index}>
              <div
                className={classes.PageIndicator__pageIndex}
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

export default PageIndicator
