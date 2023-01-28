import { React, useState } from 'react'
import FormHeader from '../../Widgets/FormHeader'
import classes from './Otp.module.scss'
import icon from '../../../../../assets/Auth/Group 18.svg'
import { useNavigate } from 'react-router-dom'
import FormButton from '../../Widgets/FormButton'
import { Link } from 'react-router-dom'
import OtpInput from 'react-otp-input'
const Otp = () => {
  const [otp, setOtp] = useState('')
  const nextPage = useNavigate()

  const handleOnsubmit = () => {
    nextPage('/new-password')
  }

  return (
    <div className={classes.Otp}>
      <div className={classes.Otp__FormContent}>
        <h1 className={classes.Otp__header}>Forgot password</h1>

        <div className={classes.Otp__Form}>
          <div>
            <img src={icon} alt="" srcSet="" />
          </div>
          <div className={classes.Otp__FormText}>
            {' '}
            <FormHeader
              header={'OTP Verification'}
              tagline={'Enter OTP sent to nisha@uitrend.com'}
            />
          </div>
        </div>
        <div>
          <form action="" method="post" onSubmit={handleOnsubmit}>
            <OtpInput
              value={otp}
              onChange={(e) => {
                setOtp(e)
              }}
              inputStyle={classes.Otp__FormInput}
              containerStyle={classes.Otp__FormInputContainer}
              focusStyle={classes.Otp__FormInputFocus}
              placeholder="0000"
              numInputs={4}
              isInputNum={true}
            />
            <FormButton type={'submit'} action={'Continue'} icon={''} />
          </form>
          <div className={classes.Otp__Resend}>
            Didn’t receive code? <Link to={'/forgot-password'}>Resend</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
