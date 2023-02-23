import React from 'react'

import classes from './Widget.module.scss'

const FormButton = ({ action }) => {
  return (
    <div className={classes.Button}>
      <button type="submit">
        <span> {action}</span>
      </button>
    </div>
  )
}

export default FormButton
