import React from 'react'
import classes from './Widget.module.scss'
import Logo from '../../../../assets/Auth/Logo.svg'
import { Link } from 'react-router-dom'
const FormNavbar = () => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__element}>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={classes.Navbar__btn}>
          <Link to={'/signup'}>Sign Up</Link>
          <Link to={'/'}>Sign In </Link>
        </div>
      </div>
    </div>
  )
}

export default FormNavbar
