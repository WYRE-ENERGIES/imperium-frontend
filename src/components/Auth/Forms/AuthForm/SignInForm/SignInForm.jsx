import AuthForm from '../AuthForm'
import React from 'react'
import classes from './SignInForm.module.scss'

const SignInForm = ({ isAdmin = false }) => {
  const headlines = {
    header: 'Log In',
    tag: 'Welcome back! Please enter your details.',
    footer: 'Don’t have an account?',
    action: 'signup',
    url: isAdmin ? '/admin/battery-analytic' : '/overview',
    helpertext: 'Can’t remember password ?',
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
