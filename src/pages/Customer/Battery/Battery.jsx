import React, { useEffect, useState } from 'react'
import {
  batteryTableData,
  batteryWidgetsData,
  generalFilterOptions,
} from '../../../utils/data'
import {
  useGetBatteryPageAnalyticsQuery,
  useGetBatteryTableDataQuery,
} from '../../../features/slices/battery/clientBattery'

import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../../../assets/widget-icons/home-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Tag } from 'antd'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Battery.module.scss'
import useDebounce from '../../../hooks/useDebounce'
import { dateTimeConverter } from '../../../utils/helpers'

const columns = [
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (value) => dateTimeConverter(value),
  },
  {
    title: 'Battery Health',
    key: 'battery_health',
    dataIndex: 'battery_health',
    render: (value) => {
      const color = value ? '#027A48' : '#B42318'
      return (
        <Tag
          color={value ? 'success' : 'error'}
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
          {value ? 'Good' : 'Bad'}
        </Tag>
      )
    },
  },
  {
    title: 'Battery Voltage',
    key: 'battery_voltage',
    dataIndex: 'battery_voltage',
    render: (value) => `${value.toLocaleString()} V`,
  },

  {
    title: 'Battery Current',
    key: 'battery_current',
    dataIndex: 'battery_current',
    render: (value) => `${value.toLocaleString()} A`,
  },
  {
    title: 'Charging Source',
    key: 'source',
    dataIndex: 'source',
    render: (value) => value.toLocaleString(),
  },
]

const Battery = () => {
  const [deviceId, setDeviceId] = useState()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [widgets, setWidgets] = useState([])
  const [filterBy, setFilterBy] = useState('')

  console.log('Battery -> filterBy', filterBy)
  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const { isError, error, data, isFetching } = useGetBatteryTableDataQuery(
    {
      page,
      search: debounceValue,
      deviceId,
      filterBy,
    },
    { skip: !deviceId },
  )

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
  } = useGetBatteryPageAnalyticsQuery({ deviceId }, { skip: !deviceId })

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          icon: EnergyWidgetIcon,
          title: 'Battery Status',
          range: 'For the year',
          value: 'Good',
          valuePercentage: analyticsData?.kw || 98,
        },
        {
          id: 2,
          icon: SEnergyWidgetIcon,
          title: 'Battery Voltage',
          range: 'For the year',
          value: parseFloat(analyticsData?.voltage?.toFixed(1)) || 0,
          valueCurrency: 'V',
        },
        {
          id: 3,
          icon: HomeWidgetIcon,
          title: 'Battery Current',
          range: 'For the year',
          value: parseFloat(analyticsData?.current?.toFixed(1)) || 0,
          valueCurrency: 'A',
        },
      ].map((widget) => (
        <Widget
          key={widget.id}
          Icon={widget.icon}
          title={widget.title}
          value={widget.value}
          valueCurrency={widget.valueCurrency}
          valuePercentage={widget.valuePercentage}
        />
      )),
    )
  }, [isAnalyticsFetching])

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Battery}>
        <section className={classes.Battery__headerSection}>
          <PageBreadcrumb title="Battery" items={['Battery']} />
          <ShsCapacityDropdown setDeviceId={setDeviceId} />
        </section>
        <section className={classes.Battery__filters}>
          <WidgetFilter show={false} selectFilterBy={setFilterBy} />
        </section>
        <div className={classes.Battery__widgets}>{widgets}</div>
        <div className={classes.Battery__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data?.results}
            tableTitle="Battery Table"
            tagValue="kWh"
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
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default Battery
