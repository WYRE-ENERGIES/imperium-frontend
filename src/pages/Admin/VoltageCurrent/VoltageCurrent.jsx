import React, { useState, useEffect } from 'react'
import { generalFilterOptions } from '../../../utils/data'
import {
  useGetAdminVoltageCurrentAnalyticsQuery,
  useGetAdminVoltageCurrentStatisticsQuery,
  useGetAdminVoltageCurrentTableQuery,
} from '../../../features/slices/VoltageCurrent/VoltageCurrent'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import Chart from 'react-apexcharts'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { ReactComponent as SunWidgetIcon } from '../../../assets/widget-icons/sun.svg'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy.svg'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './VoltageCurrent.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { DataStatistics, dateTimeConverter } from '../../../utils/helpers'
import TableFooter from '../../../components/TableFooter/TableFooter'

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
    title: ' Voltage',
    key: 'total_voltage',
    dataIndex: 'total_voltage',
    render: (value) => `${value} V`,
  },

  {
    title: ' Current',
    key: 'total_current',
    dataIndex: 'total_current',
    render: (value) => `${value} A`,
  },
  {
    title: ' Energy',
    key: 'total_kw',
    dataIndex: 'total_kw',
    render: (value) => `${value} W`,
  },
]

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#808080',
    }}
  />
)

const VoltageCurrent = () => {
  const [chartData, setChartData] = useState([])
  const [voltageCurrentDataAnalytics, setVoltageCurrentDataAnalytics] =
    useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const [voltageCurrentDataTable, setvoltageCurrentDataTable] = useState([])
  const {
    data: voltageCurrentDataAnaylytics,
    isLoading: voltageCurrentDataAnaylyticsisLoading,
  } = useGetAdminVoltageCurrentAnalyticsQuery({})
  const {
    data: voltageCurrentDataStatistics,
    isLoading: voltageCurrentDataStatisticsisLoading,
  } = useGetAdminVoltageCurrentStatisticsQuery()
  const {
    data: voltageCurrentData,
    isLoading: voltageCurrentDataTableisLoading,
  } = useGetAdminVoltageCurrentTableQuery({ page: pageNum, search: search })

  useEffect(() => {
    setVoltageCurrentDataAnalytics(voltageCurrentDataAnaylytics)
    setvoltageCurrentDataTable(voltageCurrentData)

    setChartData([
      {
        name: 'Current',
        data: DataStatistics(voltageCurrentDataStatistics, 'month_current'),
      },
      {
        name: 'Voltage',
        data: DataStatistics(voltageCurrentDataStatistics, 'month_voltage'),
      },
    ])
  }, [
    voltageCurrentDataAnaylytics,
    voltageCurrentData,
    voltageCurrentDataStatistics,
    pageNum,
  ])
  const adminVolatgeCurrentWidgetsData = [
    {
      id: 1,
      icon: SunWidgetIcon,
      title: 'Voltage',
      range: 'For the year',
      value: voltageCurrentDataAnalytics?.voltage,
      valueCurrency: 'V',
    },
    {
      id: 2,
      icon: SunWidgetIcon,
      title: 'Current',
      range: 'For the year',
      value: voltageCurrentDataAnalytics?.current,
      valueCurrency: 'V',
    },
    {
      id: 3,
      icon: EnergyWidgetIcon,
      title: 'Energy',
      range: 'For the year',
      value: voltageCurrentDataAnalytics?.kw,
      valueCurrency: 'KWh',
    },
  ]

  const widgets = adminVolatgeCurrentWidgetsData.map((widget) => (
    <Widget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
      valueCurrency={widget.valueCurrency}
      valuePercentage={widget.valuePercentage}
    />
  ))

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
          <WidgetFilter />
        </section>
        <section>
          <Input
            placeholder="Search SHS"
            size="large"
            prefix={prefix}
            className={classes.VoltageCurrent__search}
          />
        </section>
        <div className={classes.VoltageCurrent__widgets}>{widgets}</div>
        <div
          style={{
            height: '500px',
            border: '1px solid #DCECD5',
            borderRadius: '8px',
            paddingBottom: '20px',
          }}
        >
          {voltageCurrentDataStatisticsisLoading ? (
            'Loading...'
          ) : (
            <Chart
              height="100%"
              options={{
                title: {
                  text: 'Energy Consumed VS Energy Generated',
                  align: 'left',
                  margin: 50,
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
                  position: 'bottom',
                  horizontalAlign: 'center',
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
                  id: 'VoltageCurrent-bar',
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
                    'Feb',
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
                },
                dataLabels: {
                  enabled: false,
                },
              }}
              type="area"
              series={chartData}
              width="100%"
            />
          )}
        </div>
        <div className={classes.VoltageCurrent__shsTable}>
          <SHSTableWithFilter
            columns={columns}
            data={voltageCurrentData?.results}
            tableTitle="Voltage & Current Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
            footer={() => (
              <TableFooter
                pageNo={voltageCurrentData?.page}
                totalPages={voltageCurrentData?.total_pages}
                handleClick={setPageNum}
                hasNext={
                  voltageCurrentData?.page === voltageCurrentData?.total_pages
                }
                hasPrev={
                  !voltageCurrentData?.total_pages ||
                  voltageCurrentData?.page === 1
                }
              />
            )}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
