import { Button, List, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  additionalOverviewBarProps,
  additionalOverviewProps,
} from '../../../components/Charts/data'
import {
  useGetAdminOverviewAnalyticsQuery,
  useGetAdminOverviewCurrentVoltageQuery,
  useGetOverviewActiveAlertQuery,
  useGetOverviewEmissionDataQuery,
  useGetOverviewEnergyDataQuery,
  useGetOverviewSectorQuery,
  useGetOverviewSolarHouseDataQuery,
} from '../../../features/slices/overview/adminOverviewSlice'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import AreaChart from '../../../components/Charts/AreaChart/AreaChart'
import Donut from '../../../components/Charts/Donut/Donut'
import { ReactComponent as GraphIcon } from '../../../assets/widget-icons/Line.svg'
import { ReactComponent as GraphIcon2 } from '../../../assets/widget-icons/overview-line-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import SHSTable from '../../../components/SHSTable/SHSTable'
import ShsDeviceMap from '../../../components/Map/ShsDeviceMap'
import SimpleBarChart from '../../../components/Charts/SimpleBarChart/SimpleBarChart'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from '../../Customer/Overview/Overview.module.scss'

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

  const [widgets, setWidgets] = useState([])
  const [page, setPage] = useState(1)
  const [alertPage, setAlertPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')
  const [sectorId, setSectorId] = useState()
  const [regionId, setRegionId] = useState()
  const [alertData, setAlertData] = useState([])

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
  } = useGetAdminOverviewAnalyticsQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isAlertFetching,
    isError: isAlertError,
    error: alertError,
    data: aData,
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
  } = useGetOverviewEmissionDataQuery({
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  const {
    isFetching: isVoltageFetching,
    isError: isVoltageError,
    error: voltageError,
    data: voltageData,
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
  } = useGetOverviewSolarHouseDataQuery({
    page,
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  const {
    isFetching: isSectorFetching,
    isSuccess: isSectorSuccess,
    isError: isSectorError,
    error: sectorError,
    data: sectorData,
  } = useGetOverviewSectorQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isEnergyFetching,
    isError: isEnergyError,
    error: energyError,
    data: energyData,
  } = useGetOverviewEnergyDataQuery({
    filterBy: globalFilter,
    sectorId,
    regionId,
  })

  useEffect(() => {
    if (isSectorFetching) return

    if (isSectorSuccess) {
      setPieChartData(sectorData)
    }
  }, [isSectorFetching])

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          title: 'Total Energy Generation',
          duration: 'For the last 12 months',
          value:
            parseFloat(analyticsData?.total_installed_capacity?.toFixed(1)) ||
            0,
          valueCurrency: 'kWh',
          graph: GraphIcon2,
        },
        {
          id: 2,
          title: 'Total Energy Consumption',
          duration: 'For the last 12 months',
          value:
            parseFloat(analyticsData?.total_energy_consumed?.toFixed(1)) || 0,
          valueCurrency: 'kWh',
          graph: GraphIcon,
        },
        {
          id: 3,
          title: 'Total Customers',
          duration: 'For the last 12 months',
          value: parseFloat(analyticsData?.total_customers?.toFixed(1)) || 0,
          graph: GraphIcon2,
        },
      ].map((widget) => (
        <AdminEnergyAnalytic
          key={widget.id}
          duration={widget.duration}
          valueCurrency={widget.valueCurrency}
          title={widget.title}
          value={widget.value}
          LineGraph={widget.graph}
        />
      )),
    )
  }, [isAnalyticsFetching])

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
  }, [isAlertFetching, isAlertError])

  useEffect(() => {
    if (isEmissionFetching) return
    if (isEmissionError) {
      setChartData({
        name: 'Emission avoided',
        data: [],
      })

      return
    }

    setChartData([{ ...chartData[0], data: emissionData || [] }])
  }, [isEmissionFetching, isEmissionError])

  useEffect(() => {
    if (isVoltageFetching) return

    if (isVoltageError) {
      setVoltageChartData([])
      return
    }

    setVoltageChartData(voltageData)
  }, [isVoltageFetching, isVoltageError])

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
  }, [isEnergyFetching, isEnergyError])

  return (
    <AdminPageLayout>
      <div className={classes.Overview}>
        <section className={classes.Overview__headerSection}>
          <PageBreadcrumb title="Overview" items={['Overview']} />
        </section>
        <section className={classes.Overview__filters}>
          <WidgetFilter
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
          />
        </section>
        <div className={classes.Overview__widgets}>
          {isAnalyticsFetching ? <WidgetLoader /> : widgets}
        </div>
        <div className={classes.Overview__map}>{/* <ShsDeviceMap /> */}</div>
        <div className={classes.Overview__donutChart}>
          <Donut
            labels={pieChartData.labels}
            chartData={pieChartData.data}
            title="Imperium Users by Sector"
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
          <AreaChart
            chartData={areaChartData}
            chartProps={{ height: '100%', width: '100%' }}
            optionProps={additionalOverviewProps}
          />
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
              <SimpleBarChart
                title="CO2 Emission Avoided"
                chartData={chartData}
                colors={['#66AB4F']}
                borderRadius={5}
                columnWidth={50}
                optionProps={additionalOverviewBarProps}
              />
            </div>
            <div className={classes.Overview__bottomAreaChart}>
              <AreaChart
                chartData={voltageChartData}
                chartProps={{ height: '100%', width: '100%' }}
                optionProps={{
                  ...additionalOverviewProps,
                  title: { text: 'Voltage & Current Statistic ' },
                  colors: ['#385E2B', '#7F56D9'],
                }}
              />
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
                      <p style={{ color: item.status ? '#5C9D48' : '#B42318' }}>
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
