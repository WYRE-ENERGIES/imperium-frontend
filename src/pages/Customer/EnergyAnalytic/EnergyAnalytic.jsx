import React, { useEffect, useState } from 'react'
import { energyAnalyticColumns, energyFilterOptions } from '../../../utils/data'
import {
  useGetClientEnergyAnalyticsQuery,
  useGetClientEnergyStatQuery,
  useGetClientEnergyTableDataQuery,
} from '../../../features/slices/energyAnalytic/clientEnergySlice'

import EnergyAnalyticWidget from '../../../components/Widget/EnergyAnalytic/EnergyAnalyticWidget'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import TableFooter from '../../../components/TableFooter/TableFooter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from './EnergyAnalytic.module.scss'
import { formatLabel } from '../../../utils/helpers'
import useDebounce from '../../../hooks/useDebounce'

const EnergyAnalytic = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Energy Generated',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')
  const [widgets, setWidgets] = useState([])
  const [deviceId, setDeviceId] = useState()

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const { isFetching, isError, isSuccess, data, refetch } =
    useGetClientEnergyTableDataQuery(
      {
        page,
        search: debounceValue,
        filterBy: globalFilter,
        deviceId,
      },
      { skip: !deviceId },
    )

  const {
    isFetching: isStatLoading,
    isError: isStatError,
    isSuccess: isStatSuccess,
    data: statData,
    refetch: statRefetch,
  } = useGetClientEnergyStatQuery(
    {
      filterBy: globalFilter,
      deviceId,
    },
    { skip: !deviceId },
  )

  const {
    isFetching: isAnalyticsLoading,
    data: analyticsData,
    refetch: refetchAnalytics,
  } = useGetClientEnergyAnalyticsQuery(
    {
      filterBy: globalFilter,
      deviceId,
    },
    { skip: !deviceId },
  )

  useEffect(() => {
    if (isAnalyticsLoading) return

    setWidgets(
      [
        {
          id: 1,
          icon: EnergyWidgetIcon,
          title: 'Total Energy Generation ',
          range: 'For the year',
          value: analyticsData?.energy_generated
            ? parseFloat(
                analyticsData?.energy_generated?.toFixed(1),
              ).toLocaleString()
            : 0,
        },
        {
          id: 2,
          icon: SEnergyWidgetIcon,
          title: 'Total Energy Consumption',
          range: 'For the year',
          value: analyticsData?.energy_consumed
            ? parseFloat(
                analyticsData?.energy_consumed?.toFixed(1),
              ).toLocaleString()
            : 0,
        },
      ].map((widget) => (
        <EnergyAnalyticWidget
          key={widget.id}
          Icon={widget.icon}
          range={formatLabel(globalFilter)}
          title={widget.title}
          value={widget.value}
        />
      )),
    )
  }, [isAnalyticsLoading, analyticsData, globalFilter])

  useEffect(() => {
    if (isStatLoading) return

    if (isStatSuccess) {
      setChartData([statData.energyConsumed, statData.energyGenerated])
    }
  }, [isStatLoading, isStatSuccess, statData])

  useEffect(() => {
    if (deviceId) {
      refetch()
      statRefetch()
      refetchAnalytics()
    }
  }, [globalFilter, deviceId, refetch, statRefetch, refetchAnalytics])

  return (
    <PageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.EnergyAnalytic}
      >
        <section className={classes.EnergyAnalytic__headerSection}>
          <PageBreadcrumb title="Energy Analytic" items={['Energy Analytic']} />
          <ShsCapacityDropdown setDeviceId={setDeviceId} />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>
          {isAnalyticsLoading ? <WidgetLoader /> : widgets}
        </div>
        <div className={classes.EnergyAnalytic__chart}>
          <StackedBarChart
            title="Energy Generation"
            chartData={chartData}
            colors={['#C9E00C', '#5C9D48']}
            borderRadius={2}
            columnWidth={40}
            legendPosition="top"
            legendHorizontalAlign="right"
            yLabelTitle="kWh"
            xLabelTitle="Month"
            showGridY={true}
            showGrid={true}
            tickPlacement={'off'}
            yAxisTick={false}
          />
        </div>
        <div className={classes.EnergyAnalytic__shsTable}>
          <SHSTableWithFilter
            columns={energyAnalyticColumns}
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
        </div>
      </div>
    </PageLayout>
  )
}

export default EnergyAnalytic
