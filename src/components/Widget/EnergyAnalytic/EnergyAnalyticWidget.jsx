import React from 'react'
import { ReactComponent as WidgetGraphIcon } from '../../../assets/widget-icons/widget-graph.svg'
import classes from './EnergyAnalyticWidget.module.scss'
import overviewWidgetClasses from '../Overview/OverviewWidget.module.scss'

const EnergyAnalyticWidget = ({ Icon, title, range, value }) => {
  return (
    <div
      className={`${classes.EnergyAnalyticWidget} ${overviewWidgetClasses.OverviewWidget}`}
    >
      <Icon />
      <div className={overviewWidgetClasses.OverviewWidget__data}>
        <h1 className={overviewWidgetClasses.OverviewWidget__title}>{title}</h1>
        <h4
          type="secondary"
          className={overviewWidgetClasses.OverviewWidget__subtitle}
        >
          {range}
        </h4>
        <h1 className={overviewWidgetClasses.OverviewWidget__value}>
          {value} <span>kWh</span>
        </h1>
      </div>
      <WidgetGraphIcon className={classes.EnergyAnalyticWidget__graphIcon} />
    </div>
  )
}

export default EnergyAnalyticWidget
