import React, { useState } from 'react'

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
import classes from './Overview.module.scss'

const Overview = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumption',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
    {
      name: 'Energy Generation',
      data: [400, 500, 230, 430, 260, 430, 390, 380, 390, 330, 430, 310],
    },
  ])

  const widgets = [
    {
      id: 1,
      icon: EnergyWidgetIcon,
      title: 'Total Energy Generation ',
      range: 'For the year',
      value: '100.241',
      valueCurrency: 'kWh',
    },
    {
      id: 2,
      icon: SEnergyWidgetIcon,
      title: 'Total Energy Consumption',
      range: 'For the year',
      value: '50.82',
      valueCurrency: 'kWh',
    },
    {
      id: 3,
      icon: HomeWidgetIcon,
      title: 'Total SHS',
      range: 'For the year',
      value: '7',
      valueCurrency: 'kWh',
    },
  ].map((widget) => (
    <Widget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
      valueCurrency={widget.valueCurrency}
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
        {/* <div className={classes.Overview__map}>
          <ShsDeviceMap />
        </div> */}
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
          <SHSTable />
        </div>
      </div>
      {/* <InstructionModal /> */}
    </PageLayout>
  )
}

export default Overview
