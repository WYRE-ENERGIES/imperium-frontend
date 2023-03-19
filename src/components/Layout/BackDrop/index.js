import React from 'react'
import classes from './BackDrop.module.scss'
const BackDrop = ({ show }) =>
  show ? <div className={classes.BackDrop}></div> : null

export default BackDrop
