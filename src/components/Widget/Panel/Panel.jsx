import { Col, Row } from 'antd'

import React from 'react'
import Widget from '../Widget/Widget'
import classes from './panel.module.scss'
import { panelWidgetsData } from '../../../utils/data'

const PanelWidgets = () => {
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
      <div className={classes.Panel__calendar}>calendar widgets</div>
    </div>
  )
}

export default PanelWidgets
