import { Divider } from 'antd'
import React from 'react'
import googleIcon from '../../../../../src/assets/Auth/google.svg'
import classes from './Widget.module.scss'
import { useGoogleLogin } from '@react-oauth/google'

const ThirdPartyAuth = ({ signIn }) => {
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log('Login Failed:', error),
    redirect_uri: 'https://imperiumdev.wyreng.com/auth/google-oauth/',
  })
  return (
    <div className={classes.ThirdPartyAuth}>
      <button onClick={() => handleGoogleAuth()}>
        <img src={googleIcon} alt="google icon" />
        <p>Sign {signIn ? 'In' : 'Up'} with Google</p>
      </button>
      <div className={classes.ThirdPartyAuth__divider}>
        <Divider>or</Divider>
      </div>
    </div>
  )
}

export default ThirdPartyAuth
