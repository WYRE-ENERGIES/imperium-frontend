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
import { tableData } from '../../../components/SHSTableWithFilter/data'

const EnergyAnalytic = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
    {
      name: 'Energy Generated',
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
          <PageBreadcrumb title="Energy Analytic" items={['Energy Analytic']} />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>{widgets}</div>
        <div className={classes.EnergyAnalytic__chart}>
          <StackedBarChart
            title="Energy Generation"
            chartData={chartData}
            colors={['#C9E00C', '#5C9D48']}
            borderRadius={2}
            columnWidth={10}
            legendPosition="top"
            legendHorizontalAlign="right"
            yLabelTitle="kWh"
            xLabelTitle="Month"
          />
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
