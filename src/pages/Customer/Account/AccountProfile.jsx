import { React, useState } from 'react'
import { Row, Col } from 'antd'
import classes from './Account.module.scss'
import { message, Form, Upload } from 'antd'

import { getItemFromLocalStorage } from '../../../utils/helpers'
const AccountInfo = ({ type, content }) => {
  const { first_name, last_name, email } = getItemFromLocalStorage('userInfo')

  return (
    <div className={classes.AccountInfo}>
      <Row>
        <Col>
          {type === 'business' ? (
            content
          ) : (
            <div className={classes.AccountInfo__Init}>
              <p>
                {first_name[0]}
                {last_name[0]}
              </p>
            </div>
          )}
        </Col>
        <Col>
          <div className={classes.AccountInfo__Info}>
            {' '}
            <div>
              <p>
                {first_name} {last_name}
              </p>
              <p>{email}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AccountInfo
