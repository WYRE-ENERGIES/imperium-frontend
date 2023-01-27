import React from 'react'
import FormNavbar from '../../../Widgets/FormNavbar'
import classes from './Layout.module.scss'
const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <div></div> <div>{children}</div>
    </div>
  )
}

export default Layout
