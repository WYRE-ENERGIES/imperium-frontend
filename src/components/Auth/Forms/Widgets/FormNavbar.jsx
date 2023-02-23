import React from 'react'
import classes from './Widget.module.scss'
import CustomerLogo from '../../../../assets/Auth/Logo.svg'
import AdminLogo from '../../../../assets/Auth/admin.svg'
import { Link } from 'react-router-dom'
const FormNavbar = ({
  txtColor1 = '#385e2b',
  txtColor2 = 'white',
  btnColor1 = '#FFFF',
  btnColor2 = '#497a38',
}) => {
  const logo = btnColor1 === '#FFFF' ? CustomerLogo : AdminLogo
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__element}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className={classes.Navbar__btn}>
          <Link
            style={{ background: btnColor1, color: txtColor1 }}
            to={'/sign-up'}
          >
            Sign Up
          </Link>
          <Link style={{ background: btnColor2, color: txtColor2 }} to={'/'}>
            Sign In{' '}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FormNavbar
