import { Col, Row } from 'antd'
import React from 'react'
import ErrorImg from '../../../assets/Error/404 Error-amico 1.svg'
import Layout from '../../Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import classes from './ErrorLayout.module.scss'
import { BiEnvelope } from 'react-icons/bi'
const ErrorLayout = ({ children }) => {
  return (
    <div className={classes.ErrorLayout}>
      <Layout>
        <div className={classes.ErrorLayout__Container}>
          <div className={classes.ErrorLayout__Content}>
            <Row>
              <Col span={12}>
                <img src={ErrorImg} alt="" srcSet="" />
              </Col>
              <Col span={12}>{children}</Col>
            </Row>
          </div>
        </div>
      </Layout>
      <div>
        {' '}
        <div className={classes.ErrorLayout__footer}>
          <div className={classes.ErrorLayout__footerContent}>
            {' '}
            <div>
              {' '}
              <p>© imperium 2023</p>
            </div>
            <div>
              <p className={classes.ErrorLayout__icon}>
                <span>
                  <BiEnvelope size={18} />
                </span>
                <p>help@imperium.com</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorLayout
