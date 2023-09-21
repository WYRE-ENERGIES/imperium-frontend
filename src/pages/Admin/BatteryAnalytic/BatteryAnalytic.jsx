import React, { useEffect, useState } from 'react'
import {
  useGetBatteryPageAnalyticsQuery,
  useGetBatteryStatisticsQuery,
  useGetBatteryTableDataQuery,
} from '../../../features/slices/batterySlice'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { ReactComponent as BadBatteryWidgetIcon } from '../../../assets/widget-icons/bad-battery-icon.svg'
import { BsDot } from 'react-icons/bs'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import { ReactComponent as GoodBatteryWidgetIcon } from '../../../assets/widget-icons/good-battery-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { RiBattery2ChargeLine } from 'react-icons/ri'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Tag } from 'antd'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from '../../Customer/Battery/Battery.module.scss'
import { formatLabel } from '../../../utils/helpers'
import useDebounce from '../../../hooks/useDebounce'

const columns = [
  {
    title: 'SHS Name',
    dataIndex: 'shs_name',
    key: 'shs_name',
  },
  {
    title: 'Battery Voltage',
    key: 'battery_voltage',
    dataIndex: 'battery_voltage',
    render: (value) => `${parseFloat(value.toLocaleString()).toFixed(1)} V`,
  },

  {
    title: 'Battery Current',
    key: 'battery_current',
    dataIndex: 'battery_current',
    render: (value) => `${parseFloat(value.toLocaleString()).toFixed(1)} A`,
  },
  {
    title: 'Battery Health',
    key: 'battery_health',
    dataIndex: 'battery_health',
    render: (value) => {
      const color = value.toLowerCase() === 'good' ? '#027A48' : '#B42318'
      return (
        <Tag
          color={value.toLowerCase() === 'good' ? 'success' : 'error'}
          key={value}
          style={{
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
            color: color,
          }}
        >
          {value}
        </Tag>
      )
    },
  },
  {
    title: 'Charging Source',
    key: 'charging_source',
    dataIndex: 'charging_source',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    width: '12%',
    render: (value) => {
      return (
        <div className={classes.Battery__status}>
          <RiBattery2ChargeLine
            color={value.charging ? '#84BB72' : '#B42318'}
            size={20}
          />
          <section className={classes.Battery__statusSection}>
            <h3 className={classes.Battery__statusText}>Charging Status</h3>
            <div className={classes.Battery__statusResultSection}>
              <h4 style={{ color: value.charging ? '#84BB72' : '#B42318' }}>
                <BsDot
                  color={value.charging ? '#84BB72' : '#B42318'}
                  size={20}
                  style={{ marginLeft: 0 }}
                />
                {value.battery_status}%
              </h4>
              <h5 className={classes.Battery__statusResult}>
                {value.charging ? 'Charging' : 'Not Charging'}
              </h5>
            </div>
          </section>
        </div>
      )
    },
  },
]

const BatteryAnalytic = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Bad Battery Status',
      data: [],
    },
    {
      name: 'Good battery status',
      data: [],
    },
  ])

  const [widgets, setWidgets] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const { isError, error, data, isFetching, refetch } =
    useGetBatteryTableDataQuery({
      page,
      search: debounceValue,
      // filterBy: globalFilter,
    })

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: analyticsRefetch,
  } = useGetBatteryPageAnalyticsQuery({ filterBy: globalFilter })

  const {
    isFetching: isStatisticsFetching,
    isSuccess: isStatisticsSuccess,
    isError: isStatisticsError,
    error: statisticsError,
    data: statisticsData,
    refetch: statisticsRefetch,
  } = useGetBatteryStatisticsQuery({ filterBy: globalFilter })

  useEffect(() => {
    if (isStatisticsFetching) return
    if (isStatisticsError) {
      setChartData(
        {
          name: 'Bad Battery Status',
          data: [],
        },
        {
          name: 'Good battery status',
          data: [],
        },
      )

      return
    }

    setChartData(statisticsData)
  }, [isStatisticsFetching, isStatisticsError, statisticsData])

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          icon: EnergyWidgetIcon,
          title: 'Total SHS Battery',
          value: analyticsData?.total_shs_battery
            ? parseFloat(
                analyticsData?.total_shs_battery?.toFixed(1),
              )?.toLocaleString()
            : 0,
        },
        {
          id: 2,
          icon: GoodBatteryWidgetIcon,
          title: 'Good SHS Battery',
          value: analyticsData?.good_shs_battery
            ? parseFloat(
                analyticsData?.good_shs_battery?.toFixed(1),
              )?.toLocaleString()
            : 0,
        },
        {
          id: 3,
          icon: BadBatteryWidgetIcon,
          title: 'Bad SHS Battery',
          value: analyticsData?.bad_shs_battery
            ? parseFloat(
                analyticsData?.bad_shs_battery?.toFixed(1),
              )?.toLocaleString()
            : 0,
        },
      ].map((widget) => (
        <Widget
          key={widget.id}
          Icon={widget.icon}
          range={formatLabel(globalFilter)}
          title={widget.title}
          value={widget.value}
          valueCurrency={widget.valueCurrency}
          valuePercentage={widget.valuePercentage}
        />
      )),
    )
  }, [isAnalyticsFetching, analyticsData, globalFilter])

  useEffect(() => {
    refetch()
    analyticsRefetch()
    statisticsRefetch()
  }, [globalFilter, analyticsRefetch, refetch, statisticsRefetch])

  return (
    <AdminPageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Battery}>
        <section className={classes.Battery__headerSection}>
          <PageBreadcrumb title="Battery" items={['Battery']} />
        </section>
        <section className={classes.Battery__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.Battery__widgets}>
          {widgets.length ? widgets : <WidgetLoader />}
        </div>
        <div className={classes.Battery__chart}>
          {!isStatisticsFetching ? (
            <StackedBarChart
              title="Battery Statistical Representation"
              chartData={chartData}
              colors={['#F04438', '#66AB4F']}
              borderRadius={2}
              columnWidth={8}
              legendPosition="bottom"
              legendHorizontalAlign="center"
              showGrid={true}
              showGridY={false}
              showYAxisBorder={true}
            />
          ) : (
            <WidgetLoader />
          )}
        </div>
        <div className={classes.Battery__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data?.results}
            tableTitle="Battery Table"
            tagValue="kWh"
            isAdmin={true}
            filterOptions={[]}
            handleSearch={handleSearch}
            isLoading={isFetching}
            footer={() => (
              <TableFooter
                pageNo={data?.page}
                totalPages={data?.total_pages}
                handleClick={setPage}
                hasNext={data?.page === data?.total_pages}
                hasPrev={!data?.total_pages || data?.page === 1}
              />
            )}
            url={'/batteryAnalytics'}
            tableName={'battery_table'}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default BatteryAnalytic
