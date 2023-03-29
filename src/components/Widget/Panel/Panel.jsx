import { Col, Row } from 'antd'

import { ReactComponent as BentArrowWidgetIcon } from '../../../assets/widget-icons/bent-arrow.svg'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import React from 'react'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import { ReactComponent as SunWidgetIcon } from '../../../assets/widget-icons/sun.svg'
import Widget from '../Widget/Widget'
import classes from './panel.module.scss'

const PanelWidgets = ({ data, isLoading }) => {
  let widgets = []
  if (!isLoading && data) {
    widgets = [
      {
        id: 1,
        icon: EnergyWidgetIcon,
        title: 'Panel Total Energy',
        range: 'For the year',
        value: parseFloat(data?.panel_total_energy?.toFixed(1)) || 0,
        valueCurrency: 'WH',
      },
      {
        id: 2,
        icon: BentArrowWidgetIcon,
        title: 'Panel Voltage',
        range: 'For the year',
        value: parseFloat(data?.panel_voltage?.toFixed(1)) || 0,
        valueCurrency: 'V',
      },
      {
        id: 1,
        icon: SEnergyWidgetIcon,
        title: 'Panel Total Power',
        range: 'For the year',
        value: parseFloat(data?.panel_total_power?.toFixed(1)) || 0,
        valueCurrency: 'W',
      },
      {
        id: 1,
        icon: SunWidgetIcon,
        title: 'Panel Current',
        range: 'For the year',
        value: parseFloat(data?.panel_current?.toFixed(1)) || 0,
        valueCurrency: 'A',
      },
    ].map((data, index) => (
      <Widget
        key={index}
        title={data.title}
        Icon={data.icon}
        value={data.value}
        valueCurrency={data.valueCurrency}
      />
    ))
  }

  return (
    <div className={classes.Panel}>
      <Row
        justify={'space-between'}
        gutter={[2, 16]}
        className={classes.Panel__widgets}
      >
        <Col lg={14} md={14} sm={14} xs={24}>
          {widgets[0]}
        </Col>
        <Col lg={10} md={10} sm={10} xs={24}>
          {widgets[1]}
        </Col>
        <Col lg={14} md={14} sm={14} xs={24}>
          {widgets[2]}
        </Col>
        <Col lg={10} md={10} sm={10} xs={24}>
          {widgets[3]}
        </Col>
      </Row>
      <div className={classes.Panel__weather}>
        <div className={classes.Panel__weatherDetails}>
          <div>
            Today’s weather forecast <span>31</span>
          </div>
          <div>
            CO2 avoided{' '}
            <span>{parseFloat(data?.weather_stats?.co2?.toFixed(1)) || 0}</span>
          </div>
          <div>
            Total Panel <span>{data?.weather_stats?.total_panel || 0}</span>
          </div>
        </div>
        <div className={classes.Panel__weatherForecast}>
          <section>forecast goes here</section>
        </div>
      </div>
    </div>
  )
}

export default PanelWidgets
