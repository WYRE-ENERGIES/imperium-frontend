import { CloseOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Col, Divider, Dropdown, Modal, Row, Tag } from 'antd'

import React, { useState } from 'react'

import { BiTrendingUp } from 'react-icons/bi'
import { BsFillSunFill } from 'react-icons/bs'
import Chart from 'react-apexcharts'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import PowerSwitch from '../../../components/PowerSwitch/PowerSwitch'
import SolarPanel from '../../../assets/widget-icons/Frame 20.svg'
import batteryPercent from '../../../assets/widget-icons/BatteryIcon1.svg'
import batteryStatus from '../../../assets/widget-icons/BatteryIcon2.svg'
import building from '../../../assets/widget-icons/building.svg'
import caretdown from '../../../assets/widget-icons/caretdown.svg'
import classes from './Shs.module.scss'
import panelbattery from '../../../assets/widget-icons/panelBattery.svg'
import { useParams } from 'react-router-dom'
import {
  useGetCustomerEnergyGenerationQuery,
  useGetCustomerEnergyStatisticsQuery,
  useGetCustomerPanelsListQuery,
  useGetCustomerShsPerformanceQuery,
} from '../../../features/slices/shs/customer/customerShsSlice'
import { useEffect } from 'react'
import Loading from '../../../components/Loading/Loading'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const DeviceInfo = ({ data }) => {
  return (
    <div className={classes.Shs__DeviceInfo}>
      <div>
        {' '}
        <h1>Device Details </h1>
      </div>
      <div>
        <div>
          <p>Device Name</p>

          <p>{data?.device_name}</p>
        </div>
        <Divider />
        <div>
          <p>Device address</p>
          <p>{data?.device_address} </p>
        </div>
        <Divider />
        <div>
          <p>G.P.S address</p>
          <p>{data?.gps_address}</p>
        </div>
        <Divider />
        <div className={classes.Shs__Gps}>
          <div>
            <p>Latitude</p>
            <p>{data?.latitude}</p>
          </div>
          <div>
            <p>Longitude</p>
            <p>{data?.longitude}</p>
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
  const client_id = getItemFromLocalStorage('current_client')
  const { id } = useParams()
  const [panels, setPanels] = useState([])
  const [performance, setPerformance] = useState('')
  const [client, setclient] = useState('---')
  const { data: energyGeneration, isLoading: energyGenerationLoading } =
    useGetCustomerEnergyGenerationQuery({ id: id, client_id: client_id })

  const { data: energyStatistics, isLoading: energyStatisticsLoading } =
    useGetCustomerEnergyStatisticsQuery({ id: id, client_id: client_id })

  const { data: panelList, isLoading: panelListLoading } =
    useGetCustomerPanelsListQuery({ id: id, client_id: client_id })

  const { data: performanceData, isLoading: performanceLoading } =
    useGetCustomerShsPerformanceQuery({ id: id, client_id: client_id })

  const [open, setOpen] = useState(false)
  const handleOnCloseDeviceModal = (e) => {
    if (e.key === '2') {
      setOpen(false)
    }
  }

  const handleOpenChange = (flag) => {
    setOpen(flag)
  }

  useEffect(() => {
    setPanels(panelList?.results)
  }, [panelList])
  useEffect(() => {
    setPerformance(performanceData)
    setclient(performanceData?.device_details.device_name)
  }, [performanceData])

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
  return (
    <PageLayout>
      <section className={classes.Shs}>
        <section className={classes.Shs__BreadCrumb}>
          {' '}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <PageBreadcrumb
              title={client}
              items={['Overview', '...', client]}
            />
            <img
              src={caretdown}
              alt=""
              srcSet=""
              style={{ margin: '-40px 0 0 1px', width: '20px' }}
            />
          </div>
          <PowerSwitch device_id={id} user={'client'} />
        </section>
        <section className={classes.Shs__EnergyPerfomance}>
          <div>
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
                  <h1>
                    {performanceLoading
                      ? '---'
                      : performance
                      ? performance?.capacity
                      : 0}
                    kVA/4.7 kW
                  </h1>
                </div>
              </div>
              <div className={classes.Shs__MonitoringData}>
                {performanceLoading ? (
                  <Loading data={'shs performance'} />
                ) : performanceData ? (
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
                            <p
                              style={{
                                color:
                                  performance?.status === 'OFF'
                                    ? ' #F04438'
                                    : 'white',
                              }}
                            >
                              {performance?.status}
                            </p>
                          </div>
                          <div>
                            <small>System Load</small>
                            <p>
                              {performance?.system_load}%{' '}
                              <small style={{ color: '#ABABAB' }}>
                                (36 kw)
                              </small>
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
                              {performance?.power_usage_today} kwh
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
                                  <span>2</span>{' '}
                                  {performance?.battery_percent || 0}%
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
                    </Col>
                  </Row>
                ) : (
                  <p style={{ color: 'white' }}>No data records</p>
                )}
              </div>
            </div>
          </div>
          <div>
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
                      borderRadius: '100px',
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
                    categories: energyGeneration
                      ? energyGeneration.map((data, key) => {
                          const hour = new Date(data?.hour)
                          return hour.toLocaleTimeString('en-US', {
                            hour12: true,
                            hour: 'numeric',
                          })
                        })
                      : [],
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
                    data: energyGeneration
                      ? energyGeneration.map((data, key) =>
                          Math.round(data?.energy),
                        )
                      : [],
                  },
                ]}
                height="90%"
              />
            </div>
          </div>
        </section>
        <section className={classes.Shs__EnergyStats}>
          <div>
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
                      'feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
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
                    data: energyStatistics
                      ? energyStatistics.map((data, key) => data?.energy)
                      : [],
                  },
                  {
                    name: ' Energy Generated',
                    data: energyGeneration
                      ? energyGeneration.map((data, key) => data?.energy)
                      : [],
                  },
                ]}
                width="100%"
              />
            </div>
          </div>
          <div>
            <div className={classes.Shs__EnergyPanel}>
              <p>Panels</p>

              {panelListLoading ? (
                <Loading data={'panel list'} />
              ) : panels ? (
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
                              <p style={{ marginTop: '25px' }}>
                                {panel?.device_name}
                              </p>
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
              ) : (
                'No data records...'
              )}
            </div>
          </div>
        </section>
      </section>
    </PageLayout>
  )
}

export default Shs
