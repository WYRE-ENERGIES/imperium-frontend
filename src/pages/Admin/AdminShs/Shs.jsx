import { CloseOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Col, Divider, Dropdown, Modal, Row, Tag } from 'antd'

import React, { useState } from 'react'

import { BiTrendingUp } from 'react-icons/bi'
import { BsFillSunFill } from 'react-icons/bs'
import Chart from 'react-apexcharts'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PowerSwitch from '../../../components/PowerSwitch/PowerSwitch'
import SolarPanel from '../../../assets/widget-icons/Frame 20.svg'
import batteryPercent from '../../../assets/widget-icons/BatteryIcon1.svg'
import batteryStatus from '../../../assets/widget-icons/BatteryIcon2.svg'
import building from '../../../assets/widget-icons/building.svg'
import caretdown from '../../../assets/widget-icons/caretdown.svg'
import classes from './Shs.module.scss'
import panelarrow from '../../../assets/widget-icons/panelArrow.svg'
import panelbattery from '../../../assets/widget-icons/panelBattery.svg'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { useParams } from 'react-router-dom'
import {
  useGetEnergyGenerationQuery,
  useGetEnergyStatisticsQuery,
  useGetPanelsListQuery,
} from '../../../features/slices/shs/admin/shsSlice'
import { useEffect } from 'react'

const DeviceInfo = () => {
  return (
    <div className={classes.Shs__DeviceInfo}>
      <div>
        {' '}
        <h1>Device Details </h1>
      </div>
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

const CloseDeviceInfo = () => {
  return (
    <span className={classes.Shs__CloseDeviceInfo}>
      <CloseOutlined />
    </span>
  )
}

const Shs = () => {
  const { id } = useParams()
  const [panels, setPanels] = useState([])
  const { data: energyGeneration, isLoading: energyGenerationLoading } =
    useGetEnergyGenerationQuery({ id: id })
  console.log(energyGeneration)
  const { data: energyStatistics, isLoading: energyStatisticsLoading } =
    useGetEnergyStatisticsQuery({ id: id })
  console.log(energyStatistics)
  const { data: panelList, isLoading: panelListLoading } =
    useGetPanelsListQuery({ id: id })
  console.log(panelList)

  const [open, setOpen] = useState(false)
  const handleOnCloseDeviceModal = (e) => {
    if (e.key === '2') {
      setOpen(false)
      console.log(e.key)
    }
  }

  const handleOpenChange = (flag) => {
    setOpen(flag)
  }

  const deviceDetails = [
    {
      label: <DeviceInfo />,
      key: '1',
    },
    {
      label: <CloseDeviceInfo />,
      key: '2',
    },
  ]
  useEffect(() => {
    setPanels(panelList?.results)
  }, [panelList])
  return (
    <AdminPageLayout>
      <section className={classes.Shs}>
        <section className={classes.Shs__BreadCrumb}>
          {' '}
          <div style={{ display: 'flex' }}>
            <PageBreadcrumb
              title="Alday Banamex"
              items={['Overview', '...', 'Alday Banamex']}
            />
            <img
              src={caretdown}
              alt=""
              srcSet=""
              style={{ margin: '-40px 0 0 10px' }}
            />
          </div>
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
                        onClick: handleOnCloseDeviceModal,
                      }}
                      trigger={['click']}
                      placement="bottom"
                      overlayStyle={{ paddingLeft: '90px' }}
                      onOpenChange={handleOpenChange}
                      open={open}
                    >
                      <p>See Device Details </p>
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
                    dataLabels: {
                      enabled: true,
                      position: 'top',
                      style: {
                        fontSize: '12px',
                        fontWeight: 'bold',
                      },
                      background: {
                        enabled: true,
                        foreColor: '#497A38',
                        padding: 4,
                        opacity: 1,
                        borderColor: '#fff',
                        borderRadius: '10px',
                      },
                    },
                    fill: {
                      colors: undefined,
                      opacity: 0.9,
                      type: 'solid',
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
                        barHeight: '7%',
                        borderRadius: 7,
                        borderRadiusApplication: 'end',
                        columnWidth: '70px',
                        dataLabels: {
                          enabled: false,
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
                  <div style={{ color: '#385E2B' }}>Show more</div>
                </div>
                <Chart
                  height="100%"
                  options={{
                    title: {
                      text: 'Energy Consumed VS Energy Generated',
                      align: 'left',
                      margin: 10,
                      offsetX: 10,
                      offsetY: 20,
                      floating: false,
                      style: {
                        fontSize: '18px',
                        fontWeight: '500',
                        fontFamily: undefined,
                        color: '#263238',
                      },
                    },
                    legend: {
                      fontSize: '14px',
                      position: 'top',
                      horizontalAlign: 'right',
                    },
                    fill: {
                      opacity: 0.1,
                      gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.45,
                        opacityTo: 0.05,
                        stops: [20, 100, 100, 100],
                      },
                    },

                    chart: {
                      id: 'energy-bar',
                      fontFamily: 'baloo 2',
                      stacked: true,
                      toolbar: {
                        show: false,
                      },
                      type: 'area',
                    },
                    stroke: {
                      curve: 'smooth',
                    },
                    colors: ['#C9E00C', '#5C9D48'],
                    xaxis: {
                      categories: [
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
                      data: [15, 30, 60, 45, 10, 86, 98],
                    },
                    {
                      name: ' Energy Generated',
                      data: [2, 5, 38, 20, 47, 2, 71],
                    },
                  ]}
                  width="100%"
                />
              </div>
            </Col>
            <Col span={8}>
              <div className={classes.Shs__EnergyPanel}>
                <p>Panels</p>
                <div>
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
                            <p style={{ marginTop: '25px' }}>Xaxier Panel</p>
                            <p style={{ color: '#737373' }}>
                              Panel Voltage: 3.3 kwh{' '}
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
                              <p>12.4 kwh</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Divider />
                      <div className={classes.Shs__PanelShowMore}>
                        <div>
                          <p> Show more</p> <img src={panelarrow} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <div className={classes.Shs__PanelShowMore}>
                        <div>
                          <p> Show more</p> <img src={panelarrow} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default Shs
