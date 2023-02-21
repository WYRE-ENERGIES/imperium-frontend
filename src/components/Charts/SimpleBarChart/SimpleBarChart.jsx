import Chart from 'react-apexcharts'
import React from 'react'
import { barChartOptions } from '../data'

const SimpleBarChart = ({
  title,
  chartData,
  colors,
  borderRadius,
  columnWidth,
  optionProps,
}) => {
  return (
    <Chart
      options={{
        ...barChartOptions,
        fill: { colors },
        plotOptions: {
          ...barChartOptions.plotOptions,
          bar: {
            ...barChartOptions.plotOptions.bar,
            borderRadius,
            columnWidth,
          },
        },
        title: {
          text: title,
        },
        ...optionProps,
      }}
      type="bar"
      height="100%"
      series={chartData}
      width="100%"
    />
  )
}

export default SimpleBarChart
