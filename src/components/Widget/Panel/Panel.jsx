import OverviewWidget from '../Overview/OverviewWidget'
import React from 'react'
import classes from './panel.module.scss'
import { panelWidgetsData } from '../../../utils/data'

const PanelWidgets = () => {
  const widgets = panelWidgetsData.map((data, index) => (
    <OverviewWidget
      key={index}
      title={data.title}
      Icon={data.icon}
      value={data.value}
      valueCurrency={data.valueCurrency}
    />
  ))
  return (
    <div className={classes.Panel}>
      <div className={classes.Panel__widgets}>{widgets}</div>
      <div className={classes.Panel__calendar}>calendar widgets</div>
    </div>
  )
}

export default PanelWidgets
