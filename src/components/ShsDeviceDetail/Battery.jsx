import React from 'react'
import classes from './Shs.module.scss'
import { Col, Row } from 'antd'

import panelbattery from '../../assets/widget-icons/panelBattery.svg'
import { ThunderboltOutlined } from '@ant-design/icons'
const Battery = ({ performance }) => {
  return (
    <div className={classes.Shs__PanelData}>
      <div>
        <Row style={{ padding: '0 15px 0 20px' }}>
          <Col style={{ marginRight: '6px' }}>
            {' '}
            <div>
              <img src={panelbattery} alt="" srcSet="" />
            </div>
          </Col>
          <Col style={{ marginRight: '3px' }}>
            <div>
              <p style={{ marginTop: '25px' }}>Battery Health</p>
              <p style={{ color: '#737373' }}>Good </p>
            </div>
          </Col>
          <Col
            style={{
              marginLeft: 'auto',
            }}
          >
            <div>
              <div className={classes.Shs__BoltIcon}>
                <p>
                  {performance?.charging_status === true ? (
                    <ThunderboltOutlined
                      style={{ color: '#EAAA08' }}
                      size={20}
                    />
                  ) : (
                    ''
                  )}
                </p>
                <p
                  style={{
                    color:
                      performance?.charging_status === true
                        ? '#EAAA08'
                        : '#F04438',
                  }}
                >
                  {performance?.charging_status === true
                    ? 'Charging'
                    : 'Not charging'}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Battery
