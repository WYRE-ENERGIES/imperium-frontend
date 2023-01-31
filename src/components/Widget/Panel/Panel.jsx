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
      <Row gutter={[16, 24]} className={classes.Panel__widgets}>
        <Col className="gutter-row" span={14}>
          {widgets[0]}
        </Col>
        <Col className="gutter-row" span={10}>
          {widgets[1]}
        </Col>
        <Col className="gutter-row" span={14}>
          {widgets[2]}
        </Col>
        <Col className="gutter-row" span={10}>
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
