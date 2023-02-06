import React from 'react'
import { Row, Col } from 'antd'
import classes from './Account.module.scss'
const AccountInfo = ({ accountInfo }) => {
  const { firstName, lastName, email } = accountInfo
  const firstNameInit = firstName.slice(0, 1)
  const lastNameInit = lastName.slice(0, 1)
  return (
    <div className={classes.AccountInfo}>
      <Row>
        <Col>
          <div className={classes.AccountInfo__Init}>
            <p>
              {firstNameInit}
              {lastNameInit}
            </p>
          </div>
        </Col>
        <Col>
          <div className={classes.AccountInfo__Info}>
            {' '}
            <div>
              <p>
                {firstName} {lastName}
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
