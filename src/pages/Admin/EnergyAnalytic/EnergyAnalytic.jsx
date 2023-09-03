import React, { useEffect, useState } from 'react'
import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'
import {
  useGetEnergyPageAnalyticsQuery,
  useGetEnergyStatisticsQuery,
  useGetEnergyTableDataQuery,
} from '../../../features/slices/energySlice'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import EnergyStatistics from '../../../components/EnergyStatistics/EnergyStatistics'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { RiseOutlined } from '@ant-design/icons'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Spin } from 'antd'
import TableFooter from '../../../components/TableFooter/TableFooter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import { adminEnergyAnalyticColumns } from '../../../utils/data'
import classes from '../../Customer/EnergyAnalytic/EnergyAnalytic.module.scss'
import { formatLabel } from '../../../utils/helpers'
import useDebounce from '../../../hooks/useDebounce'

const EnergyAnalytic = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [],
    },
    {
      name: 'Energy Generated',
      data: [],
    },
  ])

  const [areaChartData, setAreaChartData] = useState([
    {
      name: 'Energy Difference',
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
    useGetEnergyTableDataQuery({
      page,
      search: debounceValue,
      filterBy: globalFilter,
    })

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: refetchAnalytics,
  } = useGetEnergyPageAnalyticsQuery({ filterBy: globalFilter })

  const {
    isFetching: isCapacityFetching,
    isError: isCapacityError,
    error: capacityError,
    data: capacityData,
    refetch: refetchCapacity,
  } = useGetEnergyStatisticsQuery({ filterBy: globalFilter })

  useEffect(() => {
    if (isCapacityFetching) return

    if (capacityData?.energyConsumed) {
      setAreaChartData([capacityData.energyDifference])
      setChartData([capacityData.energyConsumed, capacityData.energyGenerated])
    }
  }, [isCapacityFetching, capacityData])

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          icon: TbBoltOff,
          title: 'Total Energy Consumed',
          value: analyticsData?.energy_consumed
            ? analyticsData?.energy_consumed
            : 0,
          valueCurrency: 'kWh',
          graphColor: '#65AA4F',
        },
        {
          id: 2,
          icon: TbActivityHeartbeat,
          title: 'Total Energy Generated',
          value: analyticsData?.energy_generated
            ? parseFloat(
                analyticsData?.energy_generated?.toFixed(1),
              )?.toLocaleString()
            : 0,
          valueCurrency: 'kWh',
          graphColor: '#C9E00C',
        },
        {
          id: 3,
          icon: RiseOutlined,
          title: 'Energy Difference',
          valueCurrency: 'kWh',
          value: analyticsData?.capacity
            ? parseFloat(analyticsData?.capacity?.toFixed(1))?.toLocaleString()
            : 0,
        },
      ].map((widget) => (
        <AdminEnergyAnalytic
          key={widget.id}
          Icon={widget.icon}
          duration={formatLabel(globalFilter)}
          valueCurrency={widget.valueCurrency}
          title={widget.title}
          value={widget.value}
          graphColor={widget.graphColor}
        />
      )),
    )
  }, [isAnalyticsFetching, analyticsData, globalFilter])

  useEffect(() => {
    refetch()
    refetchAnalytics()
    refetchCapacity()
  }, [globalFilter, refetch, refetchAnalytics, refetchCapacity])

  return (
    <AdminPageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.EnergyAnalytic}
      >
        <section className={classes.EnergyAnalytic__headerSection}>
          <PageBreadcrumb title="Energy Analytic" items={['Energy Analytic']} />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>
          {isAnalyticsFetching ? <WidgetLoader /> : widgets}
        </div>
        <div className={classes.EnergyAnalytic__shsTable}>
          <SHSTableWithFilter
            columns={adminEnergyAnalyticColumns}
            data={data?.results}
            tableTitle="Energy Table"
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
          {isCapacityFetching ? (
            <Spin />
          ) : (
            <EnergyStatistics
              duration={formatLabel(globalFilter)}
              chartData={chartData}
              areaChartData={areaChartData}
            />
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default EnergyAnalytic
