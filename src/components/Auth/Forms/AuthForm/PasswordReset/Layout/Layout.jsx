import React from 'react'
import classes from './Layout.module.scss'
const Layout = ({ children, background = ' #f0f7ed' }) => {
  return (
    <div style={{ background: background }} className={classes.Layout}>
      <div>{children}</div>
    </div>
  )
}

export default Layout
