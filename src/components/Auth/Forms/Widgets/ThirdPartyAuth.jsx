import { Divider } from 'antd'
import React from 'react'
import googleIcon from '../../../../../src/assets/Auth/google.svg'
import classes from './Widget.module.scss'
import { useGoogleLogin } from '@react-oauth/google'

const ThirdPartyAuth = ({ signIn }) => {
  // const handleGoogleAuth = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  //   onError: (error) => console.log('Login Failed:', error),
  //   redirect_uri: 'https://imperiumdev.wyreng.com/auth/google-oauth/',
  // })
  return (
    <div className={classes.ThirdPartyAuth}>
      <a href="https://accounts.google.com/o/oauth2/auth?client_id=924325109646-o67mb2njlourq5jfscuqjepabcn1h5mj.apps.googleusercontent.com&redirect_uri=https://imperiumdev.wyreng.com/auth/google-oauth/&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code">
        <img src={googleIcon} alt="google icon" />
        <p>Sign {signIn ? 'In' : 'Up'} with Google</p>
      </a>
      <div className={classes.ThirdPartyAuth__divider}>
        <Divider>or</Divider>
      </div>
    </div>
  )
}

export default ThirdPartyAuth
