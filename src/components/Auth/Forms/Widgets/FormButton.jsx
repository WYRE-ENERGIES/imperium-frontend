import React from 'react'

import classes from './Widget.module.scss'

const FormButton = ({ type, action, icon }) => {
  return (
    <div className={classes.button}>
      <button type={type}>
        {icon ? <img src={icon} alt="" /> : ''} <span> {action}</span>
      </button>
    </div>
  )
}

export default FormButton
