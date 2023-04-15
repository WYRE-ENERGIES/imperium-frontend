import { CloseOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PowerSwitch from '../../../components/PowerSwitch/PowerSwitch'
import caretdown from '../../../assets/widget-icons/caretdown.svg'
import classes from './Shs.module.scss'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { useParams } from 'react-router-dom'
import {
  useGetEnergyGenerationQuery,
  useGetEnergyStatisticsQuery,
  useGetPanelsListQuery,
  useGetShsPerformanceQuery,
} from '../../../features/slices/shs/admin/adminShsSlice'
import { useEffect } from 'react'
import Loading from '../../../components/Loading/Loading'
import DeviceInfo from '../../../components/Shs/DeviceInfo'
import Performance from '../../../components/Shs/Performance'
import Panel from '../../../components/Shs/Panel'
import AreaChart from '../../../components/Charts/AreaChart/AreaChart'

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
  const [performance, setPerformance] = useState('')
  const [client, setclient] = useState('---')
  const { data: energyGeneration, isLoading: energyGenerationLoading } =
    useGetEnergyGenerationQuery({ id: id })

  const { data: energyStatistics, isLoading: energyStatisticsLoading } =
    useGetEnergyStatisticsQuery({ id: id })

  const { data: panelList, isLoading: panelListLoading } =
    useGetPanelsListQuery({ id: id })

  const { data: performanceData, isLoading: performanceLoading } =
    useGetShsPerformanceQuery({ id: id })

  useEffect(() => {
    setPanels(panelList?.results)
  }, [panelList])
  useEffect(() => {
    setPerformance(performanceData)
    setclient(performanceData?.device_details.device_name || 'Device not found')
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
    <AdminPageLayout>
      <section className={classes.Shs}>
        <section className={classes.Shs__BreadCrumb}>
          {' '}
          <div
            style={{ display: 'flex' }}
            className={classes.Shs__PageBreadcrumb}
          >
            <PageBreadcrumb
              title={client}
              items={['Overview', '...', client]}
            />
            <img src={caretdown} alt="caret" srcSet="" />
          </div>
          <PowerSwitch device_id={id} user={'admin'} />
        </section>
        <div className={classes.Shs__GridView}>
          <section className={classes.Shs__EnergyPerfomance}>
            <div>
              {' '}
              <Performance
                performanceData={performanceData}
                performanceLoading={performanceLoading}
                deviceDetails={deviceDetails}
                performance={performance}
              />
            </div>
            <div>
              <div className={classes.Shs__EnergyChart}>
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
          </section>
          <section className={classes.Shs__EnergyStats}>
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
            <div>
              <div className={classes.Shs__EnergyPanel}>
                <p>Panels</p>

                {panelListLoading ? (
                  <Loading data={'panel list'} />
                ) : panels ? (
                  <Panel panels={panels} performance={performance} />
                ) : (
                  'No data records...'
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </AdminPageLayout>
  )
}

export default Shs
