import React from 'react'
import { Col, Row } from 'antd'
import classes from './Shs.module.scss'
import SolarPanel from '../../assets/widget-icons/Frame 20.svg'
import { ThunderboltOutlined } from '@ant-design/icons'
const PanelData = ({ panel }) => {
  return (
    <div className={classes.Shs__PanelData}>
      <div>
        <Row style={{ padding: '0 15px 0 20px' }}>
          <Col style={{ marginRight: '6px' }}>
            {' '}
            <div>
              <img src={SolarPanel} alt="" srcSet="" />
            </div>
          </Col>
          <Col style={{ marginRight: '3px' }}>
            <div>
              <p style={{ marginTop: '25px' }}>{panel?.device_name}</p>
              <p style={{ color: '#737373' }}>
                Voltage: {panel?.panel_voltage} V{' '}
              </p>
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
                  {' '}
                  <ThunderboltOutlined style={{ color: '#EAAA08' }} size={20} />
                </p>
                <p>{panel?.panel_kwh} kWh</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PanelData
