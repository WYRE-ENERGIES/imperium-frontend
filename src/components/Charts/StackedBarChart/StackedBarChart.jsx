import Chart from 'react-apexcharts'
import React from 'react'
import { apexChartOptions } from './data'
import classes from './StackedBarChart.module.scss'

const StackedBarChart = ({
  title,
  chartData,
  colors,
  borderRadius,
  columnWidth,
}) => {
  return (
    <div className={classes.StackedBarChart}>
      <h1>{title}</h1>
      <Chart
        options={{
          ...apexChartOptions,
          fill: { colors },
          legend: {
            ...apexChartOptions.legend,
            markers: {
              ...apexChartOptions.legend.markers,
              fillColors: colors,
            },
          },
          plotOptions: {
            ...apexChartOptions.plotOptions,
            bar: {
              ...apexChartOptions.plotOptions.bar,
              borderRadius,
              columnWidth,
            },
          },
        }}
        type="bar"
        height="90%"
        series={chartData}
        width="100%"
      />
    </div>
  )
}

export default StackedBarChart
