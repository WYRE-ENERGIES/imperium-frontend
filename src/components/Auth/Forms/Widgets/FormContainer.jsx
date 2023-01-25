import React from 'react'

import classes from './Widget.modules.scss'

const FormContainer = ({ children, props }) => {
  return (
    <div className={classes.FormContainer}>
      <div>
        {children}
        {props}
      </div>
      <div></div>
    </div>
  )
}

export default FormContainer
