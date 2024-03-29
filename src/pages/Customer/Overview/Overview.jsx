import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react'
import {
  useGetClientOverviewAnalyticsQuery,
  useGetClientOverviewEnergyDataQuery,
  useGetClientOverviewSolarHouseDataQuery,
  useGetMapDataQuery,
} from '../../../features/slices/overview/clientOverviewSlice'

import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../../../assets/widget-icons/home-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import SHSTable from '../../../components/SHSTable/SHSTable'
import ShsDeviceMap from '../../../components/Map/ShsDeviceMap'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from './Overview.module.scss'
import { formatLabel, getItemFromLocalStorage } from '../../../utils/helpers'
import Loading from '../../../components/Loading/Loading'

const InstructionModal = lazy(() =>
  import('./InstructionModal/InstructionModal'),
)

const Overview = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumption',
      data: [],
    },
    {
      name: 'Energy Generation',
      data: [],
    },
  ])
  const [widgets, setWidgets] = useState([])
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')
  const [open, setOpen] = useState(false)

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: refetchAnalytics,
  } = useGetClientOverviewAnalyticsQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isSolarFetching,
    isError: isSolarError,
    error: solarError,
    data: solarData,
    refetch: refetchSolar,
  } = useGetClientOverviewSolarHouseDataQuery({
    page,
    filterBy: globalFilter,
  })

  const {
    isFetching: isEnergyFetching,
    isError: isEnergyError,
    error: energyError,
    data: energyData,
    refetch: refetchEnergy,
  } = useGetClientOverviewEnergyDataQuery({
    filterBy: globalFilter,
  })

  const {
    isFetching: isMapFetching,
    isError: isMapError,
    error: mapError,
    data: mapData,
  } = useGetMapDataQuery()

  useEffect(() => {
    const current_client = getItemFromLocalStorage('current_client')
    if (!current_client) {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          title: 'Total Energy Generation',
          icon: EnergyWidgetIcon,
          value:
            parseFloat(
              analyticsData?.total_installed_capacity?.toFixed(1),
            )?.toLocaleString() || 0,
          valueCurrency: 'kWh',
          range: 'For the year',
        },
        {
          id: 2,
          icon: SEnergyWidgetIcon,
          title: 'Total Energy Consumption',
          value:
            parseFloat(
              analyticsData?.total_energy_consumed?.toFixed(1),
            )?.toLocaleString() || 0,
          valueCurrency: 'kWh',
          range: 'For the year',
        },
        {
          id: 3,
          icon: HomeWidgetIcon,
          title: 'Total SHS',
          value: parseFloat(analyticsData?.total_devices?.toFixed(1)) || 0,
          range: 'For the year',
        },
      ].map((widget) => (
        <Widget
          key={widget.id}
          Icon={widget.icon}
          range={formatLabel(globalFilter)}
          valueCurrency={widget.valueCurrency}
          title={widget.title}
          value={widget.value}
        />
      )),
    )
  }, [isAnalyticsFetching, analyticsData, globalFilter])

  useEffect(() => {
    if (isEnergyFetching) return

    if (isEnergyError) {
      setChartData([
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
    setChartData(energyData)
  }, [isEnergyFetching, isEnergyError, energyData])
  const reFetchData = useCallback(() => {
    refetchAnalytics()
    refetchSolar()
    refetchEnergy()
  }, [refetchAnalytics, refetchSolar, refetchEnergy])
  useEffect(() => {
    reFetchData()
  }, [globalFilter, reFetchData])
  return (
    <PageLayout>
      {open ? (
        <div></div>
      ) : (
        <div
          style={{ backgroundColor: '#FCFCFD' }}
          className={classes.Overview}
        >
          <section className={classes.Overview__headerSection}>
            <PageBreadcrumb title="Overview" items={['Overview']} />
          </section>
          <section className={classes.Overview__filters}>
            <WidgetFilter
              selectFilterBy={(value) => setGlobalFilter(value)}
              filterBy={globalFilter}
            />
          </section>
          <div className={classes.Overview__widgets}>
            {isAnalyticsFetching ? <WidgetLoader /> : widgets}
          </div>

          <div className={classes.Overview__map}>
            <ShsDeviceMap isLoading={isMapFetching} data={mapData?.results} />
          </div>
          <div className={classes.Overview__chart}>
            {isEnergyFetching ? (
              <Loading data="Energy chart" />
            ) : energyData ? (
              <StackedBarChart
                title="Energy Generation vs Energy Consumption"
                chartData={chartData}
                colors={['#66AB4F', '#497A38']}
                borderRadius={5}
                columnWidth={40}
                legendPosition="top"
                legendHorizontalAlign="right"
                yLabelTitle="kWh"
                xLabelTitle="Month"
                showGridX={true}
                showGridY={true}
                showGrid={true}
                tickPlacement={'off'}
                yAxisTick={false}
                currentMonth={new Date().getMonth() + 1}
              />
            ) : (
              'No Data records'
            )}
          </div>
          <div className={classes.Overview__shsTable}>
            <SHSTable
              isLoading={isSolarFetching}
              setPage={setPage}
              data={solarData}
            />
          </div>
        </div>
      )}
      <Suspense fallback={<h4>Loading...</h4>}>
        {open && (
          <InstructionModal open={open} isAdmin={false} setOpen={setOpen} />
        )}
      </Suspense>
    </PageLayout>
  )
}

export default Overview
