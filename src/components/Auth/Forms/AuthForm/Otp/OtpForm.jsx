import { React } from 'react'
import classes from './Otp.module.scss'
import { Link } from 'react-router-dom'
import UserForm from '../UserForm'
import { Form, Input } from 'antd'
const Otp = () => {
  return (
    <div className={classes.Otp}>
      <div>
        <UserForm formcontentprops={{ action: 'Submit' }}></UserForm>
      </div>
      <div></div>
    </div>
  )
}

export default Otp
