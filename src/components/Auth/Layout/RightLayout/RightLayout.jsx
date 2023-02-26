import { Col, Row } from 'antd'
import React from 'react'
import { BiEnvelope } from 'react-icons/bi'

import classes from './RightLayout.module.scss'
const RightLayout = ({
  children,
  span = 12,
  backgroundColor = 'rgba(240, 247, 237, 0.6)',
}) => {
  return (
    <Col
      span={span}
      style={{ backgroundColor: backgroundColor }}
      className={classes.Layout}
    >
      <div>
        <Row justify="center" align={'middle'}>
          <div>{children}</div>
        </Row>
        <div className={classes.Layout__footer}>
          <div className={classes.Layout__footerContact}>
            {' '}
            <div>
              <p>© imperium 2023</p>
            </div>
            <div className={classes.Layout__icon}>
              <p>
                <BiEnvelope size={18} />
              </p>
              <p>help@imperium.com</p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default RightLayout
