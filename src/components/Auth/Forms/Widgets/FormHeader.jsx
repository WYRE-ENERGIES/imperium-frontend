import React from 'react'

import classes from './Widget.module.scss'

const FormHeader = ({ header, tagline }) => {
  return (
    <div className={classes.text}>
      <div>
        <h1>{header}</h1>
        <p>{tagline}</p>
      </div>
    </div>
  )
}

export default FormHeader
