import React from 'react'
import classes from './Widget.module.scss'
import CustomerLogo from '../../../../assets/Auth/Logo.svg'
import AdminLogo from '../../../../assets/Auth/admin.svg'
import { ReactComponent as MenuBar } from '../../../../assets/Auth/menubar.svg'
import { Link } from 'react-router-dom'
const FormNavbar = ({
  txtColor1 = '#385e2b',
  txtColor2 = 'white',
  btnColor1 = '#FFFF',
  btnColor2 = '#497a38',
}) => {
  const logo = btnColor1 === '#FFFF' ? CustomerLogo : AdminLogo
  const signInPage = logo === CustomerLogo ? '/' : '/admin/sign-in'
  const signUpPage = logo === CustomerLogo ? '/sign-up' : '/admin/sign-up'
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__element}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className={classes.Navbar__btn}>
          <Link
            style={{ background: btnColor1, color: txtColor1 }}
            to={signUpPage}
          >
            Sign Up
          </Link>
          <Link
            style={{ background: btnColor2, color: txtColor2 }}
            to={signInPage}
          >
            Sign In{' '}
          </Link>
        </div>
        <div className={classes.Navbar__Menubtn}>
          {' '}
          <MenuBar />
        </div>
      </div>
    </div>
  )
}

export default FormNavbar
