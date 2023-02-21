import React from 'react'
import SimpleBarChart from '../../Charts/SimpleBarChart/SimpleBarChart'
import { additionalCustomerProps } from '../../Charts/data'
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
        optionProps={additionalCustomerProps}
      />
    </div>
  )
}

export default CustomerChartWidget
