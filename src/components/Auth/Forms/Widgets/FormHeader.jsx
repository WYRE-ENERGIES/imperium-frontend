import React from 'react'

import classes from './Widget.module.scss'

const FormHeader = ({ header, tagline }) => {
  return (
    <div className={classes.text}>
      <div>
        <h1>{header}</h1>
        <div>{tagline}</div>
      </div>
    </div>
  )
}

export default FormHeader
