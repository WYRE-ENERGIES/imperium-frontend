import React from 'react'
import { ReactComponent as WidgetGraphIcon } from '../../../assets/widget-icons/widget-graph.svg'
import classes from './EnergyAnalyticWidget.module.scss'
import widgetClasses from '../Widget/Widget.module.scss'

const EnergyAnalyticWidget = ({ Icon, title, range, value }) => {
  return (
    <div className={`${classes.EnergyAnalyticWidget} ${widgetClasses.Widget}`}>
      <Icon />
      <div className={widgetClasses.Widget__data}>
        <h1 className={widgetClasses.Widget__title}>{title}</h1>
        <h4 type="secondary" className={widgetClasses.Widget__subtitle}>
          {range}
        </h4>
        <h1 className={widgetClasses.Widget__value}>
          {value} <span>kWh</span>
        </h1>
      </div>
      <WidgetGraphIcon className={classes.EnergyAnalyticWidget__graphIcon} />
    </div>
  )
}

export default EnergyAnalyticWidget
