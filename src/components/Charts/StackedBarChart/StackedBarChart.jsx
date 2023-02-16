import Chart from 'react-apexcharts'
import React from 'react'
import { apexChartOptions } from '../data'
import classes from './StackedBarChart.module.scss'

const StackedBarChart = ({
  title,
  chartData,
  colors,
  borderRadius,
  columnWidth,
  legendPosition,
  legendHorizontalAlign,
  yLabelTitle,
  xLabelTitle,
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
            position: legendPosition,
            horizontalAlign: legendHorizontalAlign,
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
          xaxis: {
            ...apexChartOptions.xaxis,
            title: {
              ...apexChartOptions.xaxis.title,
              text: xLabelTitle,
            },
          },
          yaxis: {
            ...apexChartOptions.yaxis,
            title: {
              text: yLabelTitle,
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
