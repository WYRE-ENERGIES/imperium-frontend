import React, { useState, useEffect } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Space, Select, Tag, Button } from 'antd'

import {
  useGetAdminVoltageCurrentAnalyticsQuery,
  useGetAdminVoltageCurrentReportDownloadQuery,
  useGetAdminVoltageCurrentStatisticsQuery,
  useGetAdminVoltageCurrentTableQuery,
} from '../../../features/slices/VoltageCurrent/VoltageCurrent'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import Chart from 'react-apexcharts'
import { ReactComponent as SunWidgetIcon } from '../../../assets/widget-icons/sun.svg'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy.svg'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './VoltageCurrent.module.scss'

import {
  DataStatistics,
  dateTimeConverter,
  downloadFile,
  formatLabel,
} from '../../../utils/helpers'
import Loading from '../../../components/Loading/Loading'
import DataTable from '../../../components/Table/DataTable'
import AreaChart from '../../../components/Charts/AreaChart/AreaChart'
import { useGetOverviewEnergyDataQuery } from '../../../features/slices/overview/adminOverviewSlice'
import { additionalOverviewProps } from '../../../components/Charts/data'
import axios from 'axios'

const columns = [
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (value) => {
      return dateTimeConverter(value)
    },
  },
  {
    title: ' Voltage (V)',
    key: 'total_voltage',
    dataIndex: 'total_voltage',
    render: (value) => parseFloat(value?.toFixed(2))?.toLocaleString(),
  },

  {
    title: ' Current (A)',
    key: 'total_current',
    dataIndex: 'total_current',
    render: (value) => parseFloat(value?.toFixed(2))?.toLocaleString(),
  },
  {
    title: ' Power Demand (kW)',
    key: 'total_kw',
    dataIndex: 'total_kw',
    render: (value) => parseFloat(value?.toFixed(2))?.toLocaleString(),
  },
]

const VoltageCurrent = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Current',
      data: [],
    },
    {
      name: 'Voltage',
      data: [],
    },
  ])
  const [filter, setFilter] = useState('yearly')
  const [tableFilter, setTableFilter] = useState('yearly')
  const [analytics, setAnalytics] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const [table, setTable] = useState([])
  const [downloadData, setDownloadData] = useState(null)
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

  useEffect(() => {
    if (!downloadData) {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/imperium-admin/overview/download_energy_csv/`,
        )
        .then((res) => {
          setDownloadData(res.data)
        })
    }
  }, [])

  const handleDownloadReport = () => {
    downloadFile(downloadData, 'report.csv')
  }

  const {
    isFetching: isEnergyFetching,
    isError: isEnergyError,
    error: energyError,
    data: energyData,
    refetch: refetchEnergy,
  } = useGetOverviewEnergyDataQuery({
    filterBy: filter,
  })

  const {
    data: dataAnalytics,
    isLoading: DataAnaylyticsisLoading,
    isFetching: dataAnalyticsisFetching,
  } = useGetAdminVoltageCurrentAnalyticsQuery({ filter: filter })

  const { data: dataStatistics, isLoading: statisticsisLoading } =
    useGetAdminVoltageCurrentStatisticsQuery()

  const { data: downloadCsv, isLoading: downloadCsvLoadingLoading } =
    useGetAdminVoltageCurrentReportDownloadQuery()

  const {
    data: dataTable,
    isLoading: tableisLoading,
    isFetching: tableisFetching,
  } = useGetAdminVoltageCurrentTableQuery({
    page: pageNum,
    search: search,
    filter: filter,
  })

  useEffect(() => {
    setAnalytics(dataAnalytics)
    setTable(dataTable)

    setChartData([
      {
        name: 'Current',
        data: DataStatistics(dataStatistics, 'month_current') || [],
      },
      {
        name: 'Voltage',
        data: DataStatistics(dataStatistics, 'month_voltage') || [],
      },
    ])
  }, [dataAnalytics, dataTable, dataStatistics, pageNum, filter])

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

  useEffect(() => {}, [downloadCsv])

  const widgets = [
    {
      id: 1,
      icon: SunWidgetIcon,
      title: 'Voltage',
      range: formatLabel(filter),
      value: analytics?.voltage
        ? parseFloat(analytics?.voltage?.toFixed(1))?.toLocaleString()
        : 0,
      valueCurrency: 'V',
    },
    {
      id: 2,
      icon: SunWidgetIcon,
      title: 'Current',
      range: formatLabel(filter),
      value: analytics?.current
        ? parseFloat(analytics?.current?.toFixed(1))?.toLocaleString()
        : 0,
      valueCurrency: 'A',
    },
    {
      id: 3,
      icon: EnergyWidgetIcon,
      title: 'Power Demand',
      range: formatLabel(filter),
      value: analytics?.energy
        ? parseFloat(analytics?.energy?.toFixed(1))?.toLocaleString()
        : 0,
      valueCurrency: 'kW',
    },
  ].map((widget) => (
    <Widget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
      valueCurrency={widget.valueCurrency}
      valuePercentage={widget.valuePercentage}
      isLoading={DataAnaylyticsisLoading}
      isFetching={dataAnalyticsisFetching}
    />
  ))
  const TableTitle = () => (
    <div className={classes.VoltageCurrent__TableHeader}>
      <Tag
        style={{
          backgroundColor: '#f0f7ed',
          borderRadius: '16px',
          color: '#497A38',
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px',
          lineHeight: '20px',
          margin: '4px 10px',
        }}
      >
        KWH
      </Tag>
    </div>
  )

  return (
    <AdminPageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.VoltageCurrent}
      >
        <section className={classes.VoltageCurrent__headerSection}>
          <PageBreadcrumb
            title="Voltage & Current Analytics"
            items={['Voltage & Current Analytics']}
          />
        </section>
        <section className={classes.VoltageCurrent__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setFilter(value)}
            filterBy={filter}
          />
        </section>

        <div className={classes.VoltageCurrent__widgets}>{widgets}</div>
        <div
          style={{
            height: '500px',
            border: '1px solid #DCECD5',
            borderRadius: '8px',
            paddingBottom: '45px',
            paddingRight: '10px',
            paddingLeft: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <h1 style={{ fontWeight: 'heavy', fontSize: '22px' }}>
              Energy Generation vs Energy Consumption
            </h1>
            {downloadData && (
              <Button
                onClick={handleDownloadReport}
                className={classes.Overview__chartHeaderBtn}
              >
                <b>Download report</b>
              </Button>
            )}
          </div>
          {statisticsisLoading ? (
            <Loading data={'Graph'} />
          ) : dataStatistics ? (
            // <Chart
            //   height="100%"
            //   options={{
            //     title: {
            //       text: 'Energy Consumed VS Energy Generated',
            //       align: 'left',
            //       margin: 50,
            //       offsetX: 10,
            //       offsetY: 20,
            //       floating: false,
            //       style: {
            //         fontSize: '18px',
            //         fontWeight: '500',
            //         fontFamily: undefined,
            //         color: '#263238',
            //       },
            //     },
            //     legend: {
            //       fontSize: '14px',
            //       position: 'bottom',
            //       horizontalAlign: 'center',
            //     },
            //     fill: {
            //       opacity: 0.1,
            //       gradient: {
            //         shadeIntensity: 1,
            //         inverseColors: false,
            //         opacityFrom: 0.45,
            //         opacityTo: 0.05,
            //         stops: [20, 100, 100, 100],
            //       },
            //     },

            //     chart: {
            //       id: 'VoltageCurrent-bar',
            //       fontFamily: 'baloo 2',
            //       stacked: true,
            //       toolbar: {
            //         show: false,
            //       },
            //       type: 'area',
            //     },
            //     stroke: {
            //       curve: 'smooth',
            //     },
            //     colors: ['#C9E00C', '#5C9D48'],
            //     xaxis: {
            //       categories: [
            //         'Jan',
            //         'Feb',
            //         'Mar',
            //         'Apr',
            //         'May',
            //         'Jun',
            //         'Jul',
            //         'Aug',
            //         'Sep',
            //         'Oct',
            //         'Nov',
            //         'Dec',
            //       ],
            //     },
            //     dataLabels: {
            //       enabled: false,
            //     },
            //   }}
            //   type="area"
            //   series={chartData}
            //   width="100%"
            // />
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
              monthData={areaChartData[2]}
            />
          ) : (
            'No data records found'
          )}
        </div>
        <div className={classes.VoltageCurrent__shsTable}>
          {tableisLoading ? (
            <Loading data={'Table'} />
          ) : (
            <DataTable
              title={{
                title: ' Voltage & Current Table',
                unit: <TableTitle />,
              }}
              columns={columns}
              dataSource={table}
              setPageNum={setPageNum}
              isLoading={tableisFetching}
              searchTable={setSearch}
              url={'imperium-admin/active-alert/export'}
              tableName={'voltage_and_current_table'}
            />
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
