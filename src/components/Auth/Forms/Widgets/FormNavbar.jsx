import React from 'react'
import classes from './Widget.module.scss'
import Logo from '../../../../assets/Auth/Logo.svg'

const FormNavbar = () => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__element}>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={classes.Navbar__btn}>
          <button>Sign Up</button>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default FormNavbar
