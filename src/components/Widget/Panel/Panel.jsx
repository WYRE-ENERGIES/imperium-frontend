import { Col, Row } from 'antd'

import React from 'react'
import Widget from '../Widget/Widget'
import classes from './panel.module.scss'
import { panelWidgetsData } from '../../../utils/data'

const PanelWidgets = ({ totalPanel }) => {
  const widgets = panelWidgetsData.map((data, index) => (
    <Widget
      key={index}
      title={data.title}
      Icon={data.icon}
      value={data.value}
      valueCurrency={data.valueCurrency}
    />
  ))

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
            CO2 avoided <span>12kg</span>
          </div>
          <div>
            Total Panel <span>{totalPanel}</span>
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
