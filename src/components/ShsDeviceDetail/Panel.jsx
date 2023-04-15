import React from 'react'
import classes from './Shs.module.scss'

import { ThunderboltOutlined } from '@ant-design/icons'
import PanelData from './PanelData'
import Battery from './Battery'
const Panel = ({ panels, performance }) => {
  return (
    <div className={classes.Shs__PanelList}>
      {panels.map((panel, key) => (
        <PanelData panel={panel} key={key} />
      ))}
      <Battery performance={performance} />
    </div>
  )
}

export default Panel
