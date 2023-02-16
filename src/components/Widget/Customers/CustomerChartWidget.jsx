import React from 'react'
import SimpleBarChart from '../../Charts/SimpleBarChart/SimpleBarChart'
import classes from './CustomersWidget.module.scss'

const CustomerChartWidget = ({
  chartData,
  colors,
  borderRadius,
  columnWidth,
}) => {
  return (
    <div className={classes.CustomerChartWidget}>
      <SimpleBarChart
        title="Customers Statistic"
        chartData={chartData}
        colors={colors}
        borderRadius={borderRadius}
        columnWidth={columnWidth}
      />
    </div>
  )
}

export default CustomerChartWidget
