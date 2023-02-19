import React from 'react'
import { Link } from 'react-router-dom'

import AuthForm from '../AuthForm'
import classes from './SignInForm.module.scss'

const SignInForm = () => {
  const headlines = {
    header: 'Log In',
    tag: 'Welcome back! Please enter your details.',
    footer: 'Don’t have an account?',
    action: 'signup',
    url: '/overview',
    helpertext: (
      <Link to={'/forgot-password'} style={{ color: 'gray' }}>
        Can’t remember password ?
      </Link>
    ),
    btnText: 'Log In',
    footerlink: '/sign-up',
  }
  return (
    <div className={classes.SignIn}>
      <AuthForm props={headlines}></AuthForm>
    </div>
  )
}

export default SignInForm
