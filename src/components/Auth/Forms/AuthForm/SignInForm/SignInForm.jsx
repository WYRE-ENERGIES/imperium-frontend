import AuthForm from '../AuthForm'
import React from 'react'
import classes from './SignInForm.module.scss'

const SignInForm = ({ isAdmin = false }) => {
  return (
    <div className={classes.SignIn}>
      <AuthForm></AuthForm>
    </div>
  )
}

export default SignInForm
