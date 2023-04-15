import React from 'react'
import classes from './Shs.module.scss'
import { Col, Row } from 'antd'
import SolarPanel from '../../assets/widget-icons/Frame 20.svg'
import panelbattery from '../../assets/widget-icons/panelBattery.svg'
import { ThunderboltOutlined } from '@ant-design/icons'
const Panel = ({ panels, performance }) => {
  return (
    <div className={classes.Shs__PanelList}>
      {panels.map((panel, key) => (
        <div className={classes.Shs__PanelData} key={key}>
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
                      <ThunderboltOutlined
                        style={{ color: '#EAAA08' }}
                        size={20}
                      />
                    </p>
                    <p>{panel?.panel_kwh} kwh</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ))}
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
                          ? 'white'
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
      </div>{' '}
    </div>
  )
}

export default Panel
