import React, { useState, useEffect } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
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

import {
  DataStatistics,
  dateTimeConverter,
  formatLabel,
} from '../../../utils/helpers'
import TableFooter from '../../../components/TableFooter/TableFooter'
import Loading from '../../../components/Loading/Loading'

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
  const [chartData, setChartData] = useState(null)
  const [filter, setFilter] = useState('yearly')
  const [tableFilter, setTableFilter] = useState('yearly')
  const [analytics, setAnalytics] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const [table, setTable] = useState([])
  const { data: dataAnalytics, isLoading: DataAnaylyticsisLoading } =
    useGetAdminVoltageCurrentAnalyticsQuery({ filter: filter })

  const { data: dataStatistics, isLoading: statisticsisLoading } =
    useGetAdminVoltageCurrentStatisticsQuery()

  const { data: dataTable, isLoading: tableisLoading } =
    useGetAdminVoltageCurrentTableQuery({
      page: pageNum,
      search: search,
      filter: tableFilter,
    })

  useEffect(() => {
    setAnalytics(dataAnalytics)
    setTable(dataTable)
    setChartData([
      {
        name: 'Current',
        data: DataStatistics(dataStatistics, 'month_current'),
      },
      {
        name: 'Voltage',
        data: DataStatistics(dataStatistics, 'month_voltage'),
      },
    ])
  }, [dataAnalytics, dataTable, dataStatistics, pageNum])
  const adminVolatgeCurrentWidgetsData = [
    {
      id: 1,
      icon: SunWidgetIcon,
      title: 'Voltage',
      range: formatLabel(filter),
      value: analytics?.voltage || 0,
      valueCurrency: 'V',
    },
    {
      id: 2,
      icon: SunWidgetIcon,
      title: 'Current',
      range: formatLabel(filter),
      value: analytics?.current || 0,
      valueCurrency: 'V',
    },
    {
      id: 3,
      icon: EnergyWidgetIcon,
      title: 'Energy',
      range: formatLabel(filter),
      value: analytics?.kw || 0,
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
          <WidgetFilter
            selectFilterBy={(value) => setFilter(value)}
            filterBy={filter}
          />
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
          {!statisticsisLoading ? (
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
            <Loading data={'Graph'} />
          )}
        </div>
        <div className={classes.VoltageCurrent__shsTable}>
          {!tableisLoading ? (
            <SHSTableWithFilter
              columns={columns}
              data={table?.results}
              tableTitle="Voltage & Current Table"
              tagValue="kWh"
              filterOptions={generalFilterOptions}
              footer={() => (
                <TableFooter
                  pageNo={table?.page}
                  totalPages={table?.total_pages}
                  handleClick={setPageNum}
                  hasNext={table?.page === table?.total_pages}
                  hasPrev={!table?.total_pages || table?.page === 1}
                />
              )}
            />
          ) : (
            <Loading data={'Table'} />
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
