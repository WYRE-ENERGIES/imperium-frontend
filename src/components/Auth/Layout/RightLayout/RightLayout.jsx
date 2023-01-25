import { Col, Row } from 'antd'
import React from 'react'
import { BiEnvelope } from 'react-icons/bi'

import classes from './RightLayout.module.scss'
const RightLayout = ({ children }) => {
  return (
    <Col span={12}>
      <div className={classes.Layout}>
        <Row justify="center" align={'middle'}>
          <div>{children}</div>
        </Row>
        <div className={classes.Layout__footer}>
          <p>© imperium 2023</p>
          <p className={classes.Layout__icon}>
            <p>
              <BiEnvelope size={18} />
            </p>
            <p>help@imperium.com</p>
          </p>
        </div>
      </div>
    </Col>
  )
}

export default RightLayout
