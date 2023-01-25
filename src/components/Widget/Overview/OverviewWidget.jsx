import React from 'react'
import classes from './OverviewWidget.module.scss'

const OverviewWidget = ({ Icon, title, range, value, valueCurrency }) => {
  return (
    <div className={classes.OverviewWidget}>
      <Icon />
      <div className={classes.OverviewWidget__data}>
        <h1 className={classes.OverviewWidget__title}>{title}</h1>
        <h4 type="secondary" className={classes.OverviewWidget__subtitle}>
          {range}
        </h4>
        <h1 className={classes.OverviewWidget__value}>
          {value} <span>{valueCurrency}</span>
        </h1>
      </div>
    </div>
  )
}

export default OverviewWidget
