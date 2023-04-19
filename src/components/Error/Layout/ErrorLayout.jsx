import React from 'react'
import ErrorImg from '../../../assets/Error/404 Error-amico 1.svg'
import Layout from '../../Auth/Forms/AuthForm/PasswordReset/Layout/Layout'
import classes from './ErrorLayout.module.scss'
import { BiEnvelope } from 'react-icons/bi'
const ErrorLayout = (props) => {
  return (
    <div className={classes.ErrorLayout}>
      <Layout
        widgets={{
          header: props.status === 404 ? 'Page Not Found' : 'Access Denied',
          tag: (
            <span
              style={{
                color: '#5C9D48',
                fontWeight: 'bolder',
                textAlign: 'center',
              }}
            >
              Error {props.status}
            </span>
          ),
        }}
        admin={false}
        footer={
          <div className={classes.ErrorLayout__Footer}>
            {' '}
            <p>© imperium 2023</p>
            <div className={classes.ErrorLayout__icon}>
              <p>
                <BiEnvelope size={18} />
              </p>
              <p>help@imperium.com</p>
            </div>
          </div>
        }
      >
        <div className={classes.ErrorLayout__Container}>
          <div className={classes.ErrorLayout__Content}>
            <div className={classes.ErrorLayout__Form}>
              <div style={{ width: '300px' }}>
                <img src={ErrorImg} alt="" srcSet="" />
              </div>
              <div style={{ width: props?.width }}>{props.children}</div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default ErrorLayout
