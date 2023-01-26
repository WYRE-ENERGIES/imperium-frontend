import AuthForm from '../AuthForm'
import React from 'react'
import classes from './SignUpForm.module.scss'

const SignUpForm = () => {
  const headlines = {
    header: 'Sign up',
    tag: 'Let’s get started with imperium today',
    footer: 'Already have an account?',
    action: 'Log in',
    url: '',
    helpertext: 'Must be at least 8 characters.',
    btnText: 'Create account',
  }
  return (
    <div className={classes.SignUp}>
      <AuthForm props={headlines}>
        <div className={classes.SignUp__Info}>
          <p>
            By selecting <strong>Create account</strong>. I agree to imperium’s{' '}
            <span>privacy policy & terms </span>
          </p>
        </div>
      </AuthForm>
    </div>
  )
}

export default SignUpForm
