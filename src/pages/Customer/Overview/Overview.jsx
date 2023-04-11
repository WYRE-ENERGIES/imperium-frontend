import React, { useEffect, useState } from 'react'
import {
  useGetClientOverviewAnalyticsQuery,
  useGetClientOverviewEnergyDataQuery,
  useGetClientOverviewSolarHouseDataQuery,
} from '../../../features/slices/overview/clientOverviewSlice'

import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../../../assets/widget-icons/home-icon.svg'
import InstructionModal from './InstructionModal/InstructionModal'
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
import { formatLabel } from '../../../utils/helpers'

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

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          title: 'Total Energy Generation',
          icon: EnergyWidgetIcon,
          value:
            parseFloat(analyticsData?.total_installed_capacity?.toFixed(1)) ||
            0,
          valueCurrency: 'kWh',
          range: 'For the year',
        },
        {
          id: 2,
          icon: SEnergyWidgetIcon,
          title: 'Total Energy Consumption',
          value:
            parseFloat(analyticsData?.total_energy_consumed?.toFixed(1)) || 0,
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
  }, [isAnalyticsFetching])

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
  }, [isEnergyFetching, isEnergyError])

  useEffect(() => {
    refetchAnalytics()
    refetchSolar()
    refetchEnergy()
  }, [globalFilter])

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Overview}>
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
          <ShsDeviceMap />
        </div>
        <div className={classes.Overview__chart}>
          <StackedBarChart
            title="Energy Generation vs Energy Consumption"
            chartData={chartData}
            colors={['#66AB4F', '#497A38']}
            borderRadius={10}
            columnWidth={30}
            legendPosition="top"
            legendHorizontalAlign="right"
            yLabelTitle="kWh"
            xLabelTitle="Month"
          />
        </div>
        <div className={classes.Overview__shsTable}>
          <SHSTable
            isLoading={isSolarFetching}
            setPage={setPage}
            data={solarData}
          />
        </div>
      </div>
      {/* <InstructionModal /> */}
    </PageLayout>
  )
}

export default Overview
