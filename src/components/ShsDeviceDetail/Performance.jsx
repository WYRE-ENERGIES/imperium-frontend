import React, { useState } from 'react'
import classes from './Shs.module.scss'
import { Dropdown } from 'antd'
import { BiTrendingUp } from 'react-icons/bi'
import { BsFillSunFill } from 'react-icons/bs'
import { CloseOutlined } from '@ant-design/icons'
import building from '../../assets/widget-icons/building.svg'
import Loading from '../Loading/Loading'
import DeviceInfo from './DeviceInfo'
import batteryPercent from '../../assets/widget-icons/BatteryIcon1.svg'
import batteryStatus from '../../assets/widget-icons/BatteryIcon2.svg'

const Performance = ({ performanceLoading, performance }) => {
  const CloseDeviceInfo = () => {
    return (
      <span className={classes.Shs__CloseDeviceInfo}>
        <CloseOutlined />
      </span>
    )
  }
  const deviceDetails = [
    {
      label: <DeviceInfo data={performance?.device_details} />,
      key: '1',
    },
    {
      label: <CloseDeviceInfo />,
      key: '2',
    },
  ]

  const [openDeviceDetail, setOpenDeviceDetail] = useState(false)

  const handleOnCloseDeviceModal = (e) => {
    if (e.key === '2') {
      setOpenDeviceDetail(false)
    }
  }
  const handleOpenChange = (flag) => {
    setOpenDeviceDetail(flag)
  }
  return (
    <div className={classes.Shs__Performance}>
      <div className={classes.Shs__MonitoringData}>
        {performanceLoading ? (
          <Loading data={'shs performance'} />
        ) : performance ? (
          <div className={classes.Shs__Section}>
            <div>
              <div className={classes.Shs__Monitoring}>
                <div className={classes.Shs__PerformanceMonitor}>
                  <h1>Performance Monitoring </h1>

                  <Dropdown
                    menu={{
                      items: deviceDetails,
                      onClick: handleOnCloseDeviceModal,
                    }}
                    trigger={['click']}
                    placement="bottomLeft"
                    onOpenChange={handleOpenChange}
                    open={openDeviceDetail}
                  >
                    <p className={classes.Shs__SeeDevice}>
                      See Device Details{' '}
                    </p>
                  </Dropdown>
                </div>
              </div>
              <div className={classes.Shs__MonitoringDataSystem}>
                <div className={classes.Shs__MonitoringDataSystemStatus}>
                  <div>
                    <small>Status</small>
                    <p
                      style={{
                        color:
                          performance?.status === 'OFF' ? ' #F04438' : 'white',
                      }}
                    >
                      {performance?.status}
                    </p>
                  </div>
                  <div>
                    <small>System Load</small>
                    <p>
                      {performance?.system_load}%{' '}
                      <small style={{ color: '#ABABAB' }}>(36 kW)</small>
                    </p>
                  </div>
                  <div>
                    <small>Source</small>
                    <p>{performance?.source?.toUpperCase()}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <small>Battery Voltage</small>
                    <p>{performance?.battery_voltage || 0} volts</p>
                  </div>
                </div>
                <div>
                  <div>
                    <small>Power Usage Today</small>
                    <p>
                      {performance?.power_usage_today.toLocaleString('us-US')}{' '}
                      kWh
                      <span>
                        <span>
                          <BiTrendingUp />+ 2.0 %
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={classes.Shs__Capacity}>
                <p>
                  <span>1</span> SHS Capacity
                </p>
                <h1>
                  {performanceLoading
                    ? '---'
                    : performance
                    ? performance?.capacity
                    : 0}
                  kVA/4.7 kW
                </h1>
              </div>
              <div className={classes.Shs__MonitoringDataBattery}>
                <div className={classes.Shs__MonitoringDataBuilding}>
                  <img src={building} alt="" srcSet="" />
                  <div className={classes.Shs__MonitoringDataRadiation}>
                    <div>
                      <span>
                        <BsFillSunFill color="#FAC515" /> 32°C
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={classes.Shs__MonitoringDataBatteryStatus}>
                    <div>
                      <div>
                        <img src={batteryPercent} alt="" srcSet="" />
                      </div>
                      <div>
                        <p>Battery Percent</p>
                        <p>
                          <span>2</span> {performance?.battery_percent || 0}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={batteryStatus} alt="" srcSet="" />
                      </div>
                      <div>
                        <p>Charging Status</p>
                        <p
                          style={{
                            color:
                              performance?.charging_status === true
                                ? 'white'
                                : '#F04438',
                          }}
                        >
                          {performance?.charging_status === true ? (
                            <>
                              <span>3 </span> Charging
                            </>
                          ) : (
                            'Not charging'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'white' }}>No data records</p>
        )}
      </div>
    </div>
  )
}

export default Performance
