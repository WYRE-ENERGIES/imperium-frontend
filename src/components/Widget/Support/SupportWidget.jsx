import React from 'react'
import classes from './SupportWidget.module.scss'

const SupportWidget = ({ Icon, name, value }) => {
  return (
    <div className={classes.SupportWidget}>
      <div className={classes.SupportWidget__div}>
        <Icon />
        <h3 className={classes.SupportWidget__title}>{name}</h3>
      </div>
      <h1 className={classes.SupportWidget__value}>{value}</h1>
    </div>
  )
}

export default SupportWidget
