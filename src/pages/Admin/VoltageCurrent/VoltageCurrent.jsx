import React, { useState, useEffect } from 'react'
import { generalFilterOptions } from '../../../utils/data'
import {
  useGetAdminVoltageCurrentAnalyticsQuery,
  useGetAdminVoltageCurrentStatisticsQuery,
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

export const adminVoltageCurrentTableData = [
  {
    id: 1,
    key: 1,
    name: 'January, 2023',
    panelVoltage: 6.35,
    panelCurrent: 14.36,
    panelEnergy: 91.19,
  },
  {
    id: 2,
    key: 2,
    name: 'January, 2023',
    panelVoltage: 6.35,
    panelCurrent: 14.36,
    panelEnergy: 91.19,
  },
  {
    id: 3,
    key: 3,
    name: 'January, 2023',
    panelVoltage: 6.35,
    panelCurrent: 14.36,
    panelEnergy: 91.19,
  },
]

const columns = [
  {
    title: 'Date',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: ' Voltage',
    key: 'panelVoltage',
    dataIndex: 'panelVoltage',
    render: (value) => `${value.toLocaleString()} V`,
  },

  {
    title: ' Current',
    key: 'panelCurrent',
    dataIndex: 'panelCurrent',
    render: (value) => `${value.toLocaleString()} A`,
  },
  {
    title: ' Energy',
    key: 'panelEnergy',
    dataIndex: 'panelEnergy',
    render: (value) => `${value.toLocaleString()} W`,
  },
]
const Footer = () => {
  return (
    <section className={classes.VoltageCurrent__Footer}>
      <div className={classes.VoltageCurrent__NavBtn}>
        {' '}
        <button>Previous</button>
        <button>Next</button>
      </div>
      <div className={classes.VoltageCurrent__Pagination}>Page 1 of 10</div>
    </section>
  )
}

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
  const {
    data: voltageCurrentDataAnaylytics,
    isLoading: voltageCurrentDataAnaylyticsisLoading,
  } = useGetAdminVoltageCurrentAnalyticsQuery()
  const {
    data: voltageCurrentDataStatistics,
    isLoading: voltageCurrentDataStatisticsisLoading,
  } = useGetAdminVoltageCurrentStatisticsQuery()

  const DataStatistics = (data, key) => {
    const dataList = [
      data?.[0]?.[1],
      data?.[0]?.[2],
      data?.[0]?.[3],
      data?.[0]?.[4],
      data?.[0]?.[5],
      data?.[0]?.[6],
      data?.[0]?.[7],
      data?.[0]?.[8],
      data?.[0]?.[9],
      data?.[0]?.[10],
      data?.[0]?.[11],
      data?.[0]?.[12],
    ]
    return dataList.map((value) => (value?.[key] !== null ? value?.[key] : 0))
  }

  useEffect(() => {
    setVoltageCurrentDataAnalytics(voltageCurrentDataAnaylytics)
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
  }, [voltageCurrentDataAnaylytics, voltageCurrentDataStatistics])
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

  console.log('chartData:', chartData)
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
            data={adminVoltageCurrentTableData}
            tableTitle="Voltage & Current Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
            footer={Footer}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
