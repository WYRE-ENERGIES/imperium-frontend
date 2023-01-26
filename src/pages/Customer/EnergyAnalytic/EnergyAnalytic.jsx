import React, { useState } from 'react'
import { energyAnalyticColumns, energyFilterOptions } from '../../../utils/data'

import EnergyAnalyticWidget from '../../../components/Widget/EnergyAnalytic/EnergyAnalyticWidget'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './EnergyAnalytic.module.scss'
import { stackBarData } from '../../../components/Charts/StackedBarChart/data'
import { tableData } from '../../../components/SHSTableWithFilter/data'

const EnergyAnalytic = () => {
  const [chartData, setChartData] = useState({
    labels: stackBarData.map((data) => data.month),
    datasets: [
      {
        label: 'Energy Consumed',
        data: stackBarData.map((data) => data.energyConsumed),
        backgroundColor: '#C9E00C',
        borderRadius: '5',
        barThickness: '16',
      },
      {
        label: 'Energy Generated',
        data: stackBarData.map((data) => data.energyGenerated),
        backgroundColor: '#5C9D48',
        borderRadius: '7',
        barThickness: '16',
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
  ].map((widget) => (
    <EnergyAnalyticWidget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
    />
  ))

  return (
    <PageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.EnergyAnalytic}
      >
        <section className={classes.EnergyAnalytic__headerSection}>
          <PageBreadcrumb title="Energy Analytic" />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>{widgets}</div>
        <div className={classes.EnergyAnalytic__chart}>
          <StackedBarChart title="Energy Generation" chartData={chartData} />
        </div>
        <div className={classes.EnergyAnalytic__shsTable}>
          <SHSTableWithFilter
            columns={energyAnalyticColumns}
            data={tableData}
            tableTitle="Energy Table"
            tagValue="kWh"
            filterOptions={energyFilterOptions}
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default EnergyAnalytic
