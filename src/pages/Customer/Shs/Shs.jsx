import { Col, Divider, Dropdown, Modal, Row, Tag } from 'antd'
import React from 'react'
import Chart from 'react-apexcharts'
import PageLayout from '../../../components/Layout/PageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PowerSwitch from '../../../components/PowerSwitch/PowerSwitch'
import classes from './Shs.module.scss'
import building from '../../../assets/widget-icons/building.svg'
import batteryPercent from '../../../assets/widget-icons/BatteryIcon1.svg'
import batteryStatus from '../../../assets/widget-icons/BatteryIcon2.svg'
import SolarPanel from '../../../assets/widget-icons/Frame 20.svg'
import { BiTrendingUp } from 'react-icons/bi'
import { BsArrowUpRight, BsFillSunFill } from 'react-icons/bs'
import { EyeOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { FaCaretDown } from 'react-icons/fa'

const DeviceInfo = () => {
  return (
    <div className={classes.Shs__DeviceInfo}>
      <h1>Device Details </h1>

      <div>
        <div>
          <p>Device Name</p>
          <p>Alday Banamex</p>
        </div>
        <Divider />
        <div>
          <p>Device address</p>
          <p>Number 10 ijaoye street, Jibowu, Lagos </p>
        </div>
        <Divider />
        <div>
          <p>G.P.S address</p>
          <p>10 Ijaoye St, Igbobi 101245, Lagos</p>
        </div>
        <Divider />
        <div className={classes.Shs__Gps}>
          <div>
            <p>Latitude</p>
            <p>6.520940</p>
          </div>
          <div>
            <p>Longitude</p>
            <p>6.520940</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Shs = () => {
  const deviceDetails = [
    {
      label: <DeviceInfo />,
      key: '1',
    },
  ]
  return (
    <PageLayout>
      <section className={classes.Shs}>
        <section className={classes.Shs__BreadCrumb}>
          {' '}
          <PageBreadcrumb title={'overview / ... / Alday Banamex '} />
          <PowerSwitch />
        </section>

        <section className={classes.Shs__EnergyPerfomance}>
          <Row
            gutter={{
              lg: 10,
            }}
          >
            <Col span={16}>
              {' '}
              <div className={classes.Shs__Performance}>
                <div className={classes.Shs__Monitoring}>
                  <div className={classes.Shs__PerformanceMonitor}>
                    <h1>Performance Monitoring </h1>
                    <Dropdown
                      className={classes.Shs__DeviceDropDown}
                      menu={{
                        items: deviceDetails,
                        onClick: (e) => e.preventDefault(),
                      }}
                      trigger={['click']}
                      placement="bottom"
                      overlayStyle={{ paddingLeft: '90px' }}
                    >
                      <p>
                        See Device Details{' '}
                        <EyeOutlined style={{ marginLeft: '3px' }} />
                      </p>
                    </Dropdown>
                  </div>
                  <div className={classes.Shs__Capacity}>
                    <p>
                      <span>1</span> SHS Capacity
                    </p>
                    <h1>380 kVA/4.7 kW</h1>
                  </div>
                </div>
                <div className={classes.Shs__MonitoringData}>
                  <Row
                    gutter={{
                      lg: 10,
                    }}
                  >
                    <Col span={12}>
                      <div className={classes.Shs__MonitoringDataSystem}>
                        <div
                          className={classes.Shs__MonitoringDataSystemStatus}
                        >
                          <div>
                            <small>Status</small>
                            <p>On</p>
                          </div>
                          <div>
                            <small>System Load</small>
                            <p>
                              60%{' '}
                              <small style={{ color: '#ABABAB' }}>
                                (36 kw)
                              </small>
                            </p>
                          </div>
                          <div>
                            <small>Source</small>
                            <p>PHCN</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <small>Battery Voltage</small>
                            <p>12.7 volts</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <small>Power Usage Today</small>
                            <p>
                              37. 3 kwh
                              <span>
                                <span>
                                  <BiTrendingUp />+ 2.0 %
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
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
                          <div
                            className={classes.Shs__MonitoringDataBatteryStatus}
                          >
                            <div>
                              <div>
                                <img src={batteryPercent} alt="" srcSet="" />
                              </div>
                              <div>
                                <p>Battery Percent</p>
                                <p>
                                  <span>2</span> 80%
                                </p>
                              </div>
                            </div>
                            <div>
                              <div>
                                <img src={batteryStatus} alt="" srcSet="" />
                              </div>
                              <div>
                                <p>Charging Status</p>
                                <p>
                                  <span>3</span> Charging
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={8}>
              {' '}
              <div className={classes.Shs__Generation}>
                <div className={classes.Shs__GenerationHeader}>
                  <h1>
                    Energy Generation <span>(kWh)</span>
                  </h1>
                  <Tag
                    key={'1'}
                    style={{
                      borderRadius: '20px',
                      color: '#363636',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '20px',
                    }}
                  >
                    Today
                  </Tag>
                </div>
                <Chart
                  type="bar"
                  options={{
                    fill: {
                      opacity: 1,
                    },
                    grid: {
                      show: true,
                      padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      },
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 7,
                        borderRadiusApplication: 'end',
                        dataLabels: {
                          position: 'top',
                        },
                      },
                    },
                    xaxis: {
                      categories: [
                        '9am',
                        '10am',
                        '11am',
                        '12pm',
                        '1pm',
                        '2pm',
                        '3pm',
                      ],
                    },
                    yaxis: {
                      show: false,
                    },
                    colors: ['#497A38'],
                    chart: {
                      id: 'basic-bar',
                      fontFamily: 'baloo 2',
                      toolbar: {
                        show: false,
                      },
                    },
                  }}
                  series={[
                    {
                      name: 'Kwh',
                      data: [20, 32, 80, 50, 49, 60, 70],
                    },
                  ]}
                  height="90%"
                />
              </div>
            </Col>
          </Row>
        </section>
        <section className={classes.Shs__EnergyStats}>
          <Row
            gutter={{
              lg: 10,
            }}
          >
            <Col span={16}>
              <div className={classes.Shs__EnergyChart}>
                <div className={classes.Shs__EnergyChartShowMore}>
                  <div style={{ color: '#66ab4f' }}>Show more</div>
                </div>
                <Chart
                  height="100%"
                  options={{
                    title: {
                      text: 'Energy Consumed VS Energy Generated',
                      align: 'left',
                      margin: 10,
                      offsetX: 10,
                      offsetY: 0,
                      floating: false,
                      style: {
                        fontSize: '18px',
                        fontWeight: '500',
                        fontFamily: undefined,
                        color: '#263238',
                      },
                    },
                    legend: {
                      show: true,
                      fontSize: '14px',
                      position: 'top',
                      horizontalAlign: 'center',
                      offsetX: 299,
                    },
                    fill: {
                      opacity: 0.1,
                    },

                    chart: {
                      id: 'energy-bar',
                      fontFamily: 'baloo 2',
                      toolbar: {
                        show: false,
                      },
                      type: 'line',
                    },
                    stroke: {
                      curve: 'smooth',
                    },
                    colors: ['#C9E00C', '#5C9D48'],
                    xaxis: {
                      categories: [
                        0,
                        'Jan',
                        'Mar',
                        'May',
                        'Jul',
                        'Sep',
                        'Nov',
                        'Dec',
                      ],
                      title: {
                        text: 'Month',
                        offsetX: 0,
                        offsetY: 100,
                        style: {
                          color: '#737373',
                          fontSize: '12px',
                          fontFamily: 'Baloo 2',
                          fontWeight: 600,
                        },
                      },
                    },
                    yaxis: {
                      title: {
                        text: 'kWh',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                          color: '#737373',
                          fontSize: '12px',
                          fontFamily: 'Baloo 2',
                          fontWeight: 600,
                        },
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                  }}
                  type="area"
                  series={[
                    {
                      name: 'Energy Consumed',
                      align: 'top',
                      data: [15, 30, 60, 45, 62, 10, 86, 98],
                    },
                    {
                      name: ' Energy Generated',
                      data: [2, 5, 38, 20, 47, 2, 50, 71],
                    },
                  ]}
                />
              </div>
            </Col>
            <Col span={8}>
              <div className={classes.Shs__EnergyPanel}>
                <p>Panels</p>
                <div>
                  <div className={classes.Shs__PanelData}>
                    <div>
                      <Row justify="space-between">
                        <Col span={4}>
                          {' '}
                          <div>
                            <img src={SolarPanel} alt="" srcSet="" />
                          </div>
                        </Col>
                        <Col span={13}>
                          <div>
                            <p style={{ marginTop: '25px' }}>Xaxier Panel</p>
                            <p style={{ color: '#737373' }}>
                              Panel Voltage: 3.3 kwh{' '}
                            </p>
                          </div>
                        </Col>
                        <Col span={7}>
                          <div>
                            <div className={classes.Shs__BoltIcon}>
                              <p>
                                {' '}
                                <ThunderboltOutlined
                                  style={{ color: '#EAAA08' }}
                                  size={20}
                                />
                              </p>
                              <p>12.4 kwh</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Divider />
                      <div
                        style={{
                          color: '#497A38',
                          fontWeight: '500',
                          float: 'right',
                          marginTop: '-10px',
                        }}
                      >
                        <span style={{ marginRight: '2px' }}> Show more</span>
                        <span>
                          {' '}
                          <BsArrowUpRight style={{ marginTop: '2px' }} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.Shs__PanelData}>
                    <div>
                      <Row justify="space-between">
                        <Col span={4}>
                          {' '}
                          <div>
                            <img src={SolarPanel} alt="" srcSet="" />
                          </div>
                        </Col>
                        <Col span={13}>
                          <div>
                            <p style={{ marginTop: '25px' }}>Battery Health</p>
                            <p style={{ color: '#737373' }}>Good</p>
                          </div>
                        </Col>
                        <Col span={7}>
                          <div>
                            <div className={classes.Shs__BoltIcon}>
                              <p>
                                {' '}
                                <ThunderboltOutlined
                                  style={{ color: '#EAAA08' }}
                                  size={20}
                                />
                              </p>
                              <p>Charging</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Divider />
                      <div
                        style={{
                          color: '#497A38',
                          fontWeight: '500',
                          float: 'right',
                          marginTop: '-10px',
                        }}
                      >
                        <span style={{ marginRight: '2px' }}> Show more</span>
                        <span>
                          {' '}
                          <BsArrowUpRight style={{ marginTop: '2px' }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </section>
    </PageLayout>
  )
}

export default Shs
