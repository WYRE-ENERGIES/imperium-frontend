import { Button, List, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import {
  additionalOverviewBarProps,
  additionalOverviewProps,
  getChartCategory,
} from '../../../components/Charts/data'
import Chart from 'react-apexcharts'
import {
  useGetActiveUsersQuery,
  useGetSectorsQuery,
  useGetRegionsQuery,
  useGetAdminOverviewAnalyticsQuery,
  useGetAdminOverviewCurrentVoltageQuery,
  useGetMapDataQuery,
  useGetOverviewActiveAlertQuery,
  useGetOverviewEmissionDataQuery,
  useGetOverviewEnergyDataQuery,
  useGetOverviewSectorQuery,
  useGetOverviewSolarHouseDataQuery,
} from '../../../features/slices/overview/adminOverviewSlice'
import { ReactComponent as MySVGMap } from '../../../assets/map/ng-svg.svg'
import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import AreaChart from '../../../components/Charts/AreaChart/AreaChart'
import Donut from '../../../components/Charts/Donut/Donut'
import { ReactComponent as GraphIcon } from '../../../assets/widget-icons/Line.svg'
import { ReactComponent as GraphIcon2 } from '../../../assets/widget-icons/overview-line-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import SHSTable from '../../../components/SHSTable/SHSTable'
import ShsDeviceMap from '../../../components/Map/ShsDeviceMap'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from '../../Customer/Overview/Overview.module.scss'
import { formatLabel } from '../../../utils/helpers'
import { EnvironmentFilled } from '@ant-design/icons'

const Overview = () => {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    data: [],
  })
  const [areaChartData, setAreaChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [],
    },
    {
      name: 'Energy Generation',
      data: [],
    },
  ])
  const [chartData, setChartData] = useState([
    {
      name: 'Emission Avoided',
      data: [],
    },
  ])
  const [voltageChartData, setVoltageChartData] = useState([
    {
      name: 'Current',
      data: [],
    },
    {
      name: 'Voltage',
      data: [],
    },
  ])

  const LOCATION_MAP = {
    'North East': '#A58AFB',
    'North West': '#2A461F',
    'North Central': '#84ADFF',
    'South South': '#CEE5C7',
    'South East': '#7CD4FD',
    'South West': '#F9A7E0',
  }

  const [widgets, setWidgets] = useState([])
  const [page, setPage] = useState(1)
  const [alertPage, setAlertPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('weekly')
  const [sectorId, setSectorId] = useState()
  const [sectorName, setSectorName] = useState('all')
  const [regionName, setRegionName] = useState('all')
  const [regionId, setRegionId] = useState()
  const [alertData, setAlertData] = useState([])
  const [totalRegionDevice, setTotalRegionDevice] = useState([])

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: refetchAnalytics,
  } = useGetAdminOverviewAnalyticsQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isAlertFetching,
    isError: isAlertError,
    error: alertError,
    data: aData,
    refetch: refetchAlert,
  } = useGetOverviewActiveAlertQuery({
    page: alertPage,
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  const {
    isFetching: isEmissionFetching,
    isError: isEmissionError,
    error: emissionError,
    data: emissionData,
    refetch: refetchEmission,
  } = useGetOverviewEmissionDataQuery({
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  console.log('this is the emission data', emissionData)
  const {
    isFetching: isVoltageFetching,
    isError: isVoltageError,
    error: voltageError,
    data: voltageData,
    refetch: refetchVoltage,
  } = useGetAdminOverviewCurrentVoltageQuery({
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  const {
    isFetching: isSolarFetching,
    isError: isSolarError,
    error: solarError,
    data: solarData,
    refetch: refetchSolar,
  } = useGetOverviewSolarHouseDataQuery({
    page,
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  // const {
  //   isFetching: isSectorFetching,
  //   isSuccess: isSectorSuccess,
  //   isError: isSectorError,
  //   error: sectorError,
  //   data: sectorData,
  //   refetch: refetchSector,
  // } = useGetOverviewSectorQuery({
  //   filterBy: globalFilter,
  // })

  const {
    isFetching: isEnergyFetching,
    isError: isEnergyError,
    error: energyError,
    data: energyData,
    refetch: refetchEnergy,
  } = useGetOverviewEnergyDataQuery({
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  const {
    isFetching: isSectorFetching,
    isError: isSectorError,
    error: sectorError,
    data: sectorData,
    refetch: refetchSector,
  } = useGetSectorsQuery({
    regionName,
  })

  const {
    isFetching: isRegionFetching,
    isError: isRegionError,
    error: regionError,
    data: regionData,
    refetch: refetchRegion,
  } = useGetRegionsQuery({
    sectorName,
  })

  const {
    isFetching: isActiveUserFetching,
    isError: isActiveUserError,
    error: activeUserError,
    data: activeUserData,
  } = useGetActiveUsersQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isMapFetching,
    isError: isMapError,
    error: mapError,
    data: mapData,
  } = useGetMapDataQuery({
    sectorId,
    regionId,
  })

  useEffect(() => {
    if (isSectorFetching) return

    if (sectorData && sectorData.total_devices) {
      const pieLabel = []
      const pieData = []
      sectorData.total_devices.map((deviceData) => {
        const regionOrSector = deviceData.region || deviceData.sectors
        pieLabel.push(regionOrSector)
        pieData.push(deviceData.devices)
      })
      setPieChartData({ labels: pieLabel, data: pieData })
    }
  }, [isSectorFetching, sectorData])

  useEffect(() => {
    if (regionData) {
      const sumOfTotalRegionDevice = regionData.total_devices.reduce(
        (n, { devices }) => n + devices,
        0,
      )
      setTotalRegionDevice(sumOfTotalRegionDevice)
    }
  }, [regionData])

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          title: 'Total Energy Generation',
          value: analyticsData?.total_installed_capacity
            ? parseFloat(
                analyticsData?.total_installed_capacity?.toFixed(1),
              )?.toLocaleString()
            : 0,
          valueCurrency: 'kWh',
          graph: GraphIcon2,
        },
        {
          id: 2,
          title: 'Total Energy Consumption',
          value: analyticsData?.total_energy_consumed
            ? parseFloat(
                analyticsData?.total_energy_consumed?.toFixed(1),
              )?.toLocaleString()
            : 0,
          valueCurrency: 'kWh',
          graph: GraphIcon,
        },
        {
          id: 3,
          title: 'Total Customers',
          value: analyticsData?.total_customers
            ? parseFloat(
                analyticsData?.total_customers?.toFixed(1),
              )?.toLocaleString()
            : 0,
          graph: GraphIcon2,
        },
      ].map((widget) => (
        <AdminEnergyAnalytic
          key={widget.id}
          duration={formatLabel(globalFilter)}
          valueCurrency={widget.valueCurrency}
          title={widget.title}
          value={widget.value}
          LineGraph={widget.graph}
        />
      )),
    )
  }, [analyticsData, isAnalyticsFetching, globalFilter])

  const refetchData = useCallback(() => {
    refetchAnalytics()
    refetchAlert()
    refetchEmission()
    refetchVoltage()
    refetchSolar()
    // refetchSector()
    // refetchRegion()
    refetchEnergy()
  }, [
    refetchAnalytics,
    refetchAlert,
    refetchEmission,
    refetchVoltage,
    refetchSolar,
    // refetchSector,
    // refetchRegion,
    refetchEnergy,
  ])

  useEffect(() => {
    refetchData()
  }, [refetchData, globalFilter, regionId])

  useEffect(() => {
    if (alertPage == 1) setAlertData([])
    if (isAlertFetching) return

    if (isAlertError) {
      setAlertData([])
      return
    }

    if (aData?.results?.length) {
      setAlertData((prev) => [...prev, ...aData.results])
    }
  }, [aData, isAlertFetching, isAlertError, alertPage])

  useEffect(() => {
    if (emissionData) {
      setChartData((prevChartData) => [
        { ...prevChartData[0], data: emissionData },
      ])
    }
  }, [emissionData])

  useEffect(() => {
    if (isVoltageFetching) return

    if (isVoltageError) {
      setVoltageChartData([])
      return
    }

    setVoltageChartData(voltageData)
  }, [isVoltageFetching, isVoltageError, voltageData])

  useEffect(() => {
    if (isEnergyFetching) return

    if (isEnergyError) {
      setAreaChartData([
        {
          name: 'Energy Consumed',
          data: [],
        },
        {
          name: 'Energy Generation',
          data: [],
        },
      ])
      return
    }
    setAreaChartData(energyData)
  }, [isEnergyFetching, isEnergyError, energyData])
  return (
    <AdminPageLayout>
      <div className={classes.Overview}>
        <section className={classes.Overview__headerSection}>
          <PageBreadcrumb title="Overview" items={['Overview']} />
        </section>
        <section className={classes.Overview__filters}>
          <WidgetFilter
            showDate={false}
            selectFilterBy={(value) => {
              setAlertPage(1)
              setGlobalFilter(value)
            }}
            filterBy={globalFilter}
            hasSectorFilter={true}
            setRegionId={(val) => {
              setAlertPage(1)
              setRegionId(val)
            }}
            setSectorId={(val) => {
              setAlertPage(1)
              setSectorId(val)
            }}
            setSectorName={setSectorName}
            setRegionName={setRegionName}
          />
        </section>
        <div className={classes.Overview__widgets}>
          {isAnalyticsFetching ? <WidgetLoader /> : widgets}
        </div>

        <div className={classes.Overview__map}>
          <ShsDeviceMap isLoading={isMapFetching} data={mapData} />
        </div>
        <div className={classes.Overview__SilhouetteMap}>
          <div>
            <div className={classes.Overview__ActiveUsers}>
              <h1>Active Devices {sectorName ? `in ${sectorName}` : ''}</h1>
            </div>
            <Spin spinning={isRegionFetching}>
              <div className={classes.Overview__SilhouetteInfo}>
                <div className={classes.Overview__Silhouette}>
                  {' '}
                  <MySVGMap className={classes.Overview__SilhouetteSVGMap} />
                </div>
                <div className={classes.Overview__SilhouetteList}>
                  <h1>{totalRegionDevice} Devices</h1>
                  <div className={classes.Overview__SilhouetteRegionList}>
                    <>
                      {regionData &&
                        regionData.total_devices &&
                        regionData.total_devices.map((regionInfo) => (
                          <div
                            key={regionInfo.region}
                            className={
                              classes.Overview__SilhouetteRegionListItems
                            }
                          >
                            <div
                              className={classes.Overview__SilhouetteRegionIcon}
                            >
                              <EnvironmentFilled
                                style={{
                                  color: LOCATION_MAP[regionInfo.region],
                                }}
                                twoToneColor={LOCATION_MAP[regionInfo.region]}
                              />
                            </div>
                            <div
                              className={
                                classes.Overview__SilhouetteRegionListItemsRegion
                              }
                            >
                              <p>{regionInfo.region}</p>
                              <p>{regionInfo.devices}</p>
                            </div>
                          </div>
                        ))}
                    </>
                    {/* <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>
                        {regionData &&
                          regionData.total_devices &&
                          findARegion(regionData.total_devices, 'North East')}
                      </p>
                    </div>
                  </div>
                  <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>50</p>
                    </div>
                  </div>
                  <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>50</p>
                    </div>
                  </div>
                  <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>50</p>
                    </div>
                  </div>
                  <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>50</p>
                    </div>
                  </div>
                  <div className={classes.Overview__SilhouetteRegionListItems}>
                    <div className={classes.Overview__SilhouetteRegionIcon}>
                      <EnvironmentOutlined />
                    </div>
                    <div
                      className={
                        classes.Overview__SilhouetteRegionListItemsRegion
                      }
                    >
                      <p>North East</p>
                      <p>50</p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </Spin>
          </div>
        </div>
        <div className={classes.Overview__donutChart}>
          <Donut
            labels={pieChartData.labels}
            chartData={pieChartData.data}
            title={regionName}
            loading={isSectorFetching}
          />
        </div>
        <div className={classes.Overview__areaChart}>
          <div className={classes.Overview__chartHeader}>
            <h1>Energy Generation vs Energy Consumption</h1>
            <Button className={classes.Overview__chartHeaderBtn}>
              View report
            </Button>
          </div>
          {isEnergyFetching ? (
            <Spin />
          ) : (
            <AreaChart
              chartData={areaChartData}
              chartProps={{ height: '100%', width: '100%' }}
              optionProps={additionalOverviewProps}
              height={'100%'}
              width={'100%'}
              strokeWidth={3}
              showGridY={true}
              showGrid={true}
              showYAxis={false}
              currentMonth={new Date().getMonth() + 1}
            />
          )}
        </div>
        <div className={classes.Overview__shsTable}>
          <SHSTable
            isLoading={isSolarFetching}
            setPage={setPage}
            data={solarData}
          />
        </div>
        <div className={classes.Overview__bottom}>
          <div className={classes.Overview__bottomLeft}>
            <div className={classes.Overview__bottomChart}>
              {!chartData ? (
                <Spin />
              ) : (
                <Chart
                  type="bar"
                  height="100%"
                  series={chartData}
                  width="100%"
                  options={{
                    plotOptions: {
                      bar: {
                        borderRadius: 5,
                        borderRadiusApplication: 'end',
                        borderRadiusWhenStacked: 'last',
                        columnWidth: '70%',
                      },
                    },
                    // grid: {
                    //   padding: {
                    //     top: -30,
                    //     right: 0,
                    //     bottom: 0,
                    //     left: 0,
                    //   },
                    // },
                    chart: {
                      type: 'bar',
                      fontFamily: 'baloo 2',
                      offsetY: 20,
                      toolbar: {
                        show: false,
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    title: {
                      text: 'CO2 Emission Avoided',
                      style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'baloo 2',
                      },
                    },
                    fill: {
                      colors: ['rgba(153, 199, 138, 1)'],
                    },
                    yaxis: {
                      title: {
                        text: 'CO2',
                        offsetx: 10,
                      },
                      labels: {
                        show: true,
                        align: 'right',

                        formatter: (val) => {
                          const value = val
                          return `${value} kg`
                        },
                      },
                    },
                    xaxis: {
                      title: {
                        text: 'Month',
                        offsetY: 120,
                      },
                      axisTicks: {
                        show: false,
                      },
                      categories: getChartCategory(
                        [
                          'Jan',
                          'Feb',
                          'Mar',
                          'Apr',
                          'May',
                          'Jun',
                          'Jul',
                          'Aug',
                          'Sept',
                          'Oct',
                          'Nov',
                          'Dec',
                        ],
                        new Date().getMonth() + 1,
                      ),
                      labels: {
                        show: true,
                        rotate: -45,

                        style: {
                          fontSize: '12px',
                          fontFamily: 'baloo 2',
                          fontWeight: 400,
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
            <div className={classes.Overview__bottomAreaChart}>
              {isVoltageFetching ? (
                <Spin />
              ) : (
                <AreaChart
                  chartData={voltageChartData}
                  chartProps={{ height: '100%', width: '100%' }}
                  optionProps={{
                    ...additionalOverviewProps,
                    title: { text: 'Voltage & Current Statistic ' },
                    colors: ['#385E2B', '#7F56D9'],
                  }}
                  showGridY={true}
                  showGrid={true}
                  showYAxis={false}
                  strokeWidth={3}
                  currentMonth={new Date().getMonth() + 1}
                />
              )}
            </div>
          </div>
          <div className={classes.Overview__alerts}>
            <h1>Active Alerts</h1>
            <div className={classes.Overview__alertList}>
              {isAlertFetching ? (
                <Spin />
              ) : (
                <List
                  dataSource={alertData}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        title={item.active_alert}
                        description={item.shs_name}
                      />
                      <p
                        style={{
                          color:
                            item.status === 'UNRESOLVED'
                              ? '#B42318'
                              : '#5C9D48',
                        }}
                      >
                        {item.status}
                      </p>
                    </List.Item>
                  )}
                />
              )}
            </div>
            <Button
              onClick={() => setAlertPage(aData?.page + 1)}
              disabled={aData?.page === aData?.total_pages}
              className={classes.Overview__alertBtn}
            >
              Show more
            </Button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default Overview
