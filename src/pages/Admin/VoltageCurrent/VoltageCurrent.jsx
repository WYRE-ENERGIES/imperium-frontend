import React, { useState, useEffect } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Space, Select, Tag } from 'antd'

import {
  useGetAdminVoltageCurrentAnalyticsQuery,
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
  formatLabel,
} from '../../../utils/helpers'
import Loading from '../../../components/Loading/Loading'
import DataTable from '../../../components/Table/DataTable'
import { MdFilterList } from 'react-icons/md'

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
  const [tableFilter, setTableFilter] = useState('monthly')
  const [analytics, setAnalytics] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const [table, setTable] = useState([])
  const {
    data: dataAnalytics,
    isLoading: DataAnaylyticsisLoading,
    isFetching: dataAnalyticsisFetching,
  } = useGetAdminVoltageCurrentAnalyticsQuery({ filter: filter })

  const { data: dataStatistics, isLoading: statisticsisLoading } =
    useGetAdminVoltageCurrentStatisticsQuery()
  console.log('dataStatistics : ', dataStatistics)
  const {
    data: dataTable,
    isLoading: tableisLoading,
    isFetching: tableisFetching,
  } = useGetAdminVoltageCurrentTableQuery({
    page: pageNum,
    search: search,
    filter: tableFilter,
  })

  const TableSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleTableFilter = (value) => {
    setTableFilter(value)
  }
  useEffect(() => {
    console.log('chartData : ', chartData)
    console.log('dataStatistics : ', dataStatistics)
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

  const widgets = [
    {
      id: 1,
      icon: SunWidgetIcon,
      title: 'Voltage',
      range: formatLabel(filter),
      value: analytics?.voltage ? analytics?.voltage?.toLocaleString() : 0,
      valueCurrency: 'V',
    },
    {
      id: 2,
      icon: SunWidgetIcon,
      title: 'Current',
      range: formatLabel(filter),
      value: analytics?.current ? analytics?.current?.toLocaleString() : 0,
      valueCurrency: 'V',
    },
    {
      id: 3,
      icon: EnergyWidgetIcon,
      title: 'Energy',
      range: formatLabel(filter),
      value: analytics?.kw ? analytics?.kw?.toLocaleString() : 0,
      valueCurrency: 'KWh',
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
          {/* )} */}
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
          {statisticsisLoading ? (
            <Loading data={'Graph'} />
          ) : dataStatistics ? (
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
          ) : (
            'No data records found'
          )}
        </div>
        <div className={classes.VoltageCurrent__shsTable}>
          {tableisLoading ? (
            <Loading data={'Table'} />
          ) : table ? (
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
            />
          ) : (
            'No records found'
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
