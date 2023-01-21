import React, { useState } from 'react'

import { ReactComponent as EnergyWidgetIcon } from '../../../assets/overview/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../../../assets/overview/home-icon.svg'
import InstructionModal from './InstructionModal/InstructionModal'
import OverviewWidget from '../../../components/Widget/Overview/OverviewWidget'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/overview/cancel-energy-con.svg'
import SHSTable from '../../../components/SHSTable/SHSTable'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Overview.module.scss'
import { stackBarData } from '../../../components/Charts/StackedBarChart/data'

const Overview = () => {
  const [chartData, setChartData] = useState({
    labels: stackBarData.map((data) => data.month),
    datasets: [
      {
        label: 'Energy Consumption',
        data: stackBarData.map((data) => data.energyConsumed),
        backgroundColor: '#66AB4F',
        borderRadius: '5',
      },
      {
        label: 'Energy Generation',
        data: stackBarData.map((data) => data.energyGenerated),
        backgroundColor: '#497A38',
        borderRadius: '7',
      },
    ],
  })
  const widgets = [
    {
      id: 1,
      icon: EnergyWidgetIcon,
      title: 'Total Energy Generation ',
      range: 'For the year',
      value: '100.241',
    },
    {
      id: 2,
      icon: SEnergyWidgetIcon,
      title: 'Total Energy Consumption',
      range: 'For the year',
      value: '50.82',
    },
    {
      id: 3,
      icon: HomeWidgetIcon,
      title: 'Total SHS',
      range: 'For the year',
      value: '7',
    },
  ].map((widget) => (
    <OverviewWidget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
    />
  ))

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Overview}>
        <section className={classes.Overview__headerSection}>
          <PageBreadcrumb title="Overview" />
        </section>
        <section className={classes.Overview__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Overview__widgets}>{widgets}</div>
        <div className={classes.Overview__chart}>
          <StackedBarChart
            title="Energy Generation vs Energy Consumption"
            chartData={chartData}
          />
        </div>
        <div className={classes.Overview__shsTable}>
          <SHSTable />
        </div>
      </div>
      {/* <InstructionModal /> */}
    </PageLayout>
  )
}

export default Overview
