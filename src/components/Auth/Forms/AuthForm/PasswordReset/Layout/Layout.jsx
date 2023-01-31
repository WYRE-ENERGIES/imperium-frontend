import React from 'react'
import classes from './Layout.module.scss'
const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <div>{children}</div>
    </div>
  )
}

export default Layout
