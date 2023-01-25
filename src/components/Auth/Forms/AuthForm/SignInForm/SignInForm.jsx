import React from 'react'

import AuthForm from '../AuthForm'
import classes from './SignInForm.module.scss'

const SignInForm = () => {
  const headlines = {
    header: 'Log In',
    tag: 'Welcome back! Please enter your details.',
    footer: 'Don’t have an account?',
    action: 'signup',
    url: 'signup',
    helpertext: 'Can’t remember password ?',
    btnText: 'Log In',
  }
  return (
    <div className={classes.SignIn}>
      <AuthForm props={headlines}></AuthForm>
    </div>
  )
}

export default SignInForm
