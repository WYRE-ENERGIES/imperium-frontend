import { Divider } from 'antd'
import React from 'react'

import googleIcon from '../../../../../src/assets/Auth/google.svg'
import classes from './Widget.module.scss'
const ThirdPartyAuth = () => {
  return (
    <div className={classes.ThirdPartyAuth}>
      <button>
        <img src={googleIcon} alt="google icon" />
        <p>Sign in with Google</p>
      </button>
      <div className={classes.ThirdPartyAuth__divider}>
        <Divider>or</Divider>
      </div>
    </div>
  )
}

export default ThirdPartyAuth
